import "@mantine/core/styles.css";
import { useState } from 'react'
import {emailKeyName, tokenKeyName} from "./constants/constants.ts";
import { MantineProvider } from '@mantine/core';
import { theme } from "./theme.ts";
import Routing from "./routing/Routing.tsx";
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.tsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem(tokenKeyName));
  const [email, setEmail] = useState(localStorage.getItem(emailKeyName));

  return <MantineProvider theme={theme}>
      <BrowserRouter>
        <AuthContext.Provider value={{ token, setToken, email, setEmail }}>
          <Routing/>
        </AuthContext.Provider>
      </BrowserRouter>
    </MantineProvider>

}

export default App
