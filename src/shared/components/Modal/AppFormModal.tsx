interface AppFormModalProps {
  onClose: () => void;
  title: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function AppFormModal ({ onClose, title, content, actions }: AppFormModalProps) {
  return (
    <>
      <h3 className="font-bold text-lg py-2 px-1">{ title }</h3>

      { content }

      <div className="flex justify-end gap-1 mt-3">
        <button id="btnCloseModal" className="btn btn-ghost" onClick={ onClose }>Cancelar</button>
        { actions }
      </div>
    </>
  );
}