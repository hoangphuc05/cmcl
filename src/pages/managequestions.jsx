import React from 'react';

import { listData } from '../utils/dataFirebase';
import Containner from 'react-bootstrap/Container';

import { Button } from 'evergreen-ui';
import { Table } from 'antd';

const columns = [
    {
        title: 'Question',
        dataIndex: 'question',
        key: 'question',
    },
    {
        title: 'Answer',
        dataIndex: 'answer',
        key: 'answer',
    }
];

//react component named ManageQuestions
class ManageQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        }
    }

    componentDidMount() {
        listData('questions').then((data) => {
            this.setState({
                data: data,
                loading: false,
            })
        })
    }

    render() {
        return (
            <Containner>
                <h1>Manage Questions</h1>
                <Table columns={columns} dataSource={this.state.data} />
                <Button onClick={() => this.props.history.push('/addquestion')}>Add Question</Button>
            </Containner>
        )
    }
}

export default ManageQuestions;