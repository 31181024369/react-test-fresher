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
import { Link, useNavigate } from "react-router-dom";
import { doLogoutAction } from "../../redux/account/accountSlice";
const Header=()=>{
    const user=useSelector(state=>state.account.user);
    const isAuthenticated=useSelector(state=>state.account.isAuthenticated);
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
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',

        },
        {
            label: <label style={{cursor:'pointer'}} onClick={()=>handleLogout()}>đăng xuất</label>,
            key: 'logout',
        },
    ];
    if(user?.role.name==='SUPER_ADMIN'){
        items.unshift({
            label:<Link to="/admin">Trang quản trị</Link>,
            key: 'admin',
        })
    }
    const urlAvatar = `https://admin.vitinhnguyenkim.com.vn/static/media/nk_vien.4b5456ad33f19bdd86ae.png`;
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
                          {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}> Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <Space >
                                            <Avatar src={urlAvatar} />
                                            {user?.fullName}
                                        </Space>
                                    </Dropdown>
                                }

                    </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
        </>
    )
}
export default Header