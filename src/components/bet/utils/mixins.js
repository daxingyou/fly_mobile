const  mixin = {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            //form.name为null说明为当前页刷新，需要重新获取数据
            if (from.name == null) {
                vm.showBet = false
                //取缓存的gameType，否则会刷新重置
                let gameType = JSON.parse(sessionStorage.getItem("gameType"));
                if (gameType) {
                    vm.SET_GAMETYPE(gameType)
                }
                Promise.all([
                    vm.getGameInfo("/" + gameType.kindId), //获取开奖历史
                    vm.getPlayList(`/${gameType.classId}/${gameType.kindId}`), //获取小彩类玩法
                    vm.getUserDetails()
                ]).then((values) => {

                    if (values[0].code === 0) {
                        //缓存开奖数据
                        sessionStorage.setItem("gameInfo", JSON.stringify(values[0]));
                    }
                    if (values[1].code === 0) {
                        //缓存玩法数据
                        sessionStorage.setItem(gameType.kindId, JSON.stringify(values[1].data.standGameList));
                    }
                    if(to.name=='bet'){
                        if (values[2].code === 0) {
                            //获取用户详情
                            if (vm.gameType.classId !== "3" && vm.gameType.classId !== "6") {
                                vm.SET_MODEL("1");
                              } else {
                                if (vm.userDetails.gameType) {
                                  vm.SET_MODEL(vm.userDetails.gameType);
                                }else{
                                  vm.SET_MODEL('1');
                                }
                              }
                        }
                    }
                    
                    vm.showBet = true;
                })
            }
        })
    },
}
export default mixin