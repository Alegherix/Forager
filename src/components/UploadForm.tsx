import { useState } from 'react';
import firebase, { getForage, saveImageToForage } from '../auth/authOperations';
import { useHistory } from 'react-router-dom';

const UploadForm = ({ id }) => {
  const [image, setImage] = useState<File>();
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();

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
    setSubmitting(true);
    if (!image) return;

    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(image.name);
    await imageRef.put(image);
    const url = await imageRef.getDownloadURL();
    await saveImageToForage(url, id);
    const newForage = await getForage(id);
    history.push('/forage', newForage);
    setSubmitting(false);
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
        <button
          disabled={submitting}
          className="p-2 bg-blue-500 rounded-md w-28 disabled:opacity-50"
        >
          Upload File
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
