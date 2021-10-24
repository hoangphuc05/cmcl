import React from 'react';

import {listData} from "../utils/dataFirebase";
import Container from 'react-bootstrap/Container';

import { Button} from 'evergreen-ui';
import {Table } from 'antd';
import { AddModule } from './addModule';

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title:'Name',
        dataIndex:'name',
        key:'name',
    },
    {
        title:'Content',
        dataIndex:'content',
        key:'content',
    }
];

//react component named ManageModules
class ManageModules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            addModuleVisibility: false,
        };
    }

    componentDidMount() {
        listData('modules').then((data) => {
            this.setState({
                data: data,
                loading: false,
            });
        });
    }

    render() {
        return (
            <>
            <Container>
                <h1>Manage Modules</h1>
                <Table columns={columns} dataSource={this.state.data} loading={this.state.loading}/>
                {/* <Button appearance="primary" marginTop={16} onClick={() => this.props.history.push('/addmodule')}>Add Module</Button> */}
                <div className="flex justify-end my-3">
                    <Button className="" onClick={() => this.setState({addModuleVisibility: !this.state.addModuleVisibility})}>Add new module</Button>
                </div>
            </Container>
            
            {this.state.addModuleVisibility?<AddModule/>:<></>}
            </>
        );
    }
}

export default ManageModules;