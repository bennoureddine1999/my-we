import React, { useState } from "react";

function Image() {
  const [laoding, setLaoding] = useState(false);
  const [image, setImage] = useState("");
  const Uplaodeimages = async (e) => {
    const files = e.target.files[0];
    const data = new FormData();
    data.append("file", files[0]);
    data.append("uplaode_preset", "pjenppzf");
    setLaoding(true);

    const res = await fetch(
      " https://api.cloudinary.com/v1_1/benaoumeur/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
  };
  return (
    <div>
      <input type="file" className="input" onChange={Uplaodeimages} />
    </div>
  );
}

export default Image;
