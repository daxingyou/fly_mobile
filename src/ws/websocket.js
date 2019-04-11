import common  from '../common';
/**
 * 打开websocket
 */
const IS_HTTPS = window.location.protocol === 'https:'
export const openWebSocket = () => {
    console.log('websocket');
    if (WebSocket) {
        if (window.m5Websocket) {
            console.log('websocket close');
            window.m5Websocket.close();
        }
        var str = "",wsUrl = '';
        if(IS_HTTPS){
            str = 'wss';
            wsUrl = common.baseUrl.slice(6)
        }else{
            str = 'ws'
            wsUrl = common.baseUrl.slice(5)
        }
        window.m5Websocket = new WebSocket(`${str}:${wsUrl}/inter/notifys`);
        window.m5Websocket.onopen = () => {
            console.log('websocket onopen');
        }
        window.m5Websocket.onmessage = message => {
            try {
               console.log(message)
            } catch (err) {
                console.log(err)
            }
        }
        window.m5Websocket.onerror = msg => {
            console.log('websocket onerror');
            openWebSocket();
        }
        window.m5Websocket.onclose = msg => {
            console.log('websocket onclose');
        }
    } else {
        console.log('websocket not support');
    }
}

/**
 * 关闭websocket
 */
export const closeWebSocket = () => {
    if (WebSocket) {
        if (window.m5Websocket) {
            window.m5Websocket.close();
        }
    }
}
window.onbeforeunload = closeWebSocket