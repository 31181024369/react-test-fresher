import React, { useState } from 'react';
import { Button, Modal,Form, Input, message } from 'antd';
import { callCreateAUser } from '../../../services/api';

const UserModalCreate=(props)=>{
    const {openModalCreate,setOpenModalCreate,fetchUser}=props;
    const [isSubmit, setIsSubmit] = useState(false);
    //const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] =Form.useForm();
  const showModal = () => {
    setOpenModalCreate(true);
  };
  const handleOk = () => {
    setOpenModalCreate(false);
  };
  const handleCancel = () => {
    setOpenModalCreate(false);
  };
  const onFinish =async (values) => {
    const {name,password,email,address}=values
    console.log('Success:', values);
    setIsSubmit(true);
    const res=await callCreateAUser(name,email,password,address);
    if(res && res.data){
        message.success("create user success");
        form.resetFields();
        setOpenModalCreate(false)
        await fetchUser();
    }else{
        message.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            }
        )
    }
    setIsSubmit(false)

};
    return (
        <>
      <Modal
        title="Thêm mới người dùng"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={openModalCreate}
        // onOk={handleOk}
        onOk={() => { form.submit() }}
        onCancel={handleCancel}
        confirmLoading={isSubmit}
      >
          <Form
           form={form}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
    >
      <Form.Item label="Tên hiển thị" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}>
        <Input />
      </Form.Item>
       <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password />
        </Form.Item>
         <Form.Item label="Email" name="email"  rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
            <Input />
        </Form.Item>
        <Form.Item label="địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
            <Input />
        </Form.Item>
    </Form>
      </Modal>
        </>
    )
}
export default UserModalCreate