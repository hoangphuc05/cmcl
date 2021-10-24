import React from 'react';

import { listData, writeData } from '../utils/dataFirebase';
import Container from 'react-bootstrap/Container';
import {Button} from 'evergreen-ui'

import {Form, Input} from 'antd';
const formLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

export const AddGrades = (props) => {
    const [form] = Form.useForm();

    //return the form
    return (
        <Container className="max-w-xl">
            <Form
                {...formLayout}
                form={form}
                name="addGrades"
                onFinish={(values) => {
                    console.log(values);
                    writeData("grade-level", values).then(() => {
                        form.resetFields();
                    });
                }
                }  //onFinish
            >
                <Form.Item label="Title" name="title">
                    <Input placeholder="Title"/>
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input placeholder="Description"/>
                </Form.Item>

                <Form.Item className="flex justify-end">
                    <Button className="float-right" type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </Container>
    );
};