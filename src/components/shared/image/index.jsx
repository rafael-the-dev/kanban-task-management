import Image from "next/image";

const ImageContainer = ({ alt, ...rest }) => (
    <Image
        { ...rest }
        alt={alt} 
    />
);

export default ImageContainer;