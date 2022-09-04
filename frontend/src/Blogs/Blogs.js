import React, { useState, useEffect } from 'react'
import { Col, Row, Card, Typography, Button, Select, Input, message } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";

import axios from 'axios'
import UpdateBlogs from './UpdateBlogs';

const { Text } = Typography;
const { Option } = Select
const { Search } = Input;



const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [updatedBlogs, setUpdatedBlogs] = useState([])
    const [updateModal, setUpdateModal] = React.useState(false);
    const [id, setId] = React.useState({});
    const [authorFilter, setAuthorFilter] = React.useState([])

    useEffect(() => {
        fetchHandler().then((data) => setBlogs(data.blogs));
        handleFilter();
        setUpdatedBlogs(blogs)
    }, []);
    const fetchHandler = async () => {
        const URL = "http://localhost:5000/blogs";
        return await axios.get(URL).then((res) => res.data);
    };
    const handleUpdateBlogModal = async (blog) => {
        setId(blog)
        setUpdateModal(!updateModal);
    };
    const handleDelete = async (blog) => {
        console.log(blog)
        let { _id } = blog
        console.log(_id)
        await axios
            .delete(`http://localhost:5000/blogs/${_id}`)
            .then((res) => res.data)
    }
    const handleFilter = () => {
        let arrData = [];
        blogs.forEach((blog) => {
            arrData.push(blog.author)
        })
        arrData = arrData.filter(function (item, pos, self) {
            return self.indexOf(item) === pos
        })
        setAuthorFilter(arrData)
    }
    const handleFilterChange = (value) => {
        if (value) {
            let newArr = blogs.filter((blog) => blog.author === value)
            setBlogs(newArr)
        } else {
            setBlogs(updatedBlogs)
        }
    }
    const handleSortChange = (value) => {
        if (value) {
            let newArr;
            if (value === 'asc') {
                newArr = blogs.sort((a, b) => Date.parse(a.createdDate) - Date.parse(b.createdDate))
            } else if (value === 'desc') {
                newArr = blogs.sort((a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate))
            }
            setBlogs(newArr)
        } else {
            setBlogs(updatedBlogs)
        }
    }
    const handleSearchChange = (value) => {
        console.log(value)
        if (value) {
            let newArr = blogs.filter((blog) =>
                (blog.title).toLowerCase() === value.toLowerCase() || (blog.content).toLowerCase() === value.toLowerCase()
            )
            setBlogs(newArr)
        } else {
            setBlogs(updatedBlogs)
        }
    }
    return (
        <React.Fragment>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Search placeholder="input search text"
                    enterButton style={{ width: "50vw" }}
                    onSearch={(value) => handleSearchChange(value)} allowClear />
            </Row>
            <Row style={{ padding: '5px', display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ padding: "10px" }}>Author</Text>
                <Select
                    onChange={(value) => handleFilterChange(value)}
                    style={{ width: 120 }}
                    allowClear>
                    {authorFilter && authorFilter.map((author, i) => (
                        <Option key={i} value={author}>{author}</Option>
                    ))}
                </Select>

                <Text style={{ padding: "10px" }}>Sort by created date</Text>
                <Select
                    onChange={(value) => handleSortChange(value)}
                    style={{ width: 120 }} >
                    <Option value="asc">Ascending</Option>
                    <Option value="desc">Descending</Option>
                </Select>
            </Row>
            <Row justify='space-between' gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ padding: '10px' }}>
                {blogs.length > 0 && blogs.map((blog, i) => (
                    <>
                        <Row>
                        </Row>
                        <Col span={12} style={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>
                            <Card
                                title={blog.title}
                                key={i}
                                hoverable="true"
                                extra={
                                    <Button
                                    onClick={(blog)=> handleDelete(blog)}
                                        icon={<DeleteOutlined />}>
                                    </Button>
                                }
                                style={{ padding: '20px', width: 420 }}>
                                {blog.content}<br />
                                <p style={{ marginTop: '10px', textAlign: 'right' }}>
                                    - {blog.author}<br />
                                    {(blog.createdDate).split("T")[0]}<br />
                                    {blog.updatedDate ? 'Updated on ' + blog.updatedDate : null}
                                </p> <br />
                                <p style={{ textAlign: 'left' }}>
                                    <Button onClick={() => { handleUpdateBlogModal(blog) }}>Update</Button>
                                </p>
                            </Card>
                            {updateModal && (
                                <UpdateBlogs
                                    data={id}
                                    open={updateModal}
                                    closeDrawer={() => {
                                        setUpdateModal(!updateModal);
                                    }}
                                />
                            )}
                        </Col>
                    </>
                ))}
            </Row>
        </React.Fragment>
    )
}

export default Blogs