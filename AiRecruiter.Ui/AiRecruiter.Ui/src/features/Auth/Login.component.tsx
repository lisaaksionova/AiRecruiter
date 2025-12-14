import { Button, Form, Input, Card, message } from 'antd';
import { useAuthStore } from '../../stores/auth.store';
import { useNavigate } from 'react-router-dom';
import './Auth.styles.css';

interface LoginFormData {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { login, loading, error, role } = useAuthStore();

    const onFinish = async (values: LoginFormData) => {
        try {
            await login(values);
            // Get the latest role value after login
            const currentRole = useAuthStore.getState().role;
            console.log('User role:', currentRole);
            message.success('Login successful');
            navigate(currentRole === 'Candidate' ? '/applicant' : '/company');
        } catch {
            // Error is handled by the store
        }
    };

    return (
        <div className="auth-container">
            <Card title="Login" className="auth-card">
                <Form<LoginFormData>
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                            { whitespace: true, message: 'Email cannot be empty!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { whitespace: true, message: 'Password cannot be empty!' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {error && <div className="auth-error">{error}</div>}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Log In
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;