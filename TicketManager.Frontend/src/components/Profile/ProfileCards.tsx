import { Avatar, Paper, Text, Button, Loader, Center, Modal, Flex, TextInput } from "@mantine/core";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useEffect, useState } from "react";
import { IProfile } from "../../interfaces/IProfile";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

const ProfileCard = () => {
  const { email, logout } = useAuth();
  const [user, setUser] = useState<IProfile>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleLogout = () => {
    logout();
    navigate("/app/home");
  }
  
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: ""
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email address'
    }
  })

  const handleOpenChangeData = () => {
    open();

    form.setValues({
      name: user?.name,
      email: user?.email,
      phone: user?.phone
    })
  }

  useEffect(() => {
    api.Users.getProfile().then(res => {
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
      <Modal opened={opened} onClose={close} title="Editing Profile Data" size="sm">
        <form onSubmit={form.onSubmit((values) => {
          api.Users.updateProfile({
            name: values.name,
            email: values.email,
            phone: values.phone
          }).then(() => {
            setUser((prev) => prev ? { ...prev, ...values } : undefined);
            close();
            notifications.show({
              title: 'Success',
              message: 'Profile data was successfully updated',
              color: 'green',
              position: 'bottom-center'
            });
          }).catch(() => {
            notifications.show({
              title: 'Error',
              message: 'Failed to update Profile data',
              color: 'red',
              position: 'bottom-center'
            });
          })
        })}>
          <Flex direction={"column"} gap={10}>
            <TextInput 
              label="Full Name"
              placeholder="Input your Full Name"
              {...form.getInputProps('name')}
            />
            <TextInput 
              label="E-mail"
              placeholder="Input your E-mail"
              {...form.getInputProps('email')}
            />
            <TextInput 
              label="Phone Number"
              placeholder="Input your Phone Number"
              {...form.getInputProps('phone')}
            />
            <Button type="submit" mt={20}>Save</Button>
            <Button variant="light" onClick={close}>Cancel</Button>
          </Flex>
        </form>
      </Modal>


      <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)" h={'fit-content'}  miw={{base: '100%', lg:400}} mx="auto">
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
        <Button variant="light" fullWidth mt="md" onClick={handleOpenChangeData}>
          Change Data
        </Button>
      </Paper>
    </>
  )
}

export default ProfileCard;