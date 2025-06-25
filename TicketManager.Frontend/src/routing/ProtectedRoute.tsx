import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { isLoggedIn, roles } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/app/login" replace />;
    }

    if (requiredRole) {
        // roles lehet string vagy string[]
        let roleList: string[] = [];
        if (Array.isArray(roles)) {
            roleList = roles;
        } else if (typeof roles === 'string') {
            roleList = roles.split(',');
        }
        if (!roleList.includes(requiredRole)) {
            return <Navigate to="/app/home" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute; 