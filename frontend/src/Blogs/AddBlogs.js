import React, { useState } from 'react'
import { Form, Input, Button, Modal, message, Popconfirm } from 'antd';
import axios from 'axios'

const AddBlogs = (props) => {

    const [form] = Form.useForm();
    const [inputs, setInputs] = useState({
        title: '',
        author: '',
        content: ''
    })

    const sendRequest = async () => {
        await axios
            .post("http://localhost:5000/blogs", {
                title: String(inputs.title),
                author: String(inputs.author),
                content: String(inputs.content),
            })
            .then((res) => res.data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() =>{
            props.closeDrawer()
            message.success({
                content: 'Blog added',
                duration: 3,
            })
        });
    };
    const cancel = () => {
        message.info({
            content: `Canceled`,
            duration: 3,
        });
    };

    return (
        <Modal
            title="Add Blogs"
            visible={props.open}
            onCancel={props.closeDrawer}
            bodyStyle={{
                display: "flex",
                justifyContent: "center",
            }}
            footer={
                <div style={{ padding: "4px", textAlign: "right" }}>
                    <Button type="default" style={{ float: "left" }} onClick={props.closeDrawer}>
                        Cancel
                    </Button>
                    <Popconfirm
                            title="Confirm Save?"
                            onConfirm={handleSubmit}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                            placement="topRight"
                        >
                            <Button>
                                Save
                            </Button>
                        </Popconfirm>
                </div>
            }>
            <Form form={form} layout="vertical">

                <Form.Item label="Title"
                    rules={[
                        { required: true, message: "Please enter blog title" },
                    ]}>
                    <Input
                        name='title'
                        onChange={({target: {value}})=> {
                            setInputs({...inputs, title: value})
                        }} />
                </Form.Item>

                <Form.Item label="Content"
                    rules={[
                        { required: true, message: "Please enter blog content" },
                    ]}>
                    <Input.TextArea
                        name='content'
                        onChange={({target: {value}})=> {
                            setInputs({...inputs, content: value})
                        }} />
                </Form.Item>

                <Form.Item 
                    label="Author"
                    rules={[
                        {
                          required: true,
                          message: 'Please enter author name!',
                        },
                      ]}>
                    <Input
                        name='author'
                        onChange={({target: {value}})=> {
                            setInputs({...inputs, author: value})
                        }} />
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default AddBlogs;