import { useAppSelector } from "../../app/hooks"
import { Toast } from "./Toast";
import { getToasts } from "./toastSlice"

export const ToastRenderer = () => {
  const toasts = useAppSelector(getToasts);
  return (
    <div className="absolute bottom-5 right-5">
      {toasts.map(toast => <Toast key={toast.id} {...toast} /> )}
    </div>
  )
}