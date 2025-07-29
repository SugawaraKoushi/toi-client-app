import { Button, Divider, Flex, Form, Input, Upload } from "antd";
import { useState } from "react";
import "./index.css";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";

const Lab2 = () => {
    const { TextArea } = Input;

    const [form] = useForm();
    const [loading, setLoading] = useState(false);
    const [searchStatus, setSearchStatus] = useState("");

    const handleUploadFile = async (options) => {
        const { file, onSuccess, onError } = options;

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);

            const url = "/lab1/files/upload";
            const response = await axios.post(url, formData);
            const data = response.data;
            form.setFieldValue("text", data);
            onSuccess(data, file);
        } catch (error) {
            console.log(error);
            onError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            const url = "/lab2/stemming/search";

            const params = {
                text: values.text,
                word: values.search,
            };

            const response = await axios.get(url, {
                params,
                responseType: "blob",
            });

            if (response.data) {
                setSearchStatus("success");

                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "lab2_result.txt");
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } else {
                setSearchStatus("error");
            }
        } catch (error) {
            console.error(error);
            setSearchStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex vertical style={{ width: "100%" }}>
            <Upload
                customRequest={handleUploadFile}
                accept=".txt"
                showUploadList={false}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    icon={<UploadOutlined />}
                    style={{ marginBottom: "12px" }}
                >
                    Загрузить файл
                </Button>
            </Upload>
            <Divider />
            <Form form={form} name="lab1" style={{ width: "100%" }}>
                <Flex vertical style={{ width: "100%" }}>
                    <Form.Item name="text" label="Текст" required>
                        <TextArea readOnly rows={10} />
                    </Form.Item>
                    <Flex gap="small" style={{ width: "100%", flexShrink: 1 }}>
                        <Form.Item
                            name="search"
                            style={{ width: "100%" }}
                            hasFeedback
                            validateStatus={searchStatus}
                        >
                            <Search
                                placeholder="Поиск"
                                enterButton="Поиск"
                                icon={<SearchOutlined />}
                                onSearch={handleSearch}
                                loading={loading}
                            />
                        </Form.Item>
                    </Flex>
                </Flex>
            </Form>
        </Flex>
    );
};

export default Lab2;
