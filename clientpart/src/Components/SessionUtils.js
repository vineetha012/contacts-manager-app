import { useNavigate } from "react-router-dom";
import { useSessionContext } from "./Context";

export function SessionUtils() {

    const {userData} = useSessionContext();
    const navigate = useNavigate();

    return {
        ifSessionExist: (redirectTo) => {
            if(userData) {
                navigate(redirectTo);
            }
        },
        ifSessionDoesNotExist:  (redirectTo) => {
            if(!userData) {
                navigate(redirectTo);
            }
        }
    }
}

