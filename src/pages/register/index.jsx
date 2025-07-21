import React, { useState } from 'react';
import { Button, Checkbox, Divider, Form, Input, message, notification } from 'antd';
import './register.css'
import { Link, useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/api';
const RegisterPage=()=>{
    const [isSubmit,setIsSubmit]=useState(false);
    const navigate = useNavigate();
  const onFinish =async (values) => {
   
    setIsSubmit(true)
    const { fullname,email,password,phone}=values;

    const res=await callRegister(fullname,email,password,phone);
  
    setIsSubmit(false)
  
    if(res?.data?._id){
        message.success("register success");
        navigate("/login")
    }else{
        notification.error({
            message:"error",
            description:res.message && Array.isArray(res.message)?res.message[0]:res.message,
            duration:5
        })
    }
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);

};

    return (
        <div className='register-form' style={{maxWidth: 600,margin: "60px auto",padding: "30px",
            background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "10px 5px 5px #e9e8e8"
        }}>
        <h1>Đăng kí tài khoản</h1>
        <Divider />
         <Form
         layout="vertical"
    name="basic"
   
    style={{ maxWidth: 600,
     } }
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Fullname"
      name="fullname"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
     <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
     <Form.Item
      label="Phone"
      name="phone"
      rules={[{ required: true, message: 'Please input your phone!' }]}
    >
      <Input />
    </Form.Item>
    

    

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit" loading={isSubmit}>
        Register
      </Button>
    </Form.Item>
  </Form>
   <Divider>Or</Divider>
   <div>
     <span>Chưa có tài khoản?</span>
     <Link to="/login" style={{textDecoration: "none",
    color: "#4096ff",
    paddingLeft: "5px"}}>đăng nhập</Link>
   </div>
  
        </div>
    )
}
export default RegisterPage