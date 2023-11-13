import { Toaster } from 'sonner';

export default function AppToast () {
  return (
    <>
      <Toaster 
        position='top-right'
        visibleToasts={ 5 }
        duration={ 5000 }
        closeButton
        richColors
      />
    </>
  );
}