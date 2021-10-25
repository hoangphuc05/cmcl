import React from 'react';

import {listData, subscribeChange} from "../utils/dataFirebase";
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
            unsubscribe: null,
        };
    }

    componentDidMount() {
        listData('modules').then((data) => {
            this.setState({
                data: data,
                loading: false,
            });
        });

        this.setState({
            unsibscribe: subscribeChange("modules", (snapshot) => {
                let newModulesData = [];
                // read new grade data and update state
                snapshot.forEach(doc => {
                    newModulesData.push(doc.data());
                });
                this.setState({
                    data: newModulesData,
                });
            })
        })
    }

    componentWillUnmount() {
        if (this.state.unsubscribe)
            this.state.unsubscribe();
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