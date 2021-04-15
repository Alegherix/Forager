import React, { useState } from 'react';

interface PhotoFetcherProps {}

const PhotoFetcher: React.FC<PhotoFetcherProps> = ({}) => {
  const [image, setImage] = useState({});

  const handleImageChange = (event) => {
    setImage({
      image: URL.createObjectURL(event.target.files[0]),
    });
  };

  return (
    <>
      <div>
        <label>
          <input
            // style={{ display: 'none' }}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
          />
          <button type="submit">Submit Shroom</button>
        </label>
      </div>
    </>
  );
};

export default PhotoFetcher;
