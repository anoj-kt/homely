import { Navigate, Outlet } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";

import useAuthStatus from '../hooks/UseAuthStatus';

const PrivateRoute = () => {
    const { loggedIn, isLoading } = useAuthStatus();

    if(isLoading) {
        return <BeatLoader color="#00cc66" />
    }

    return loggedIn? <Outlet/> : <Navigate to="/sign-in" />
}

export default PrivateRoute 