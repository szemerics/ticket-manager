import { Avatar, Paper, Text, Button } from "@mantine/core";
import useAuth from "../hooks/useAuth"
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const { email, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate("/app/dashboard");
    
  }

  return (
    <>
      <Paper radius="md"  withBorder p="lg" bg="var(--mantine-color-body)" style={{ maxWidth: 400}}>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          size={120}
          radius={120}
          mx="auto"
        />
        <Text ta="center" fz="lg" fw={500} mt="md">
          {email}
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          {localStorage.getItem("roles")?.split(",")[0]}
        </Text>

        <Button variant="filled" fullWidth mt="md" color="red" onClick={() => handleLogout()}>
          Logout
        </Button>
      </Paper>
    </>
  )
}

export default Profile