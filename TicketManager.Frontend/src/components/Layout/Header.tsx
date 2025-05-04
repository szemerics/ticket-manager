import {Box, Burger, Flex, Image} from "@mantine/core";
import UserMenuDropdown from "./UserMenuDropdown.tsx";
import logo from '/ticketManagerLogo.png';


const Header = ({opened, toggle}: any) => {
    return (
        <Flex
            justify="space-between"
            style={{display: "flex", alignItems: "center", height: "100%", paddingLeft: '20px', paddingRight: '20px'}}
        >
            <Image src={logo} alt="img" w={80} px={5}/>
            <Box>
                <UserMenuDropdown/>
            </Box>
            <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
                mx={15}
            />
        </Flex>
    );
};

export default Header;
