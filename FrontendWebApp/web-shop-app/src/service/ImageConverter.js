import {useState} from "react";

const ImageConverter = (props) => {
    const [image, setImage] = useState("");

    const imageHandler = (event) =>{
        const files = event.target.files;
        const file = files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>{
            setImage(reader.result);
        }

        return image;
    }

}

export default ImageConverter;