import { Avatar, Paper, Text, Button, Loader, Center } from "@mantine/core";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useEffect, useState } from "react";
import { IProfile } from "../../interfaces/IProfile";

const ProfileCard = () => {
  const { email, logout } = useAuth();
  const [user, setUser] = useState<IProfile>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/app/dashboard");
  }

  useEffect(() => {
    api.Profiles.getProfile().then(res => {
      setUser(res.data);
      setLoading(false);
    }).catch(error => {
      console.error('Failed to fetch profile:', error);
      setLoading(false);
    });
  }, [])
  
  if (loading) {
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <>
      <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)" h={'fit-content'} miw={400} mx="auto">
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          size={120}
          radius={120}
          mx="auto"
        />
        <Text ta="center" fz="lg" fw={500} mt="md">
          {user?.name}
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          {user?.email} • {localStorage.getItem("roles")?.split(",")[0]}
        </Text>

        <Button variant="filled" fullWidth mt="md" color="red" onClick={() => handleLogout()}>
          Logout
        </Button>
      </Paper>
    </>
  )
}

export default ProfileCard;