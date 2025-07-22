import { FaReact } from "react-icons/fa";
import React from 'react';
import { Avatar, Badge } from 'antd';
import { LuShoppingCart } from "react-icons/lu";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import { IoIosSearch } from "react-icons/io";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { callLogout } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { doLogoutAction } from "../../redux/account/accountSlice";
const Header=()=>{
    const user=useSelector(state=>state.account.user);
    console.log("user:",user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogout=async ()=>{
        const res=await callLogout();
        if(res){
            dispatch(doLogoutAction());
            message.success("logout success");
            navigate('/')
        }
    }
    const onClick = ({ key }) => {
        // message.info(`Click on item ${key}`);
    };
    const items = [
        {
            label: '1st menu item',
            key: '1',
        },
        {
            label: <label style={{cursor:'pointer'}} onClick={()=>handleLogout()}>đăng xuất</label>,
            key: 'logout',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    return (
        <>
        <div className="header">
            <div className="img-logo">
                <FaReact style={{width: "61px",height: "35px",color: "aqua"}} />
                <div style={{display: "flex",justifyItems: "center",
    alignItems: "center",
    color: "aqua"}}>HỎI DÂN IT</div>
            </div>
            <div className="search">
                <IoIosSearch className="icon-search" />
                <input className="search-input" name="search-input" type="text" placeholder="Bạn tìm gì hôm nay" style={{width: "100%",
    height: "30px",
    borderRadius: "10px",
    border: "1px solid #e3e3e3",
    paddingLeft:"40px",
     boxSizing: "border-box"
    }} />
            </div>
            <div className="badge-cart">
                 <a href="#">
                    <Badge count={5}>
                    <LuShoppingCart style={{    width: "35px",
    height: "18px",
    color: "aqua"}} />
                    </Badge>
                 </a>
            </div>
            <div className="dropdown">
                <Dropdown menu={{ items, onClick }}>
                    <a onClick={e => e.preventDefault()}>
                    <Space>
                        {user && user.email!=="" ? `Welcome, ${user.email}`:"Tài khoản"}
                       
                        <DownOutlined />
                    </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
        </>
    )
}
export default Header