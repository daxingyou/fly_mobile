const defaultClock = {
    hasLoaded: false,
    paused: true,
    seconds: -1,
    startTime: Date.now(),
    times: -1,
}
const defaultRound = {
    awarPeriod: '',
    awardNum: '',
    awardTime: '',
    isAward: '0',
}

const defaultPlayList = {
    awardTime: '', // 开盘时间 HH:mm:ss
    midleTime: '', // 周期
    optionGameList: [], // 任选玩法
    shutTime: '', // 关盘时间 HH:mm:ss
    standGameList: [] // 常规玩法
}

const defaultGameInfo = {
    currentTime: '', 
    dragons: [], 
    haveAward: false, // 是否开盘
    hotCold: {}, 
    nextRound: defaultRound,
    nextTime: '', 
    nowPeriod: 0,
    nowRound: defaultRound, 
    omit: {}, 
    restPeriod: 0,
    winList: [],
}
const defaultBetType = {
    leftName: '', // 左名称
    rightName: '', // 右名称
    subGameId: '', // 子玩法id
}
const defaultGameType = {
    classId: '3', // 彩类id
    kindId: 'm5ffc', // 彩种id
    kindName: '1分时时彩', // 彩种名称
    periodNoAll:1368,
}

const defaultBetNumbers = {
    hasSub: false, // 是否显示遗漏冷热
    isSpecial:false,//是否特殊玩法
    numberType: '', // 选号类型， button 或者 input
    numbers: [], // button时，是一个二维数组， input时，是所有输入的号码数组
    optionalMin: -1, // 用于任选
    quickBtnOption: [], // 快捷选号
    subGameId: '', // 子玩法id
    
}

const defaultBetRate = {
    actualLimit: 0, // ？？？
    gameCase: '', // 实例
    gameRemark: '', // 备注
    gameTip: '', // 说明
    minUnit: '0',
    oddMax: '', // 最大赔率
    oddMin: '', // 最小赔率
    oneNoteLimit: 0, // 单注最大投注金额
    singleLimit: 0, // 单次最大投注金额
    subGameId: '', // 子玩法id
    wagerMin: 0, // 单注最小投注金额
}

const defaultPlayType = {
    gameId: '', // 玩法id
    gameName: '', // 玩法名称
    gameSons: [] // 子玩法
}

const initialState = {
	chaseBetList:[],
	betList:[],
	ticketCount:0,
	betRates: [defaultBetRate],
	betNumbers: defaultBetNumbers,
    gameList: [],
    gameInfo: defaultGameInfo,
    shoppingList:{'1':[],'2':[]},//1为官方玩法购彩数据，2为两面玩法购彩数据
    betTypeMap:{},
    playType:defaultPlayType,
    childs:[],
    orderTips:1,
    defaultAmount:'',
    model:'1',
    lmpBetNumbers:[],
    showId:'',
    lmpSelectNumbers:[],
    lmpOdds:{},
    kindList:[],
    lmpTitle:"",
    newNumbers:[],
   
    errMsg:'',
    //========
    gameType:defaultGameType,
    menuOpen:false,
    betDataList_lmp:{},
    //===========
    playListType: 'standGameList',
    playType:[],
    playList:defaultPlayList,
    currentPlayList: [],
    todaysWin: 0,
    isloading:true,
    betType:defaultBetType,
};
export default initialState;