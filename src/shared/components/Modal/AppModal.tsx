interface AppModalProps {
  isOpen: boolean;
  onClose: any;
  children?: React.ReactNode;
}

export default function AppModal ({ isOpen, onClose, children  }: AppModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <dialog className="modal" style={{ backdropFilter: 'blur(2px)' }} open>
      <div className="modal-box">
        <button id="btnCloseModal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={ onClose }>✕</button>

        {children}
      </div>
    </dialog>
  );
}