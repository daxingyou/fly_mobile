import {setStore, getStore} from '../../config/mUtils'
import normalChooseNumber from '@/components/bet/utils/normalChooseNumber'
import {calcChooseBetCount,calcLmpBetCount,calcInputBetCount} from '@/components/bet/utils/calcBetCount';
import createBetItem from '@/components/bet/utils/createBetItem';
import createBetNumbers from '@/components/bet/utils/createBetNumbers';
import createSpecialBetNumbers from '@/components/bet/utils/createSpecialBetNumbers';
import createSpecialBetItem from '@/components/bet/utils/createSpecialBetItem';

const mutations = {
	/**
	 * 改变游戏模式
	 */
	SET_MODEL(state, model) {
		state.model = model;
	},
	/**
	 * 保存玩法列表数据
	 */
	SET_PLAYLIST(state, data) {
		state.playList = data;
	},
	/**
	 * 生成选号按钮数据(普通玩法||特殊两面玩法)
	 */
	SET_BETNUMBERS(state, data) {
		
		let subGameIds = data.subGameId.split(",");
		//分割后数组长度不为1有多个子玩法id，为特殊玩法
		if(subGameIds.length!==1){
			state.betNumbers = createSpecialBetNumbers({
				betTypeMap:state.betTypeMap,
				subGameIds:subGameIds,
			})
		}else{
			state.betNumbers = createBetNumbers(data);
		}
		state.errMsg = '';
		state.ticketCount = 0;
	},
	/**
	 * 更新官方玩法选号按钮数据(计算注数)
	 */
	UPDATE_BETNUMBERS(state, data){
		state.betNumbers = data;
		let result = calcChooseBetCount(state.betNumbers);
		state.ticketCount = result.ticketCount;
		state.newNumbers = result.newNumbers;

	},
	/**
	 * 更新两面盘选号按钮数据(计算注数)
	 */
	UPDATE_LMP_BETNUMBERS(state, data){
		state.lmpBetNumbers = data;
		let result = calcLmpBetCount(state.lmpBetNumbers);
		state.ticketCount = result.ticketCount;
		state.lmpSelectNumbers = result.newNumbers;

	},
	/**
	 * 一般选号(按钮变色,计算注数)
	 */
	CHOOSE_BETNUMBER(state,{betNumbers,rowIndex, colIndex}){
		state.betNumbers = normalChooseNumber({betNumbers,rowIndex, colIndex})
		let result = calcChooseBetCount(state.betNumbers);
		state.ticketCount = result.ticketCount;
		state.newNumbers = result.newNumbers;
	},
	/**
	 * 单式选号(校验文本,计算注数)
	 */
	CHOOSE_INPUT_BETNUMBER(state,inputText){
		let result = calcInputBetCount(state.betNumbers,inputText,[]);
		state.ticketCount = result.ticketCount;
		state.errMsg = result.msg;
		state.newNumbers = result.numbers;
		state.betNumbers = {...state.betNumbers,numbers:result.numbers};
	},
	/**
	 * 获取子玩法赔率等信息
	 */
	SET_BETRATES(state,data){
		state.betRates = data
	},
	/**
	 * 生成注单列表
	 */
	SET_BETLIST(state,data){
		if(!data){
			state.betList = [];
			return 
		}
		let subGameIds = data.betType.subGameId.split(",");
		//分割后数组长度不为1有多个子玩法id，为特殊玩法
		if(subGameIds.length!==1){
			state.betList = createSpecialBetItem(data);
		}else{
			state.betList = createBetItem(data);
		}
		
		
	},
	SET_LMP_BETLIST(state,data){
		if(!data){
			state.betList = [];
			return 
		}
		state.betList = data
	},
	/**
	 * 添加到购彩列表
	 */
	SET_SHOPPINGLIST(state,data){
		if(!(data instanceof Array)) return alert("注单非法")
		state.shoppingList[state.model] = state.shoppingList[state.model].concat(state.betList)
	},
	/**
	 * 删除一条注单
	 */
	DELETE_SHOPPINGLIST(state,index){
	 state.shoppingList[state.model] = [...state.shoppingList[state.model].slice(0, index), ...state.shoppingList[state.model].slice(index + 1)]
	},
	/**
	 * 删除全部注单
	 */
	DELETE_ALL_SHOPPINGLIST(state){
	 state.shoppingList = {'1':[],'2':[]};
	},
	/**
	 * 设置追号的注单
	 */
	SET_CHASE_BETLIST(state,data){
	 state.chaseBetList = data;
	},
	/**
	 * 子玩法id对象集
	 */
	SET_BETTYPEMAP(state,data){
		state.betTypeMap = data
	},
	SET_PLAYTYPE(state,data){
		state.playType = data
	},
	/**
	 * 二级导航数据
	 */
	SET_CHILDS(state,data){
		state.childs = data;
	},
	SET_GAMEINFO(state,data){
		if(data.winList.length<2){
			state.gameInfo.nextTime = moment(data.currentTime).valueOf()+10000000000;
		    state.gameInfo.nowRound = data.winList[0];
		    state.gameInfo.nextRound.awarPeriod = "没有下一期";
		    state.gameInfo.nextRound.awardNum = null;
		}else{
			state.gameInfo.nowRound = data.winList[1];
			state.gameInfo.nextRound = data.winList[0];
		}
		
		state.gameInfo = Object.assign(state.gameInfo,data);
	},
	/**
	 * 更新期号
	 */
	UPDATE_GAMEINFO(state,data){
        state.gameInfo = Object.assign(state.gameInfo,data);
	},
	/**
	 * 设置默认金额
	 */
	SET_DEFAULT_AMOUNT(state, data) {
		state.defaultAmount = data
	},
	/**
	 * 注单提示是否开启
	 */
	IS_ORDER_TIPS(state, data) {
		state.orderTips = data
	},
	/**
	 * 获取彩票列表
	 */
	SET_GAME_LIST(state, data) {
		state.gameList = data;
	},
	/**
	 * 获取倒计时
	 */
	SET_TIME_LEFT(state, data) {
		state.currentGameClassTimeLeft = Object.assign({},state.currentGameClassTimeLeft, data);
	},
	/**
	 * 获取倒计时
	 */
	SET_CLOCK(state, data) {
		state.clock = Object.assign({},state.clock, data);
	},
	/**
	 * 选择彩票类型
	 */
	SET_GAMETYPE(state, data) {
		state.gameType = data;
		setStore("gameType", state.gameType);
	},
	/**
	 * 保存小彩类玩法
	 */
	SET_PLAY_LIST(state, data) {
		state.playList = data;
		state.currentPlayList = data.standGameList;
		state.playType = data.standGameList[0];
//		state.betType = {subGameId,leftName,rightName };
	},
	/**
	 * 切换彩种大玩法
	 */
	SET_PLAY_TYPE(state, name) {
		state.playType = state.currentPlayList[name];
	},
	/**
	 * 切换彩种子玩法
	 */
	SET_BET_TYPE(state, data) {
		state.betType = Object.assign({},state.betType, data);
	},
	/**
	 * 生成两面盘面板数据
	 */
	SET_LMP_BETNUMBERS(state, data){
		  state.lmpBetNumbers = data;
		  state.lmpSelectNumbers = [];
		  state.ticketCount = 0;
	},
	/**
	 * 切换两面盘彩种玩法
	 */
	SET_SHOWID(state,showId){
          state.showId = showId
	},
	/**
	 * 保存两面盘彩种赔率
	 */
	SET_LMPODDS(state,odds){
      state.lmpOdds = odds
	},
	/**
	 * 保存所有彩种列表
	 */
	SET_KINDLIST(state,kindList){
		state.kindList = kindList
	},
	/**
	 * 设置两面盘头部标题
	 */
	SET_LMP_TITLE(state,title){
        state.lmpTitle = title;
	},
	/**
	 * 改变购彩篮单条注单倍数
	 */
	UPDATE_SHOPPINGLIST(state,data){
		state.shoppingList = data;
	}
	
};
export default mutations;