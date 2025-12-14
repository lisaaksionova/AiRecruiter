import {
    Button,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    TreeSelect,
} from "antd";
import { useEffect } from "react";
import {
    reverseLevelMap,
    stack,
    type Level,
    type Vacancy,
    type VacancyCreate,
} from "../../../models/vacancy.model";

interface VacancyFormProps<T> {
    header: string;
    modalOpen: boolean;
    editingVacancy?: T | null;
    apiAction: (vacancyData: T) => Promise<void>;
    onClose: () => void;
}

const VacancyForm = <T extends Vacancy | VacancyCreate>({
    header,
    modalOpen,
    editingVacancy,
    apiAction,
    onClose,
}: VacancyFormProps<T>) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (!modalOpen) {
            form.resetFields();
        }
    }, [modalOpen, form]);

    useEffect(() => {
        if (editingVacancy) {
            form.setFieldsValue(editingVacancy);
        }
    }, [editingVacancy, form]);

    const handleFinish = async (values: any) => {
        const vacancy: T = {
            ...(values.id && { id: values.id }),
            title: values.title,
            stack: values.stack,
            level: reverseLevelMap[values.level as Level],
            location: values.location,
            salary: Number(values.salary),
            description: values.description,
            minMatchPercent: Number(values.minMatchPercent),
            maxCandidates: Number(values.maxCandidates),
            companyId: 1,
        } as T;

        await apiAction(vacancy);
        form.resetFields();
        onClose();
    };

    return (
        <Modal open={modalOpen} onCancel={onClose} footer={null} destroyOnClose>
            <div className="create-vacancy-container">
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    layout="horizontal"
                    className="create-vacancy-form"
                    onFinish={handleFinish}
                    initialValues={editingVacancy ?? {}}
                >
                    <h1 className="form-title">{header}</h1>
                    <Form.Item name="id" hidden>
                        <Input type="hidden" />
                    </Form.Item>

                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            { required: true, message: "Please enter a title" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Stack"
                        name="stack"
                        rules={[
                            { required: true, message: "Please select stack" },
                        ]}
                    >
                        <TreeSelect
                            showSearch
                            style={{ width: "100%" }}
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            treeData={stack}
                            placeholder="Please select"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Level"
                        name="level"
                        rules={[
                            { required: true, message: "Please select level" },
                        ]}
                    >
                        <Select>
                            {(
                                [
                                    "Intern",
                                    "Junior",
                                    "Mid",
                                    "Senior",
                                    "Lead",
                                ] as Level[]
                            ).map((lvl) => (
                                <Select.Option key={lvl} value={lvl}>
                                    {lvl}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[
                            {
                                required: true,
                                message: "Please enter location",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Salary" required>
                        <Input.Group compact>
                            <Form.Item
                                name="salary"
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter salary",
                                    },
                                ]}
                            >
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Amount"
                                />
                            </Form.Item>
                            <Form.Item
                                name="currency"
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select currency",
                                    },
                                ]}
                            >
                                <Select
                                    style={{ width: "30%" }}
                                    placeholder="Currency"
                                >
                                    <Select.Option value="USD">
                                        USD
                                    </Select.Option>
                                    <Select.Option value="UAN">
                                        UAN
                                    </Select.Option>
                                    <Select.Option value="EUR">
                                        EUR
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item
                        label="Min Match %"
                        name="minMatchPercent"
                        rules={[
                            {
                                required: true,
                                message: "Please enter min match %",
                            },
                        ]}
                    >
                        <InputNumber
                            min={0}
                            max={100}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Max Candidates"
                        name="maxCandidates"
                        rules={[
                            {
                                required: true,
                                message: "Please enter max candidates",
                            },
                        ]}
                    >
                        <InputNumber min={1} style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Please enter description",
                            },
                        ]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                        <Button type="primary" htmlType="submit">
                            {header}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default VacancyForm;
