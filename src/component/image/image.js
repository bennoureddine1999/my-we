import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../fire-base";

function Image() {
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState([]);
  const [selectedImage, setSelactedImage] = useState([]);
  console.log("urls", urls);
  console.log("images", images);

  const handlechange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      console.log(fileArray);
      setSelactedImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();

      setImages((prevState) => [...prevState, newImage]);
      console.log("images", images);
    }
  };
  const renderPhotos = (source) => {
    console.log("source: ", source);
    return source.map((photo) => {
      return <img src={photo} alt="" key={photo} />;
    });
  };

  const upladefile = () => {
    const promises = [];
    images.map((image) => {
      const storageRef = ref(storage, `/files/${image.name}`);
      const uplaodeTask = uploadBytesResumable(storageRef, image);
      promises.push(uplaodeTask);
      uplaodeTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uplaodeTask.snapshot.ref).then((urls) => {
            console.log(urls);
            setUrls((prevState) => [...prevState, urls]);
          });
        }
      );
    });
  };

  return (
    <div>
      <form>
        <input multiple type="file" className="input" onChange={handlechange} />
        <button type="submit" onClick={upladefile}>
          Uplaode
        </button>
      </form>
      <h1>Uplaoded {progress}%</h1>
      {renderPhotos(selectedImage)}
    </div>
  );
}

export default Image;
