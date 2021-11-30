import React, { useEffect } from 'react';

import { listData, writeData } from '../utils/dataFirebase';
import { uploadFile } from '../utils/storage';

import Container from 'react-bootstrap/Container';
import {Form, Input, Upload, Select} from 'antd';
import { Button } from 'evergreen-ui';

const formLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

const { Option } = Select;

//react function component named addModule
export const AddModule = (props) => {
    const [form] = Form.useForm();
    const [file, setFile] = React.useState(null);
    const [grades, setGrades] = React.useState([]);

    useEffect(() => {
        //get list of all available grades and parse it to an array of options
        listData('grade-level').then(data => {
            setGrades(data.map(grade => {
                console.log("grade: ",grade);
                return <Option key={grade.docId} value={grade.docId}>{grade.title}</Option>;
            }));
        });
    }, []);

    const handleChange = (info) => {
        console.log(info);
    };
    return(
        <Container className="max-w-xl">

            <Form
                {...formLayout}
                form={form}
                name="addModule"
                onFinish={(values) => {
                    console.log(values);
                    writeData(`/grade-level/${props.gradeID}/modules`, values).then(() => {
                        form.resetFields();
                    });
                }}
            >
                <Form.Item
                    label="Module Image"
                    // name="image"
                >
                    <Upload
                        name="image"
                        listType="picture-card"
                        showUploadList={false}
                        customRequest={({file}) => {

                            // upload file and get url
                            uploadFile(file).then((url) => {
                                setFile(url);
                                form.setFieldsValue({image: url});
                            });
                        } }
                        onChange={handleChange}
                    >
                        {file ? <img src={file}/> : "Upload Image"}
                    </Upload>
                </Form.Item>

                {/* Hidden form item to save picture url */}
                <Form.Item name="image" hidden>
                    <Input/>
                </Form.Item>

                <Form.Item label="Grade" name="grade">
                    <Select placeholder="Select which grade this modules belong to" 
                        mode="multiple"
                        allowClear
                    >
                        {grades}
                    </Select>
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

                <Form.Item label="Video title" name="videoTitle">
                    <Input/>
                </Form.Item>

                <Form.Item label="Video url" name="videoUrl">
                    <Input type="url"/>
                </Form.Item>



                <Form.Item className="flex justify-end">
                    <Button className="float-right" type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </Container>
    )
}