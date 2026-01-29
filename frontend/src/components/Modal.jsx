function Modal({ children, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        {children}
        <div className="edit-actions">
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
