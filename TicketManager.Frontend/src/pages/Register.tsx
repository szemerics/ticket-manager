import AuthContainer from "../components/AuthContainer.tsx";
import { useForm } from "@mantine/form";
import { Button, TextInput, PasswordInput, Modal, Text } from "@mantine/core";
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
            phone: ""
        },
        validate: {
            name: (value) => value.length < 2 ? "Name must have at least 2 letters" : null,
            email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address"),
            password: (value) => value.length < 6 ? "Password must have at least 6 characters" : null,
            phone: (value) => value.length < 6 ? "Phone must have at least 6 characters" : null
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            await api.Users.registerAnonym(values);
            setModalOpened(true);
        } catch (error) {
            form.setErrors({ email: "Registration failed. Please try again." });
        }
    };

    return <>
        <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Registration Successful" centered>
            <Text mb="md">Your registration was successful!</Text>
            <Button fullWidth onClick={() => navigate("/app/login")}>Go to Login</Button>
        </Modal>
        <AuthContainer>
            <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: "100%" }}>
                <TextInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    {...form.getInputProps("name")}
                    mb="md"
                />
                <TextInput
                    label="Email"
                    placeholder="Enter your email"
                    {...form.getInputProps("email")}
                    mb="md"
                />
                <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    {...form.getInputProps("password")}
                    mb="md"
                />
                <TextInput
                    label="Phone"
                    placeholder="Enter your phone number"
                    {...form.getInputProps("phone")}
                    mb="md"
                />
                <Button type="submit" fullWidth mt="md">Register</Button>
            </form>
        </AuthContainer>
    </>
}

export default Register;