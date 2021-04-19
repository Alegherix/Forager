import { useState } from 'react';
import firebase, { saveImageToForage } from '../auth/authOperations';

const UploadForm = ({ id }) => {
  const [image, setImage] = useState<File>();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const { type } = file;
      const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp'];
      acceptedTypes.includes(type)
        ? setImage(file)
        : alert('Should only try to upload images!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(image.name);
    await imageRef.put(image);
    const url = await imageRef.getDownloadURL();
    await saveImageToForage(url, id);
  };

  return (
    <div>
      <form className="flex flex-col w-full " onSubmit={handleSubmit}>
        <input
          className="mb-2"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleChange}
        />
        <button className="w-28">Upload File</button>
      </form>
    </div>
  );
};

export default UploadForm;
