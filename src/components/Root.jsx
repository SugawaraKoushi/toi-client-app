import { Flex, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router";

const Root = () => {
    const items = [
        {
            key: "/lab1",
            label: <Link to="/lab1">Лаб №1</Link>,
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header>
                <Flex
                    style={{ maxWidth: "1200px", margin: "auto" }}
                    align="center"
                    justify="space-between"
                >
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={items}
                        disabledOverflow
                    />
                </Flex>
            </Header>
            <Layout
                style={{
                    margin: "auto",
                    width: "100%",
                    maxWidth: "1200px",
                }}
            >
                <Content className="content-layout">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Root;
