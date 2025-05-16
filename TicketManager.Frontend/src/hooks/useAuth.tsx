import {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {emailKeyName, emailTokenKey, roleKeyName, tokenKeyName} from "../constants/constants.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";
import api from "../api/api.ts";
import { useNavigate } from "react-router-dom";

interface CustomJwtPayload extends JwtPayload {
    [key: string]: any; // Allowing dynamic keys if necessary
}

const useAuth = () => {
    const { token, setToken, email, setEmail, roles, setRoles  } = useContext(AuthContext);
    const navigate = useNavigate();
    const isLoggedIn = !!token;

    const login = (email: string, password: string) => {
        api.Auth.login(email, password).then(res => {
            const tokenFromBE = res.data.token;
            const decodedToken = jwtDecode<CustomJwtPayload>(tokenFromBE);
            
            const userRoles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

            setRoles(userRoles); localStorage.setItem(roleKeyName, userRoles);
            setToken(tokenFromBE); localStorage.setItem(tokenKeyName, tokenFromBE);
            setEmail(email); localStorage.setItem(emailKeyName, email);
        }, error => {
            alert('Invalid credentials.')
        })
    }

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setEmail(null);
        setRoles(null);
        navigate('/login');
    }

    const loginKata = (token: string) => {
        setToken(token); localStorage.setItem(tokenKeyName, token);
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        const tempEmail = decodedToken[emailTokenKey];
        localStorage.setItem(emailKeyName, tempEmail); setEmail(tempEmail);
    }

    useEffect(() => {

    }, []);

    return {login, logout, loginKata, token, email, isLoggedIn};
}

export default useAuth;