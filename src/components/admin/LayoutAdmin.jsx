import React, { useState } from 'react';
import {
    AppstoreOutlined,
  DollarCircleOutlined,
  ExceptionOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content,Footer } = Layout;
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';
const LayoutAdmin=()=>{
const user=useSelector(state=>state.account.user);
const dispatch=useDispatch();
 const handleLogout=async ()=>{
        const res=await callLogout();
        if(res){
            dispatch(doLogoutAction());
            message.success("logout success");
            navigate('/login')
        }
    }
    const onClick = ({ key }) => {
    // message.info(`Click on item ${key}`);
    };
     const [collapsed, setCollapsed] = useState(false);
    const {
    token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const items = [
        {
            label: <label
                style={{ cursor: 'pointer' }}
            >Quản lý tài khoản</label>,
            key: 'account',
        },
         {
            label: <Link to={'/'}>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={()=>handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },

    ];
    const urlAvatar = `https://admin.vitinhnguyenkim.com.vn/static/media/nk_vien.4b5456ad33f19bdd86ae.png`;
    return (
        <>
        <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}  theme="light">
        <div className="demo-logo-vertical" />
         <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                        Admin
        </div>

        <Menu
         
          mode="inline"
          defaultSelectedKeys={['1']}
          items={
            [
        {
            label: <Link to='/admin'>Dashboard</Link>,
            key: 'dashboard',
            icon: <AppstoreOutlined />
        },
        {
            label: <span>Manage Users</span>,
            // key: 'user',
            icon: <UserOutlined />,
            children: [
                {
                    label: <Link to='/admin/user'>CRUD</Link>,
                    key: 'crud',
                    icon: <TeamOutlined />,
                },
            ]
        },
        {
            label: <Link to='/admin/book'>Manage Books</Link>,
            key: 'book',
            icon: <ExceptionOutlined />
        },
        {
            label: <Link to='/admin/order'>Manage Orders</Link>,
            key: 'order',
            icon: <DollarCircleOutlined />
        },

    ]
          }
        />
      </Sider>
      <Layout  style={{ minHeight: '100vh' }}
                className="layout-admin"
>
        <Header style={{ padding: 0, background: colorBgContainer,    display: "flex",
    justifyContent: "space-between" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Dropdown menu={{ items, onClick }}>
            <a onClick={e => e.preventDefault()}>
            <Space>
                {/* welcome, {user?.name} */}
                <Space style={{ cursor: "pointer" }}>
                            <Avatar src={urlAvatar} />
                            {user?.name}
                        </Space>

                <DownOutlined />
            </Space>
            </a>
            </Dropdown>
        </Header>
        <Content
       
        >
          <Outlet></Outlet>
        </Content>
         <Footer style={{ textAlign: 'center' }}>
         React Text Fresher ©{new Date().getFullYear()} Hỏi dân it
        </Footer>
      </Layout>
    </Layout>
        </>
    )
}
export default LayoutAdmin