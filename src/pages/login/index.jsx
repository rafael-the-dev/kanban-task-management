import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useRouter } from "next/router";

import classNames from 'classnames'
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography"
import Link from 'next/link'

import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import classes from "./styles.module.css";

import { LoginContext } from "src/context";

import { Button, Column, DefaultContainer } from "src/components/pages-components/signup-page"
import Alert from "src/components/shared/alert"
import Input from 'src/components/Input';
import Image from "src/components/shared/image";

const Container = () => {
    const { addUser, saveUserInfo } = useContext(LoginContext);

    const [ loading, setLoading ] = useState(false);
    const [ values, setValues ] = useState({
        password: '',
        showPassword: false,
    });
    
    const onOpen = useRef(null);
    const onClose = useRef(null);
    const passwordRef = useRef(null);
    const userNameRef = useRef(null);

    const handleMouseDownPassword = useCallback((event) => {
        event.preventDefault();
    }, []);

    const handleClickShowPassword = useCallback(() => {
        setValues(currentValues => ({
          ...currentValues,
          showPassword: !currentValues.showPassword
        }));
    }, []);

    const handleChange = useCallback((prop) => (event) => {
        setValues(currentValues => ({ ...currentValues, [prop]: event.target.value }));
    }, []);

    const router = useRouter();
    const submitHandler = useCallback(e => {
        e.preventDefault();

        onClose.current?.();
        setLoading(true);

        const options = {
            body: JSON.stringify({
                password: passwordRef.current.value,
                username: userNameRef.current.value
            }),
            method: "PUT",
        };

        fetch('/api/login', options)
            .then((res) => {
                if(res.status === 200) return res.json();

                throw new Error();
            })
            .then(data => {
                saveUserInfo(data);
                addUser(data);
                router.push("/")
            })
            .catch(err => {
                console.error(err);
                onOpen.current?.();
                setLoading(false);
            })
    }, [ addUser, router, saveUserInfo ]);

    const alertMemo = useMemo(() => (
        <Alert 
            className={classNames("mb-4")}  
            description="Username or password invalid!"
            onClose={onClose}
            onOpen={onOpen}
            severity="error"
            title="Error"
        />
    ), []);

    const legendMemo = useMemo(() => (
        <Typography className="font-bold mb-8 text-center text-gray-100 text-2xl uppercase lg:text-black">
            Login
        </Typography>
    ), []);

    const passwordMemo = useMemo(() => (
        <div className={classNames(`border border-solid border-blue-700 flex items-center mt-4 px-3 rounded-lg dark:bg-stone-400`)}>
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="start"
            >
                { values.showPassword ? <VisibilityOff className="text-slate-700" /> : <Visibility className="text-slate-700" />}
            </IconButton>
            <Input 
                className="border-0 grow"
                onChange={handleChange('password')}
                placeholder="password"
                ref={passwordRef}
                required
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
            />
        </div>
    ), [ handleChange, handleClickShowPassword, handleMouseDownPassword, values ]);

    const usernameMemo = useMemo(() => (
        <div className={classNames(`border border-solid border-blue-700 flex items-center mt-4 px-3 rounded-lg dark:bg-stone-400`)}>
            <AccountCircle className="text-slate-700" />
            <Input 
                className="border-0 grow"
                placeholder="Username"
                ref={userNameRef}
                required
            />
        </div>
    ), []);

    return (
        <DefaultContainer>
            <form 
                className={classNames(classes.form, `flex flex-col items-stretch justify-center px-5 py-8 relative 
                    z-10 md:px-6 `)}
                onSubmit={submitHandler}>
                { legendMemo }
                { alertMemo }
                <fieldset className="mt-6 lg:mt-0">
                    { usernameMemo }
                    { passwordMemo }
                </fieldset>
                <div 
                    className={classNames("flex flex-col sm:items-center mt-6")}>
                    <Typography component="p" className="ml-4 text-center text-sm">
                        don&apos;t you have an account? 
                        <Link href="/sign-up">
                            <a 
                                className={classNames(classes.signUpLink, 
                                "ml-2 text-primary-400 uppercase underline hover:opacity-90")}>
                                sign up.
                            </a>
                        </Link>
                    </Typography>
                    <Button >
                        { loading ? "Loading..." : "Submit" }
                    </Button>
                </div>
            </form>
        </DefaultContainer>
    );
};

export default Container;