import { createContext } from "react";
import {emailKeyName, roleKeyName, tokenKeyName} from "../constants/constants.ts";

interface AuthContext {
    token: string | null;
    setToken: (token: string | null) => void;
    email: string | null;
    setEmail: (email: string | null) => void;
    roles: string | null;
    setRoles: (roles: string | null) => void;
}

export const AuthContext = createContext<AuthContext>({
    token: localStorage.getItem(tokenKeyName),
    setToken: () => {},
    email: localStorage.getItem(emailKeyName),
    setEmail: () => {},
    roles: localStorage.getItem(roleKeyName),
    setRoles: () => {}
});