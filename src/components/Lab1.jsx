import { Button, Divider, Flex, Form, Input, Select, Upload } from "antd";
import { useState } from "react";
import "./index.css";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";

const Lab1 = () => {
    const { TextArea } = Input;

    const [form] = useForm();
    const [algorithm, setAlgorithm] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchStatus, setSearchStatus] = useState("");
    const [position, setPosition] = useState();

    const algorithms = [
        { value: 1, label: "Прямой поиск" },
        { value: 2, label: "Кнута, Морриса и Пратта" },
        { value: 3, label: "Бойера и Мура" },
    ];

    const handleSelectAlgorithmChange = (value) => {
        setAlgorithm(value);
    };

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
            let url;

            switch (algorithm) {
                case 1:
                    url = "/lab1/search/direct-search";
                    break;
                case 2:
                    url = "/lab1/search/kmp";
                    break;
                case 3:
                    url = "/lab1/search/bm";
                    break;    
                default:
                    url = "/lab1/search/kmp";
                    break;
            }

            const params = {
                text: values.text,
                searchText: values.search,
            };
            const response = await axios.get(url, { params });
            if (response.data) {
                setPosition(response.data);
                setSearchStatus("success");
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
                    <Form.Item
                        name="algorithm"
                        label="Алгоритм поиска"
                        initialValue={1}
                    >
                        <Select
                            style={{ width: "200px" }}
                            options={algorithms}
                            onChange={handleSelectAlgorithmChange}
                        />
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
                    <p>Искомый текст на позиции: {position}</p>
                </Flex>
            </Form>
        </Flex>
    );
};

export default Lab1;
