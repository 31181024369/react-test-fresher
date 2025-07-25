import React, { useState } from 'react';
import { Button, Drawer, Descriptions } from 'antd';
import moment from 'moment';
const UserModalDetail=(props)=>{
    const {dataViewDetail,setDataViewDetail,openViewDetail,setOpenViewDetail}=props;
    //const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpenViewDetail(true);
    };

    const onClose = () => {
        setOpenViewDetail(false);
    };
    return (
        <>
      <Drawer

        title="Chức năng xem chi tiết"
        width={"50vw"}

        onClose={onClose}
        open={openViewDetail}
      >
        <Descriptions  title="Thông tin user"
                    bordered
                    column={2}
>
  <Descriptions.Item label="UserName">{dataViewDetail?.name}</Descriptions.Item>
  <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
  <Descriptions.Item label="Gender">{dataViewDetail?.gender}</Descriptions.Item>
  <Descriptions.Item label="Age">{dataViewDetail?.age}</Descriptions.Item>
  <Descriptions.Item label="createdAt">
    {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
  </Descriptions.Item>
  <Descriptions.Item label="updatedAt">
    {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
  </Descriptions.Item>
</Descriptions>
      </Drawer>
        </>
    )
}
export default UserModalDetail