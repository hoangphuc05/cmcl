import React from "react";

import {listData, subscribeChange} from "../utils/dataFirebase";
import Container from 'react-bootstrap/Container';

import { Button} from 'evergreen-ui';
import {Table } from 'antd';

import { AddGrades } from "./addGrades";

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Description',
        dataIndex: 'docId',
        key: 'docId',
        render: (text, record) => (
            <Button>Action</Button>
        ),
    }
];
// react class component named Grade
class Grade extends React.Component {
    //initialize state
    constructor(props) {
        super(props);
        this.state = {
            gradeData: null,
            loading: true,
            addGradeVisibility: false,
            unsubscribe: null,
        };
    }

    componentDidMount() {
        listData("grade-level").then(allGrade => {
            this.setState({
                gradeData: allGrade,
                loading: false,
            })
        });
        this.setState({
            unsibscribe: subscribeChange("grade-level", (snapshot) => {
                let newGradeData = [];
                // read new grade data and update state
                snapshot.forEach(doc => {
                    newGradeData.push(doc.data());
                });
                this.setState({
                    gradeData: newGradeData,
                });
            })
        })
    }

    //unsubscribe from data when unmounting
    componentWillUnmount() {
        if (this.state.unsubscribe)
            this.state.unsubscribe();
    }

    // render method
    render() {
        // return jsx
        return (
        <>
            <Container>
                <h1>List of all grades</h1>
                
                <div>
                    <Table columns={columns} dataSource={this.state.gradeData} loading={this.state.loading}/>
                </div>
            <div className="flex justify-end my-3">
                <Button className="" onClick={() => this.setState({addGradeVisibility: !this.state.addGradeVisibility})}>Add new grade</Button>
            </div>
            </Container>
            {this.state.addGradeVisibility?<AddGrades/>:<></>}
        </>
        

    );
  }
}

export default Grade;