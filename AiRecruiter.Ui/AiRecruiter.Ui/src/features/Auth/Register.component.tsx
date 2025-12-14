import { Button, Form, Input, Card, Radio, message, InputNumber, TreeSelect } from 'antd';
import { useAuthStore } from '../../stores/auth.store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Auth.styles.css';
import { stack } from '../../models/vacancy.model';

interface CandidateFormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    skills: string[];
    experienceYears: number;
    location: string;
    aboutMe: string;
    salary: number;
}

interface CompanyFormData {
    email: string;
    password: string;
    name: string;
    description: string;
}

const Register = () => {
    const navigate = useNavigate();
    const { registerCandidate, registerCompany, loading, error } = useAuthStore();
    const [form] = Form.useForm();
    const [role, setRole] = useState<'applicant' | 'company'>('applicant');

    const onFinish = async (values: CandidateFormData | CompanyFormData) => {
        try {
            if (role === 'applicant') {
                await registerCandidate(values as CandidateFormData);
                navigate('/applicant');
            } else {
                await registerCompany(values as CompanyFormData);
                navigate('/company');
            }
            message.success('Registration successful');
        } catch {
            // Error is handled by the store
        }
    };

    return (
        <div className="auth-container">
            <Card title="Register" className="auth-card">
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    onValuesChange={(changedValues) => {
                        if (changedValues.role) {
                            setRole(changedValues.role);
                            form.resetFields(['email', 'password', 'confirmPassword']);
                        }
                    }}
                >
                    <Form.Item
                        label="I am a"
                        name="role"
                        initialValue="applicant"
                        rules={[{ required: true, message: 'Please select your role!' }]}
                    >
                        <Radio.Group>
                            <Radio.Button value="applicant">Job Seeker</Radio.Button>
                            <Radio.Button value="company">Employer</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The passwords do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {role === 'applicant' ? (
                        // Candidate specific fields
                        <>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[
                                    { required: true, message: 'Please enter your first name!' },
                                    { max: 50, message: 'First name cannot exceed 50 characters!' }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[
                                    { required: true, message: 'Please enter your last name!' },
                                    { max: 50, message: 'Last name cannot exceed 50 characters!' }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Skills"
                                name="skills"
                            >
                                <TreeSelect
                                    treeData={stack}
                                    multiple
                                    treeCheckable
                                    showSearch
                                    placeholder="Select your skills"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Years of Experience"
                                name="experienceYears"
                                rules={[
                                    { required: true, message: 'Please enter your experience!' },
                                    { type: 'number', min: 0, max: 60, message: 'Experience years must be between 0 and 60!' }
                                ]}
                            >
                                <InputNumber min={0} max={60} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Location"
                                name="location"
                                rules={[{ max: 50, message: 'Location cannot exceed 50 characters!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="About Me"
                                name="aboutMe"
                                rules={[{ max: 1000, message: 'About me cannot exceed 1000 characters!' }]}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>

                            <Form.Item
                                label="Expected Salary"
                                name="salary"
                                rules={[
                                    { required: true, message: 'Please enter your expected salary!' },
                                    { type: 'number', min: 0, message: 'Salary must be a positive number!' }
                                ]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    min={0}
                                    addonBefore="$"
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>
                        </>
                    ) : (
                        // Company specific fields
                        <>
                            <Form.Item
                                label="Company Name"
                                name="name"
                                rules={[
                                    { required: true, message: 'Please enter company name!' },
                                    { max: 50, message: 'Company name cannot exceed 50 characters!' }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Company Description"
                                name="description"
                                rules={[
                                    { required: true, message: 'Please enter company description!' },
                                    { min: 150, message: 'Description must be at least 150 characters!' },
                                    { max: 500, message: 'Description cannot exceed 500 characters!' }
                                ]}
                            >
                                <Input.TextArea 
                                    rows={6}
                                    showCount
                                    maxLength={500}
                                />
                            </Form.Item>
                        </>
                    )}

                    {error && <div className="auth-error">{error}</div>}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Register;