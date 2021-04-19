const Modal = ({ disableModal, modalUrl, modal }) => {
  return (
    <>
      {modal && (
        <div className="w-screen h-full flex justify-center bg-black items-center fixed z-20 top-0 left-0">
          <button
            onClick={disableModal}
            className="absolute right-2 top-2 p-2 bg-white border-2 border-black rounded-md z-40"
          >
            Close
          </button>
          <img
            className="relative z-30 h-auto w-auto max-w-full opacity-100"
            src={modalUrl}
            alt="test"
          />
        </div>
      )}
    </>
  );
};

export default Modal;
