import React, { useState } from "react";
import { Button } from 'antd';
import Draggable from 'react-draggable';
import { MenuUnfoldOutlined } from '@ant-design/icons';

export default function DragItem() {
    const [isShow, setIsShow] = useState(false);
    const eventLogger = (e, data) => {
        console.log('Event: ', e);
        console.log('Data: ', data);
    };

    const handleStart = (e, data) => {
        console.log("the handleStart :", e, data);
    }

    const handleDrag = (e, data) => {
        console.log("the handleDrag :", e, data);

    }
    const handleStop = (e, data) => {
        console.log("the handleStop :", e, data);

    }

    const showDetail = () => {
        setIsShow(!isShow);
    }
    return (
        <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[25, 25]}
            scale={1}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}>
            <div>
                <div className="handle"><Button onDoubleClick={showDetail} type="primary"><MenuUnfoldOutlined /></Button></div>
                <div style={{ display: isShow ? 'block' : 'none' }}>This readme is really dragging on...</div>
            </div>
        </Draggable>
    );
}

