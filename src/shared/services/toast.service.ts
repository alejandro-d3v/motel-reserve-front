import { toast } from 'sonner';

export class ToastService {
  show(message: string, type: string = 'success') {
    if (type == 'success') {
      toast.success(`${message ?? ''}`);
    } else {
      toast.error(`${message ?? ''}`);
    }
  }

  hide() {
    toast.dismiss()
  }
}