import toast from "react-hot-toast";

export const SuccessToast = (title: string) => toast.success(title);

export const ErrorToast = (title: string) => toast.error(title);

export const LoadingToast = () => {
  const cargando = toast.loading("Cargando...");

  return {
    success: (message:string) => toast.success(message, { id: cargando }),
    error: (message:string) => toast.error(message, { id: cargando }),
  };
};
