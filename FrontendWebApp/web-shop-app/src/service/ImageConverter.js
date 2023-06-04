import { useState } from "react";

export const ImageEncode = (props) => {
  const files = props.event.target.files;
  const file = files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    return reader.result;
  };
};

export const ImageDecode = ({ encodedImage }) => {
  const [decodedImage, setDecodedImage] = useState("");

  const decodeImage = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/jpeg");
      setDecodedImage(dataURL);
    };
    img.src = encodedImage;
  };

  return (
    <div>
      <button onClick={decodeImage}>Decode Image</button>
      {decodedImage && <img src={decodedImage} alt="" />}
    </div>
  );
};
