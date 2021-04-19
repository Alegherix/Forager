import { useState } from 'react';

const useModal = () => {
  const [modal, setModal] = useState<Boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>();

  const updateModalUrl = (path) => {
    setModalUrl(path);
    setModal(true);
  };

  const disableModal = () => {
    setModalUrl('');
    setModal(false);
  };

  return { updateModalUrl, disableModal, modalUrl, modal };
};

export default useModal;
