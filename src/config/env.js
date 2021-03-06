/**
 * 配置本地环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * wsUrl:websocket 地址
 */
var baseUrl = '',wsUrl = '';

if(process.env.NODE_ENV == 'development') { //本地环境
	baseUrl = 'http://192.168.0.101:8082';
	wsUrl = '//192.168.0.101:8082';
} else if(process.env.NODE_ENV == 'production') { //线上环境
	baseUrl = window.location.origin;
	wsUrl = '//' + window.location.host;
}
export {
	baseUrl,
	wsUrl
}
