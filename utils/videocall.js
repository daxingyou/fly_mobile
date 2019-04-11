/**
 * 点击视频图标 >>>
 * 显示出视频的区域 >>>
 * 注册用户名 >>>
 * doCall呼叫对方(对方也需要被注册)————————————————所以登录之后就被注册？还是在注册的时候被注册？
 */

import store from '../src/store'

export default function () {
  var server = null;
  if (window.location.protocol == 'http:')
    server = "http://" + window.location.hostname + ":8088/janus";
  else
    server = "https://" + window.location.hostname + ":8089/janus";

  var janus = null;
  var videocall = null;
  var opaqueId = "videocalltest-" + Janus.randomString(12);
  console.log(opaqueId);

  var bitrateTimer = null;
  var spinner = null;

  var audioenabled = false;
  var videoenabled = false;

  var myusername = null;
  var yourusername = null;

  var doSimulcast = (getQueryStringValue("simsulcast") === "yes" || getQueryStringValue("simulcast") === "true");
  var simulcastStarted = false;
  console.log(`store`, store.state.chart.chatUsername)
  console.log($('#start'))
  Janus.init({
    debug: true,
    callback: function () {
      $('#start').one('click', function () {
        $(this).unbind('click')
        janus = new Janus({
          server: 'https://janus.pxklos.com:8089/janus',

          success: function () {
            // 使用插件
            janus.attach({
              plugin: "janus.plugin.videocall",
              opaqueId: opaqueId,

              success: function (pluginHandle) {
                videocall = pluginHandle;
                Janus.log('Plugin attached!('+ videocall.getPlugin() + ", id=" + videocall.getId() +')');
                // 准备注册用户名
                registerUsername();
                // 点击事件，结束通话
                $('.video-page').find('#hangup').click(function () {
                  $(this).attr('disabled', true);
                  janus.destroy();
                })
              },

              error: function (error) {
                Janus.error("  -- Error attaching plugin...", error);
								bootbox.alert("  -- Error attaching plugin... " + error);
              },

              // 在getUserMedia被调用之前(参数=true)和完成之后(参数=false)触发，可用于相应的修改ui
              consentDialog: function (on) {
                Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
                $('.video-page').removeClass()
              },

              // 启动或停止接收媒体是触发此回调
              mediaState: function (medium, on) {
								Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
              },
              
              webrtcState: function (on) {
                Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
                // 关闭遮罩层
                // $("#videoleft").parent().unblock();
              },

              // 插件接收到的事件或消息
              onmessage: function (msg, jsep) {
                Janus.debug(" ::: Got a message :::");
                Janus.debug(msg);
                console.log(`onmessage_________`, msg, jsep)
                var result = msg["result"];
                if (result !== null && result !== undefined) {
                  if (result['list'] !== undefined && result['list'] !== null) {
                    var list = result['list'];
                    Janus.debug("Got a list of registered peers:");
                    Janus.debug(list);
                    for (var mp in list) {
											Janus.debug("  >> [" + list[mp] + "]");
										}
                  } else {
                    var event = result['event'];
                    if (event === 'registered') {  // 注册用户名
                      myusername = result['username'];
                      Janus.log("Successfully registered as " + myusername + "!");
                      videocall.send({
                        "message": {
													"request": "list"
												}
                      });
                      doCall();
                      // console.log($('.video-page').find('#call'))
                      $('video-page').find('#call').click(doCall);
                    } else if (event === 'calling') {   // 拨号
                      Janus.log("等待对方接听...");
											// TODO Any ringtone?
											bootbox.alert("Waiting for the peer to answer...");
                    } else if (event === 'incomingcall') {  // 来电
                      Janus.log("Incoming call from " + result["username"] + "!");
                      yourusername = result['username'];
                      // 来电通知用户

                    } else if (event === 'accepted') {  // 接收来电
                      var peer = result['username'];
                      if (peer === null || peer === undefined) {
                        Janus.log("Call started!");
                      } else {
                        Janus.log(peer + " accepted the call!");
												yourusername = peer;
                      }
                      // 可以开始视频通话
                      console.log(`jsep____`, jsep)
                      if (jesp) {
                        videocall.handleRemoteJsep({
                          jesp: jesp
                        })
                      }
                      // 可以挂断电话
                      // $('#call').removeAttr('disabled').html('Hangup')
											// 	.removeClass("btn-success").addClass("btn-danger")
											// 	.unbind('click').click(doHangup);
                    } else if (event === 'update') {
                      // An 'update' event may be used to provide renegotiation attempts
                    } else if (event === 'hangup') {   // 挂断

                    } else if (event === 'simulcast') {

                    }
                  }
                } else {
                  var error = msg["error"];
                  bootbox.alert(error);
                  
                }
              },

              // 本地MediaStream可用并准备显示
              onlocalstream: function (stream) {
                Janus.debug(" ::: Got a local stream :::");
								Janus.debug(stream);
                console.log('onlocalstream', stream)
              },

              // 远程MediaStream可用并准备显示
              onremotestream: function (stream) {
                Janus.debug(" ::: Got a remote stream :::");
                Janus.debug(stream);
                console.log('onremotestream', stream)
              },

              // 数据通道可用并随时可用
              ondataopen: function (data) {
                Janus.log('The DataChannel is available!');
                console.log('ondataopen', data)
              },

              // 已通过数据通道接收数据
              ondata: function (data) {
                Janus.debug("We got data from the DataChannel! " + data);
              },

              // webRTC PeerConnection与插件关闭
              oncleanup: function () {

              }
            });
          },

          error: function (error) {
            bootbox.alert(error, function () {
              window.location.reload()
            })
          },

          destroyed: function () {
						window.location.reload();
					}
        })

      })
    }
  })

  // 注册用户名
  function registerUsername () {
    var username = store.state.login.userDetails.account;
    var register = {
      'request': 'register',
      'username': username
    };
    videocall.send({
      'message': register
    })
  }

  // 发送视频聊天给对方
  function doCall () {
    videocall.createOffer({
      media: {
        data: true
      },
      simulcast: doSimulcast,
      success: function (jsep) {
        Janus.debug("Got SDP!");
        Janus.debug(jsep);
        Janus.log('doCall', jsep);
        var body = {
          'request': 'call',
          'username': store.state.chart.chatUsername    // 需要注册
        };
        videocall.send({
          'message': body,
          'jsep': jsep
        });
      },
      error: function (error) {
        Janus.error("WebRTC error...", error);
			  bootbox.alert("WebRTC error... " + error);
      }
    })
  }

  // 解析查询字符串
  function getQueryStringValue(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

}
