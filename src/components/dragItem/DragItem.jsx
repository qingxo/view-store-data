import React from "react";
import { Button } from 'antd';
import Draggable from 'react-draggable';
import { MenuUnfoldOutlined } from '@ant-design/icons';

export default function DragItem() {
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
                <div className="handle"><Button type="primary"><MenuUnfoldOutlined /></Button></div>
                <div>This readme is really dragging on...</div>
            </div>
        </Draggable>
    );
}

