import { Navigate, Outlet } from 'react-router-dom';
import useAuthStatus from '../hooks/UseAuthStatus'

const PrivateRoute = () => {
    const { loggedIn, isLoading } = useAuthStatus();

    if(isLoading) {
        return <h3>Loading</h3>
    }

    return loggedIn? <Outlet/> : <Navigate to="/sign-in" />
}

export default PrivateRoute 