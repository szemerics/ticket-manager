import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/app/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute; 