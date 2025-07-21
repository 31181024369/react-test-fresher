import React, { useState } from 'react';
import { Button, Checkbox, Divider, Form, Input, message, notification } from 'antd';
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { callLogin, callRegister } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';
const LoginPage=()=>{
    const [isSubmit,setIsSubmit]=useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const onFinish =async (values) => {
    setIsSubmit(true)
    const { username,password}=values;
    console.log("data login:",values)

    const res=await callLogin(username,password);
    console.log("token:",res);

    setIsSubmit(false)

    if(res?.data){
        localStorage.setItem('access_token',res.data.access_token);

        dispatch(doLoginAction(res.data.user));
        console.log("data login:",res.data.user);
        message.success("login success");
        navigate("/")
    }else{
        notification.error({
            message:"error",
            description:res.message && Array.isArray(res.message) ?res.message[0]:res.message,
            duration:5
        })
    }

    };
    const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);

    };
    return (
        <>
            <div className='register-form' style={{maxWidth: 600,margin: "60px auto",padding: "30px",
            background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "10px 5px 5px #e9e8e8"
        }}>
        <h1>Đăng nhập</h1>
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
      label="Email"
      name="username"
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
    <Form.Item label={null}>
      <Button type="primary" htmlType="submit" loading={isSubmit}>
        Login
      </Button>
    </Form.Item>
  </Form>
   <Divider>Or</Divider>
   <div>
     <span>Chưa có tài khoản?</span>
     <Link to="/register" style={{textDecoration: "none",
    color: "#4096ff",
    paddingLeft: "5px"}}>Đăng kí</Link>
   </div>
        </div>
        </>
    )
}
export default LoginPage