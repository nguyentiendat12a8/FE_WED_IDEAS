import { toast } from "react-toastify";

const showNotification = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast.info(message);
      break;
  }
};

export { showNotification };
