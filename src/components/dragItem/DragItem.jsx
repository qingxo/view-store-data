import React, { useState } from "react";
import { Button } from 'antd';
import Draggable from 'react-draggable';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import './index.less';
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
            <div className='zoom'>
                <div className="handle">
                    <Button onDoubleClick={showDetail} type="primary"><MenuUnfoldOutlined /></Button>
                    <div style={{ display: isShow ? 'flex' : 'none' }} className="infos">
                        <div className="zoom-local">
                            <div className="title">localStorage</div>
                            <JsonView data={getLocalhostInfo()} shouldExpandNode={allExpanded} style={defaultStyles} />
                        </div>
                        <div className="zoom-session">
                            <div className="title">sessionStorage</div>
                            <JsonView
                                data={getSessionInfo()}
                            />
                        </div>

                        <div className="zoom-cookie">
                            <div className="title">cookie</div>
                            <JsonView
                                data={getCookieInfo()}
                            />
                        </div>


                    </div>
                </div>

            </div>
        </Draggable>
    );
}

