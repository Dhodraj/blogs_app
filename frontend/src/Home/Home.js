import React from 'react'
import { Layout, Row, Menu, Typography, Button } from 'antd';
import Blogs from '../Blogs/Blogs';
import AddBlogs from '../Blogs/AddBlogs';

const { Header, Footer } = Layout;
const { Text } = Typography;

const Home = () => {
    const [modal, setModal] = React.useState(false);

    const handleAddBlogModal = () => {
        setModal(!modal);
    };

    return (
        <React.Fragment>
            <Layout>
                <Header className="header">
                    <Menu theme="dark" mode="horizontal" />
                    <Text strong type="success" align="center" style={{ fontSize: '20px' }} >Blogs App</Text>
                </Header>
                {modal && (
                    <AddBlogs
                        open={modal}
                        closeDrawer={() => {
                            setModal(!modal);
                        }}
                    />
                )}
                <Row style={{ padding: '10px' }}>
                    <Button onClick={handleAddBlogModal}>Add</Button>
                </Row>
                <Row style={{ padding: '10px' }}>
                    <Blogs />
                </Row>
                <Footer style={{ textAlign: 'center' }}>Blogs ©2022</Footer>
            </Layout>
        </React.Fragment>
    )
}

export default Home