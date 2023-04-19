import { Alert, AlertTitle, MenuItem, Paper, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from "next/router"

import classNames from 'classnames'
import classes from "./styles.module.css";

import Validation from "src/models/Validation";
import { SignUpContext, SignUpContextProvider } from "src/context"

import { Button, Input } from "src/components/pages-components/signup-page";
import DefaultInput from "src/components/default-input";
import Link from "src/components/link";
import MessageDialog from "src/components/message-dialog";

const Container = () => {
    const { 
        confirmPassword, confirmPasswordChangeHandler,
        firstName, firstNameChangeHandler,
        hasErrors,
        lastName, lastNameChangeHandler, loading,
        onSubmit, 
        password, passwordChangeHandler,
        setFirstName, setLastName, setUser, setUserName,
        user, username, usernameChangeHandler
     } = useContext(SignUpContext);


    const users = useRef([
        {
            label: "Administrador", value: "Administrator"
        },
        {
            label: "Gerente", value: "Manager"
        },
        {
            label: "Operador", value: "Operator"
        }
    ]);

    const confirmPasswordRef = useRef(null);
    const nameRef = useRef(null);
    const firstNameRef = useRef(null)
    const passwordRef = useRef(null);
    const lastNameRef = useRef(null);
    const setDialogMessage = useRef(null);
    const userNameRef = useRef(null);
    const wasUserRegistered = useRef(false);

    const changeHandler = useCallback((e) => setUser(e.target.value), [ setUser ]);


    const legendMemo = useMemo(() => (
        <Typography 
            component="legend"
            className="font-bold mb-20 text-gray-100 text-center text-2xl uppercase dark:lg:text-white">
            Sign up
        </Typography>
    ), []);

    const firstNameMemo = useMemo(() => (
        <Input 
            errors={firstName.error}
            id="name"
            onChange={firstNameChangeHandler}
            placeholder="First name"
            ref={firstNameRef}
            value={firstName.value}
        />
    ), [ firstName, firstNameChangeHandler ])

    const lastNameMemo = useMemo(() => (
        <Input 
            errors={lastName.error}
            id="name"
            onChange={lastNameChangeHandler}
            placeholder="Last name"
            ref={lastNameRef}
            value={lastName.value}
        />
    ), [ lastName, lastNameChangeHandler ]);

    const router = useRouter();

    const closeHelper = useCallback(() => {
        if(wasUserRegistered.current) {
            router.push('/login');
        }
    }, [ router ])

    const messageDialogMemo = useMemo(() => (
        <MessageDialog
            closeHelper={closeHelper}
            setDialogMessage={setDialogMessage}
        />
    ), [ closeHelper ])

    const usernameMemo = useMemo(() => (
        <Input 
            errors={username.error}
            id="username"
            onChange={usernameChangeHandler}
            placeholder="Username"
            ref={userNameRef}
            value={username.value}
        />
    ), [ username, usernameChangeHandler ]);

    const passwordMemo = useMemo(() => (
        <Input 
            errors={password.error}
            id="password"
            onChange={passwordChangeHandler}
            placeholder="Password"
            ref={passwordRef}
        />
    ), [ password, passwordChangeHandler ]);

    const confirmPasswordMemo = useMemo(() => (
        <Input 
            errors={confirmPassword.error}
            id="confirm-password"
            onChange={confirmPasswordChangeHandler}
            placeholder="Comfirm password"
            ref={confirmPasswordRef}
        />
    ), [ confirmPassword, confirmPasswordChangeHandler ]);

    const signInMemo = useMemo(() => (
        <Typography component="p" className="ml-4 text-sm text-center dark:text-slate-400">
            have an account? 
            <Link 
                className={classNames(classes.signUpLink, 
                "ml-2 text-blue-700 uppercase underline hover:opacity-90")}
                href="/login">
                sign in.
            </Link>
        </Typography>
    ), []);

    const submitHandler = useCallback(async e => {
        e.preventDefault();

        const res = await onSubmit({
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            username: userNameRef.current.value
        });

        if(res.status === 201) {
            wasUserRegistered.current = true;
            setDialogMessage.current?.({
                description: "User was successfully registered.",
                title: "Success",
                type: "success"
            });
            return;
        }

        wasUserRegistered.current = false;
        let message = {
            description: "User not registered.",
            title: "Error",
            type: "error"
        }

        try {
            const errorMessage = await res.json();
            message.description = errorMessage.message;
        } 
        finally {
            setDialogMessage.current?.(message);
        }
    }, [ onSubmit ]);

    return (
        <div className="bg-stone-100 min-h-screen flex items-center justify-center w-full px-5 py-20 md:px-0
        dark:bg-dark-700">
            <Paper 
                className={classNames(classes.signUpContainer, `px-5 py-8 relative rounded-2xl w-full md:px-6
                    before:absolute before:bg-primary-600 before:block before:left-0 before:top-0`)}
                component="form"
                elavation={0}
                onSubmit={submitHandler}>
                <fieldset className="relative z-10">
                    { legendMemo }
                    { firstNameMemo }
                    { lastNameMemo }
                    { usernameMemo }
                    { passwordMemo }
                    { confirmPasswordMemo }
                    <div 
                        className={classNames("flex flex-col sm:items-center mt-6")}>
                        { signInMemo }
                        <Button disabled={hasErrors}>
                            { loading ? "Loading..." : "Submit"}
                        </Button>
                    </div>
                </fieldset>
                { messageDialogMemo }
            </Paper>
        </div>
    );
};

export default Container;