

export default function Modal({ showModal, setShowModal, children}) {
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <button 
          onClick={() => setShowModal(false)} 
          className="text-black text-4xl font-bold absolute top-2 right-4"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
