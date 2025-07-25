import React, { useEffect, useState } from 'react';
import { Form, Input, Row,Col,Button,Table, Space  } from 'antd';
import { fetchListUser } from '../../../services/api';
import InputSearch from './inputSearch';
import UserModalDetail from './UserModalDetail';
import { CloudUploadOutlined, DeleteTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import UserModalCreate from './UserModalCreate';
import UserImport from './UserImport';
const TableUser=()=>{
    const [listUser,setListUser]=useState([]);
    const [current,setCurrent]=useState(1);
    const [pageSize,setPageSize]=useState(4);
    const [total,setTotal]=useState(0);
    const [isLoading,setIsLoading]=useState(false);
    const [filter,setFilter]=useState("");
    const [sortQuery,setSortQuery]=useState("");
    const [dataViewDetail,setDataViewDetail]=useState("");
    const [openViewDetail,setOpenViewDetail]=useState(false);
    const [openModalCreate,setOpenModalCreate]=useState(false);
    const [openModalImport,setOpenModalImport]=useState(false);
    useEffect(()=>{
        fetchUser();
    },[current,pageSize,filter,sortQuery])
    const fetchUser= async ()=>{
        setIsLoading(true)
        let query=`page=${current}&size=${pageSize}`;
        // if (searchFilter) {
        //     query += `&${searchFilter}`
        // }
        if(filter){
            query+=`&${filter}`
        }
        if(sortQuery){
            query+=`&${sortQuery}`
        }
        console.log("query search:",query);
        const res=await fetchListUser(query);
        if(res &&res.data){
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
        //console.log("data user",{current,pageSize,total});
    }
    const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        sorter:true,
        render: (text, record, index) => {
                return (
                    <a href='#' onClick={() => {
                        setDataViewDetail(record);
                        setOpenViewDetail(true);
                        console.log("data:",dataViewDetail)
                    }}>{record.id}</a>
                )
            }

    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter:true
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        sorter: true
    },
    {
        title: 'Age',
        dataIndex: 'age',
        sorter: true
    },
     {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      
    <Button type="primary" danger>
      <a>Delete</a>
    </Button>
    ),
    }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
     console.log('sort:', sorter);
    if(pagination && pagination.current!==current){
        setCurrent(pagination.current);
    }
    if(pagination && pagination.pageSize!==pageSize){
        setPageSize(pagination.pageSize);
        setCurrent(1);
    }
    if(sorter && sorter.field){
        console.log("sort");
        const q=sorter.order==='ascend'?`sort=${sorter.field}`:`sort=${sorter.field},desc`;
        setSortQuery(q);
    }
    };
    const handleSearch = (query) => {
        // fetchUser(query)
        console.log("query search:",query);
        setFilter(query);
    }
    const renderHeader=()=>{
        return (
            <>
            <div className='header-table' style={{display:"flex", justifyContent:"space-between"}}>
                <span>Table List user</span>
                <div className='list-button' style={{display:"flex",gap:15}}>
                     <Button type="primary"  icon={<ExportOutlined />}>Export</Button>
                     <Button type="primary" icon={<CloudUploadOutlined />}  onClick={()=>{setOpenModalImport(true)}}>Import</Button>
                     <Button type="primary"  icon={<PlusOutlined />} onClick={()=>{setOpenModalCreate(true)}}>Add user</Button>
                     <Button type='ghost' onClick={() => {
                        setFilter("");
                        setSortQuery("")
                    }}>
                        <ReloadOutlined />
                    </Button>

                </div>
            </div>
            </>
        )
    }

    return (
        <>
        <InputSearch handleSearch={handleSearch}
        setFilter={setFilter}
        ></InputSearch>
         <div className='user-table'  style={{marginLeft: "10px",paddingTop:"20px"}}>
                        <Table title={renderHeader}
                         columns={columns}
                          dataSource={listUser}
                           onChange={onChange}
                        loading={isLoading}
                        pagination={{ current: current,
                        pageSize:pageSize,
                         showSizeChanger: true,
                        total:total}} />
        </div>
        <UserModalDetail dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        ></UserModalDetail>
        <UserModalCreate openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchUser={fetchUser}
        ></UserModalCreate>
        <UserImport openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
        fetchUser={fetchUser}
        ></UserImport>
        </>
    )
}
export default TableUser