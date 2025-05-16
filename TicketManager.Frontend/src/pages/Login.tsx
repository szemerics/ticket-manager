import {
    Stack,
    TextInput,
    PasswordInput,
    Group,
    Button,
    Anchor, Divider
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import AuthContainer from "../components/AuthContainer.tsx";
import useAuth from "../hooks/useAuth.tsx";

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid e-mail address.'),
            password: (val: string) => (val.length <= 6 ? 'Password must contain at least 6 characters.' : null),
        },
    });


    const submit = async () => {
        try {
            await login(form.values.email, form.values.password);
            navigate('/app/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    return <AuthContainer>
        <div>
            <form onSubmit={form.onSubmit(submit)}>
                <Stack>
                    <TextInput
                        required
                        label="E-mail address"
                        placeholder="hello@mantine.dev"
                        key={form.key('email')}
                        radius="md"
                        {...form.getInputProps('email')}
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your Password"
                        key={form.key('password')}
                        radius="md"
                        {...form.getInputProps('password')}
                    />
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => navigate('/forgot')}
                            size="xs">
                        Forgot password?
                    </Anchor>
                    <Button type="submit" radius="xl">
                        Login
                    </Button>
                </Group>
                <Divider my="lg"/>
            </form>
        </div>
    </AuthContainer>
}

export default Login;