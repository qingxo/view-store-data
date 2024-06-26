import React, { useState } from "react";
import { Button, Tooltip } from 'antd';
import Draggable from 'react-draggable';
import { DownOutlined } from '@ant-design/icons';
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import './index.css';
const SHOW_PLUGIN_MESSAGE = 'drag=true';
export default function DragItem({ info = {} }) {
    console.log("the location is:", window.location);
    const [searchInfo, setSearchInfo] = useState(window?.location?.search ?? '');
    const [isExpanded, setIsExpanded] = useState({
        selfFlag: () => true,
        storageFlag: () => false,
        sessionFlag: () => true,
        cookieFlag: () => true,
    })
    const [isShow, setIsShow] = useState(false);
    const eventLogger = (e, data) => {
        // console.log('Event: ', e);
        // console.log('Data: ', data);
    };

    const handleStart = (e, data) => {
        // console.log("the handleStart :", e, data);
    }

    const handleDrag = (e, data) => {
        // console.log("the handleDrag :", e, data);

    }
    const handleStop = (e, data) => {
        // console.log("the handleStop :", e, data);

    }

    const showDetail = () => {
        setIsShow(!isShow);
    }

    const getSessionInfo = () => {
        let target = {};
        for (let key in sessionStorage) {
            if (key !== 'length' && !(typeof sessionStorage[key] === 'function')) {
                //target[key] = sessionStorage[key];
                const content = JSON.parse(sessionStorage[key]);
                if (typeof content === 'object') {
                    target[key] = content;
                } else {
                    target[key] = sessionStorage[key];
                }

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

    const getInfo = () => {
        let target = {};
        for (let key in info) {
            target[key] = info[key];
        }
        return target;
    }

    const changeFlag = (param) => {
        var obj = { ...isExpanded, [param]: () => !(isExpanded[param]()) }
        setIsExpanded(obj);
    }
    if (!searchInfo.includes(SHOW_PLUGIN_MESSAGE)) {
        return '';
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
                    {/* <Button onDoubleClick={showDetail} type="primary"> */}
                    {/* <Tooltip title="双击可展示信息"> */}
                    <div className="my-btn">
                        <i className="iconfont store-tuodong my-icon" />
                        <DownOutlined className="my-show" onClick={showDetail} />
                    </div>
                    {/* <OrderedListOutlined /> */}
                    {/* </Tooltip> */}
                    {/* </Button> */}
                    <div style={{ display: isShow ? 'flex' : 'none' }} className="infos">
                        <div className="zoom-list">
                            <div className="title" onClick={() => { changeFlag('selfFlag') }}>自定义信息</div>
                            <JsonView data={getInfo()} shouldExpandNode={isExpanded.selfFlag} style={defaultStyles} />
                        </div>
                        <div className="zoom-local">
                            <div className="title" onClick={() => { changeFlag('storageFlag') }}>localStorage</div>
                            <JsonView data={getLocalhostInfo()} shouldExpandNode={isExpanded.storageFlag} style={defaultStyles} />
                        </div>
                        <div className="zoom-session">
                            <div className="title" onClick={() => { changeFlag('sessionFlag') }}>sessionStorage</div>
                            <JsonView
                                data={getSessionInfo()}
                                shouldExpandNode={isExpanded.sessionFlag}
                            />
                        </div>

                        <div className="zoom-cookie">
                            <div className="title" onClick={() => { changeFlag('cookieFlag') }}>cookie</div>
                            <JsonView
                                data={getCookieInfo()}
                                shouldExpandNode={isExpanded.cookieFlag}
                            />
                        </div>


                    </div>
                </div>

            </div>
        </Draggable>
    );
}

