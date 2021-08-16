import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export const toastMessages = (message) => {
  return toast.dark(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 1500,
    draggablePercent: 60,
  });
};