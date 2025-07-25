
import { Form, Input, Row,Col,Button,Table, Space  } from 'antd';

import React from 'react';
const InputSearch=(props)=>{
    // const { handleSearch }=props;
    console.log("props:",props);
    const [form] = Form.useForm();
    const onFinish = values => {
        let query="";
        if(values.name || values.email){
            query+=`filter=name ~ '${values.name===undefined ?'':values.name}' and email ~ '${values.email===undefined?'':values.email}'`;
        }
        console.log("query:",query);
        if(query){
            props.handleSearch(query);
        }
        //handleSearch(query);
        // if(values.name){
        //     query+=`filter=name ~ '${values.name}'`;
        // }
        // if(values.email){
        //     query+=`filter=name ~ '${values.name}'`;
        // }
    };
    return (
        <>
         <div className="user-search" style={{marginLeft: "20px"}}>

    <br />
    <Form
     form={form}
      layout="vertical"
       onFinish={onFinish}
    >
         <Row gutter={24} align="middle">
             <Col span={8}>
                <Form.Item label="Name" name="name" >
                <Input />
                </Form.Item>
             </Col>
               <Col span={8}>
                <Form.Item label="Email" name="email" >
                <Input />
                </Form.Item>
             </Col>
               <Col span={8}>
                <Form.Item label="Phone" name="phone">
                <Input />
                </Form.Item>
             </Col>
         </Row>
         <Row justify="end">
            <Col span={3} style={{    display: "flex",
    justifyContent: "space-between"}}>
               <Button type="primary" htmlType="submit">Search</Button>

               <Button color="default" onClick={()=>{
                console.log(form);
                  console.log('Before reset:', form.getFieldsValue());
                  form.resetFields(); // This should now work
                  console.log('After reset:', form.getFieldsValue());

                //form.resetFields();
                props.setFilter("");

               }}>Clear</Button>
             </Col>
         </Row>
    </Form>
            </div>
        </>
    )
}
export default InputSearch