import {Center, Divider, Image, Paper, Text} from "@mantine/core";
import { JSX } from "react";
import logo from '/ticketManagerLogo.png';

interface AuthContainerInterface {
    children: JSX.Element;
}

const AuthContainer = ({children}: AuthContainerInterface) => {
    return <div className="auth-container">
        <Center><Image src={logo} alt="img" w={150} mt={30}/></Center>
        <Center>
            <Paper radius="md" p="xl" withBorder maw={600} m={10}>
                <Text size="lg" fw={500}>
                    Welcome to the Ticket Manager app!
                </Text>
                <Divider my="lg"/>
                {children}
            </Paper>
        </Center>
    </div>
}

export default AuthContainer;