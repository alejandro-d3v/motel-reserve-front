import AppFormModal from "./AppFormModal";

interface AppFormModalProps {
  onClose: () => void;
}

export default function AppConfirmDeleteModal ({ onClose }: AppFormModalProps) {
  return (
    <AppFormModal
      onClose={ onClose }
      title="Eliminar"
      content={
        <p>Está seguro de eliminar el registro?</p>
      }
      actions={
        <button className="btn btn-neutral" onClick={ onClose }>Eliminar</button>
      }
    />
  );
}