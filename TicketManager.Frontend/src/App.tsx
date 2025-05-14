import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import { useState } from 'react'
import {emailKeyName, roleKeyName, tokenKeyName} from "./constants/constants.ts";
import { MantineProvider } from '@mantine/core';
import { theme } from "./theme.ts";
import Routing from "./routing/Routing.tsx";
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.tsx';
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

function App() {
  const [token, setToken] = useState(localStorage.getItem(tokenKeyName));
  const [email, setEmail] = useState(localStorage.getItem(emailKeyName));
  const [roles, setRoles] = useState(localStorage.getItem(roleKeyName));

  return (
  <MantineProvider theme={theme}>
    <ModalsProvider>
      <Notifications />
      <BrowserRouter>
        <AuthContext.Provider value={{ token, setToken, email, setEmail, roles, setRoles }}>
          <Routing />
        </AuthContext.Provider>
      </BrowserRouter>
    </ModalsProvider>
  </MantineProvider>
);


}

export default App
