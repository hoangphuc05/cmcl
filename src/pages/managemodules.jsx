import React from 'react';
import { useParams  } from "react-router-dom";

import {listData, subscribeChange} from "../utils/dataFirebase";
import Container from 'react-bootstrap/Container';

import { Button} from 'evergreen-ui';
import {Table,Space } from 'antd';
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
    },
    {
        title:'Action',
        dataIndex:'action',
        key:'action',
        render(text, record, index) {
            console.log(record);
            return (index)
        }
    },
    
];



//functional component named ManageModules
//TODO: resubscribe when the colelction does not exist at the beginning
const ManageModules = (props) => {
    let { gradeID } = useParams();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [addModuleVisibility, setAddModuleVisibility] = React.useState(false);
    const [unsubscribe, setUnsubscribe] = React.useState(null);

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
        },
        {
            title:'Action',
            dataIndex:'action',
            align: 'right',
            key:'action',
            render(text, record, index) {
                console.log(record);
                return (<>
                    <Space>
                        <Button>Edit</Button>
                        <Button intent="danger">Delete</Button>
                    </Space>
                </>)
            }
        },
        
    ];

    React.useEffect(() => {
        listData(`grade-level/${gradeID}/modules`).then((data) => {
            setLoading(false);
            setData(data);
        });

        setUnsubscribe(subscribeChange('modules', (snapshot) => {
            let newModulesData = [];

            // read new grade data and update state
            snapshot.forEach(doc => {
                newModulesData.push(doc.data());
            });
            setData(newModulesData);
        }));

        return function cleanup(){
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, []);

    return (
        <>
        <h1>{gradeID}</h1>
        <Container>
            <h1>Manage Modules</h1>
            <Table columns={columns} dataSource={data} loading={loading}/>
            {/* <Button appearance="primary" marginTop={16} onClick={() => this.props.history.push('/addmodule')}>Add Module</Button> */}
            <div className="flex justify-end my-3">
                <Button className="" onClick={() => setAddModuleVisibility(!addModuleVisibility)}>Add new module</Button>
            </div>
        </Container>
        
        {addModuleVisibility?<AddModule gradeID={gradeID}/>:<></>}
        </>
    );
}



export default ManageModules;