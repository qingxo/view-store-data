import React, { useState } from "react";
import { Button } from 'antd';
import Draggable from 'react-draggable';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import JSONViewer from 'react-json-viewer';
import './index.less';
const jsons = {
    "abc": {
        a: 'xxxx',
        b: 'bbbb',
        d: 'dddd'
    },
    "xyz": '123',
    "adbc": [
        'abc', 'fff', '1234', 4243
    ],
    "asdf": 4
}
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

    const getSessionInfo = () => {
        let target = {};
        for (let key in sessionStorage) {
            if (key !== 'length' && !(typeof sessionStorage[key] === 'function')) {
                target[key] = sessionStorage[key];
            }
        }
        return target;
    }

    const getLocalhostInfo = () => {
        let target = {};
        for (let key in localStorage) {
            if (key !== 'length' && !(typeof localStorage[key] === 'function')) {
                target[key] = localStorage[key];
            }
        }
        return target;
    }

    const getCookieInfo = () => {
        let target = {};
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim(); // 去除首尾空格
            var cookieParts = cookie.split('=');
            var key = cookieParts[0];
            var value = cookieParts[1];
            target[key] = value;
        }
        return target;
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
            <div className="zoom">
                <div className="handle">
                    <Button onDoubleClick={showDetail} type="primary"><MenuUnfoldOutlined /></Button>

                    <div style={{ display: isShow ? 'block' : 'none' }} className="infos">
                        <div className="title">LocalStorage信息</div>
                        <JSONViewer
                            json={getLocalhostInfo()}
                        />
                        <div className="title">Session信息</div>
                        <JSONViewer
                            json={getSessionInfo()}
                        />

                        <div className="title">Cookie信息</div>
                        <JSONViewer
                            json={getCookieInfo()}
                        />
                    </div>
                </div>

            </div>
        </Draggable>
    );
}

