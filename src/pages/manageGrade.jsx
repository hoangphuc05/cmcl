import React from "react";

import {listData, subscribeChange, writeData, deleteData, updateData} from "../utils/dataFirebase";
import Container from 'react-bootstrap/Container';

import { Button, Popover, Menu} from 'evergreen-ui';
import {Table , Space, Popconfirm, Modal} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
// import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import { AddGrades } from "./addGrades";


// const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);


// const columns = [
//     {
//         title: 'Title',
//         dataIndex: 'title',
//         key: 'title',
//     },
//     {
//         title: 'Description',
//         dataIndex: 'description',
//         key: 'description',
//     },
//     {
//         title: 'Description',
//         dataIndex: 'docId',
//         key: 'docId',
//         align: 'right',
//         render: (text, record) => (
//             <Space>
//                 {console.log(record.docId)}
//                 <Button>Edit</Button>
//                 <Button intent="danger" onClick={()=>{this.setState({
//                     modalVisible: true,
//                     modalDocID: record.docId
//                 })}}>Delete</Button>
//             </Space>
//         ),
//     }
// ];

const deleteRow = async (docId) => {
    deleteData("grade-level",docId);
}

// react class component named Grade
//TODO: add sort ability
class Grade extends React.Component {
    //initialize state
    constructor(props) {
        super(props);
        this.state = {
            gradeData: null,
            loading: true,
            addGradeVisibility: false,
            unsubscribe: null,
            currentObject: null,
            modalVisible: false,
            modalConfirmLoading: false,
            modalGrade: null,
        };
    }

    //hopefully this is a good idea
    columns = [
        {
            title: 'Index',
            dataIndex: 'index',
            key: 'index',
            align: 'left', //left align
            defaultSortOrder: 'ascend',
            // sortOrder: 'ascend',
            sorter: (a, b) => a.index - b.index,
        },
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
            align: 'right',
            render: (text, record, index) => (
                <Space>
                    <Popover
                        content={({close}) => (
                            <Menu>
                                <Menu.Group>
                                    <Menu.Item onSelect={() => {this.swapIndexUp(index); close();}}>Move up</Menu.Item>
                                    <Menu.Item onSelect={() => {this.swapIndexDown(index); close();}}>Move down</Menu.Item>
                                </Menu.Group>
                                <Menu.Divider />
                                <Menu.Group>
                                    <Menu.Item>Edit</Menu.Item>
                                    <Menu.Item>View modules</Menu.Item>
                                </Menu.Group>
                            </Menu>
                        )
                        }
                    >                    
                        <Button>Action</Button>
                    </Popover>
                    <Button intent="danger" onClick={()=>{this.setState({
                        modalVisible: true,
                        modalGrade: record
                    })}}>Delete</Button>
                </Space>
            ),
        }
    ];

    //swap two grade indexes
    swapIndexUp = (index) => {

        //exit if index is at top
        if (index === 0) {
            return;
        }
        const { gradeData } = this.state;
        const newGradeData = gradeData.map(item => {
            if (item.index === index) {
                item.index = index - 1;
                // update new data on firebase
                updateData("grade-level", item.docId, item);
                console.log(item);
            } else if (item.index === index - 1) {
                item.index = index;
                // update new data on firebase
                updateData("grade-level", item.docId, item);

            }
            return item;
        });
        this.setState({
            gradeData: newGradeData,
        });
    }

    //swap two grade indexes
    swapIndexDown = (index) => {
        //exit if index is at bottom
        if (index === this.state.gradeData.length - 1) {
            return;
        }
        const { gradeData } = this.state;
        const newGradeData = gradeData.map(item => {
            if (item.index === index) {
                item.index = index + 1;

                // update new data on firebase
                updateData("grade-level", item.docId, item);
            } else if (item.index === index + 1) {
                item.index = index;

                // update new data on firebase
                updateData("grade-level", item.docId, item);
            }
            return item;
        });
        this.setState({
            gradeData: newGradeData,
        });
    }

    componentDidMount() {
        listData("grade-level").then(allGrade => {
            console.log(allGrade);
            this.setState({
                gradeData: allGrade,
                loading: false,
            })
        });

        //subscribe to data changes
        this.setState({
            unsibscribe: subscribeChange("grade-level", (snapshot) => {
                let newGradeData = [];
                // read new grade data and update state
                snapshot.forEach(doc => {
                    newGradeData.push({
                        docId: doc.id,
                        ...doc.data()
                    });
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

    modalOk = () => {

        //show loading
        this.setState({
            modalConfirmLoading: true,
        });

        //delete data then close the modal
        deleteRow(this.state.modalGrade.docId).then(() => {
            this.setState({
                modalVisible: false,
                modalConfirmLoading: false,
                modalGrade: null,
            });
        });
    }
    modalCancel = () => {
        //close the modal and set the id pointer to null
        this.setState({
            modalVisible: false,
            modalGrade: null,
        });
    }


    // render method
    render() {
        // return jsx
        return (
        <>
            <Modal
                title="Delete this grade?"
                visible={this.state.modalVisible}
                onOk={this.modalOk}
                onCancel={this.modalCancel}
            >
                {/*if there is a grade to delete, display it*/}
                {this.state.modalGrade?<>
                    
                    <p><b>Title:</b>{" "}{this.state.modalGrade.title}</p>
                    <p><b>Description:</b>{" "}{this.state.modalGrade.description}</p>
                </>
                : null}
                

            </Modal>
            <Container>
                <h1>List of all grades</h1>
                
                <div>
                    <Table columns={this.columns} dataSource={this.state.gradeData} loading={this.state.loading}/>
                </div>
            <div className="flex justify-end my-3 mx-2">
                <Space>
                <Button className="" onClick={() => this.setState({addGradeVisibility: !this.state.addGradeVisibility})}>Add new grade</Button>
                </Space>
            </div>
            </Container>
            {this.state.addGradeVisibility?<AddGrades/>:<></>}
        </>
        

    );
  }
}

export default Grade;