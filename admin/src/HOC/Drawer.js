import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import "../HOC/drawer.css"



export default function Drawers(props) {



    const { visible, ComponentContentDrawer,callBackSubmit,title } = useSelector(state => state.drawerReducer);

    const dispatch = useDispatch();

    console.log('visible', visible)


    const showDrawer = () => {
        dispatch({ type: 'OPEN_DRAWER' });
    };

    const onClose = () => {
        dispatch({ type: 'CLOSE_DRAWER' });

    };
    return (
        <>
            {/* <button onClick={showDrawer}>showdrawer</button> */}
            <Drawer
                title={title}
                width={720}
                height={111}
                paddingTop={10}
                
                onClose={onClose}
                open={visible}
                bodyStyle={{ paddingBottom: 80 }}
                cont

                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                {/* Nội dung thay đổi của drawer */}
                {ComponentContentDrawer}
     
            </Drawer>
        </>
    )
}
