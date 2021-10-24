import React from 'react';

import { listData, writeData } from '../utils/dataFirebase';
import { uploadFile } from '../utils/storage';

import Container from 'react-bootstrap/Container';
import {Form, Input, Upload} from 'antd';
import { Button } from 'evergreen-ui';

const formLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

//react function component named addModule
export const AddModule = () => {
    const [form] = Form.useForm();
    const [file, setFile] = React.useState(null);
    const handleChange = (info) => {
        console.log(info);
    };
    return(
        <Container className="max-w-xl">

            <Form
                {...formLayout}
                form={form}
                name="addModule"
                onFinish={(values) => {}}
            >
                <Form.Item
                    label="Module Image"
                    name="image"
                >
                    <Upload
                        name="image"
                        listType="picture-card"
                        showUploadList={false}
                        customRequest={({file}) => {
                            uploadFile(file).then((url) => {
                                setFile(url);
                            });
                        } }
                        onChange={handleChange}
                    >
                        {file ? <img src={file}/> : "Upload Image"}
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Module Title"
                    name="title">
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Module Name"
                    name="name">
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Module Content"
                    name="content">
                    <Input.TextArea />
                </Form.Item>



                <Form.Item className="flex justify-end">
                    <Button className="float-right" type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </Container>
    )
}