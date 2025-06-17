import {Navigate, Route, Routes} from "react-router-dom";
import BasicLayout from "../components/Layout/BasicLayout/BasicLayout.tsx";
import AdminLayout from "../components/Layout/AdminLayout/AdminLayout.tsx";
import CashierLayout from "../components/Layout/CashierLayout.tsx";
import {routes} from "./Routes.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const Routing = () => {
    const publicRoutes = routes.filter(route => !route.isPrivate);
    const appRoutes = routes.filter(route => route.isPrivate && !route.path.startsWith('admin/') && !route.path.startsWith('cashier/'));
    const adminRoutes = routes.filter(route => route.isPrivate && route.path.startsWith('admin/'));
    const cashierRoutes = routes.filter(route => route.isPrivate && route.path.startsWith('cashier/'));

    return <Routes>
        <Route
            path="/"
            element={<Navigate to="/app/home" replace />}
        />
        {/* App routes */}
        <Route
            path="app"
            element={<BasicLayout />}>
            <Route
                path=""
                element={<Navigate to="home" />}
            />
            {appRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <ProtectedRoute>
                            {route.component}
                        </ProtectedRoute>
                    }
                />
            ))}
            {publicRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.component}
                />
            ))}
        </Route>

        {/* Admin routes */}
        <Route
            path="admin"
            element={<AdminLayout />}>
            {adminRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path.replace('admin/', '')}
                    element={
                        <ProtectedRoute>
                            {route.component}
                        </ProtectedRoute>
                    }
                />
            ))}
        </Route>

        {/* Cashier routes */}
        <Route
            path="cashier"
            element={<CashierLayout />}>
            {cashierRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path.replace('cashier/', '')}
                    element={
                        <ProtectedRoute>
                            {route.component}
                        </ProtectedRoute>
                    }
                />
            ))}
        </Route>
    </Routes>
}

export default Routing;