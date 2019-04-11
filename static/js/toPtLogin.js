
// {/* <script type="text/javascript" src="https://login.silvereagle88.com/jswrapper/integration.js.php?casino=silvereagle88"></script> */}
// var mobiledomain = "ls226588";
//     var systemidvar = "976";


//     // iapiSetCallout('Login', calloutLogin);

//     /**
// 	 *
// 	 * 登录,
// 	 * 需要用户名,密码
//      */
//     function login() {
//         iapiSetClientPlatform("mobile&deliveryPlatform=HTML5");
//         var realMode = 1;
//         iapiLogin(document.getElementById("loginform").username.value, document.getElementById("loginform").password.value, realMode, "en");
//     }


//     /**
// 	 * 登录回调
//      * @param response
//      */
//     function calloutLogin(response) {
//         if (response.errorCode) {
//             alert("Login failed. " + response.playerMessage + " Error code: " + response.errorCode);
//         }
//         else {
//             // window.location = "lobby.html?username=" + document.getElementById("loginform").username.value;
//             askTempandLaunchGame("bal");//调用请求token 的方法
//             //window.location = "https://hub.ls226588.com/igaming/?gameId=bal&real=1&username="+username+"&lang=en&tempToken=" + response.sessionToken;
//         }
//     }

//     function getUrlVars() {

//         var vars = {};
//         var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
//             vars[key] = value;
//         });
//         return vars;

//     }

//     // iapiSetCallout('GetTemporaryAuthenticationToken', calloutGetTemporaryAuthenticationToken);



//     /**
// 	 *
// 	 * 请求token
// 	 */
//     function askTempandLaunchGame(game) {
//         currentgame = game;
//         var realMode = 1;
//         iapiRequestTemporaryToken(realMode, systemidvar, 'GamePlay');
//     }


//     /**
// 	 *
// 	 * 进入游戏,需要传入用户名
// 	 */
//     function launchMobileClient(temptoken,username) {
//         // var username = document.getElementById("loginform").username.value;
//         // var index = "http://zcm.tunnel.qydev.com/";//这是设置主页,传入m5的主页
//         var index = "htcmd:close";// 关闭按键功能
//         var clientUrl = "https://hub.ls226588.com/igaming/?gameId=bal&real=1&username="+username+"&lang=ZH-CN&tempToken=" + temptoken + "&lobby=" + index + "&support=" + index + "&logout=" + index + "&deposit=" + index;
//         //var clientUrl = 'https://hub.' + mobiledomain + '/igaming/' + '?gameId=' + currentgame + '&real=1' + '&username=' + getUrlVars()["username"] + '&lang=' + document.getElementById("languageselect").gamelanguage.value + '&tempToken=' + temptoken + '&lobby=' + location.href.substring(0,location.href.lastIndexOf('/')+1) + 'lobby.html' + '&support=' + location.href.substring(0,location.href.lastIndexOf('/')+1) + 'support.html' + '&logout=' + location.href.substring(0,location.href.lastIndexOf('/')+1) + 'logout.html' + '&deposit=' + location.href.substring(0,location.href.lastIndexOf('/')+1) + 'deposit.html';
//         document.location = clientUrl;
//     }



//     /**
// 	 * token 回调
//      * @param response
//      */
//     function calloutGetTemporaryAuthenticationToken(response) {
//         if (response.errorCode) {
//             alert("Token failed. " + response.playerMessage + " Error code: " + response.errorCode);
//         }
//         else {
//             // 进入游戏
//             // console.log(response);
//             launchMobileClient(response.sessionToken.sessionToken,response.username);
//         }
//     }
