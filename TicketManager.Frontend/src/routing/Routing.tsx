import {Navigate, Route, Routes} from "react-router-dom";
import BasicLayout from "../components/Layout/BasicLayout.tsx";
import {routes} from "./Routes.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const Routing = () => {
    const publicRoutes = routes.filter(route => !route.isPrivate);
    const appRoutes = routes.filter(route => route.isPrivate);

    return <Routes>
        <Route
            path="/"
            element={<Navigate to="/app/dashboard" replace />}
        />
        {/* App routes */}
        <Route
            path="app"
            element={<BasicLayout />}>
            <Route
                path=""
                element={<Navigate to="dashboard" />}
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
    </Routes>
}

export default Routing;