import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export default function showSuccessMessage(successMessage: any) {
    toast.success(successMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
    });
}

export function showErrorMessage(errorMessage: any) {
    toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
    });
}