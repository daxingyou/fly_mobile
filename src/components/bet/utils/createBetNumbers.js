import calcBetCountConfig from './calcBetCountConfig';
import fiveFromElevenBetNumbersConfig from '../createconfig/fiveFromEleven';
import KSBetNumbersConfig from '../createconfig/ks';
import SSCBetNumbersConfig from '../createconfig/ssc';
import BJSCBetNumbersConfig from '../createconfig/bjsc'
import FTCBetNumbersConfig from '../createconfig/ftc'
import LHCBetNumbersConfig from '../createconfig/lhc'
/**
 * 时时彩的号码位名称
 */
const SSCNames = ['万位', '千位', '百位', '十位', '个位']
const FTCNames = ['百位', '十位', '个位']

/**
 * 汉字选号
 */
const bigSmallOddEven = ['大', '小', '单', '双']
const dantuo = ['胆码', '拖码']

/**
 * 快捷选号按钮，分为两种
 */
const quickBtnOptionFull = [
    { value: 'all', label: '全' },
    { value: 'big', label: '大' },
    { value: 'small', label: '小' },
    { value: 'odd', label: '单' },
    { value: 'even', label: '双' },
    { value: 'clear', label: '清' },
]
const quickBtnOptionPart = [
    { value: 'all', label: '全' },
    { value: 'clear', label: '清' },
]


const redNum = ['01','02','07','08','12','13','18','19','23','24','29','30','34','35','40','45','46'];
const blueNum = ['03','04','09','10','14','15','20','25','26','31','36','37','41','42','47','48'];
const greenNum = ['05','06','11','16','17','21','22','27','28','32','33','38','39','43','44','49'];
const colorBorder = [1,1,2,2,3,3,1,1,2,2,3,1,1,2,2,3,3,1,1,2,3,3,1,1,2,2,3,3,1,1,2,3,3,1,1,2,2,3,3,1,2,2,3,3,1,1,2,2,3];

/**
 * 按钮索引
 */
const getRegularNumbers = ({names, start, end, labels, subGameId}) => {
    let rows = []
    for (let i = start; i <= end; i++) {
        rows.push({
            rowName: names[i], 
            cols: loopNumbers({labels: labels[i], subGameId})
        })
    }
    return rows
}

/**
 * 通过循环生成选号按钮
 */
const loopNumbers = ({labels, subGameId}) => {
	let numbers = []
	if(LHCBetNumbersConfig.texiao[subGameId]){
		numbers.push({
			label:labels,
			selected: false,
			subGameId:subGameId
		})
	}else if(LHCBetNumbersConfig.teliangmian[subGameId]){
		labels.forEach((item, index) => {
		let inverse = index % 2 === 0 ? index + 1 : index - 1
		let notCircle = (isNaN(parseInt(item)) && item.length > 1) || item.length > 2
		numbers.push({
			inverse,
			label:item,
			notCircle,
			selected: false,
		})
	})
	}else{
		labels.forEach(item => {
        let notCircle = (isNaN(parseInt(item)) && item.length > 1) || item.length > 2
        numbers.push({
            label: item, 
            selected: false,
            notCircle
        })
    })
	}
    return numbers
}

/**
 * 三类变量：
 * 每一行号码左侧的汉字
 * 号码的start和end，以及max和min
 * 号码的内容 labels
 */
const createBetNumbers = (betType) => {
    const {leftName, rightName, subGameId} = betType
    const sscfushi = SSCBetNumbersConfig.fushi[subGameId],
        sscdanshi = SSCBetNumbersConfig.danshi[subGameId],
        sscother = SSCBetNumbersConfig.other[subGameId],
        elevenfushi = fiveFromElevenBetNumbersConfig.fushi[subGameId],
        elevendanshi = fiveFromElevenBetNumbersConfig.danshi[subGameId],
        elevenother = fiveFromElevenBetNumbersConfig.other[subGameId],
        ksnormal = KSBetNumbersConfig.normal[subGameId],
        bjscdanshi = BJSCBetNumbersConfig.danshi[subGameId],
        bjscnormal = BJSCBetNumbersConfig.normal[subGameId],
        bjscspecial = BJSCBetNumbersConfig.special[subGameId],
        ftcfushi = FTCBetNumbersConfig.fushi[subGameId],
        ftcother = FTCBetNumbersConfig.other[subGameId],
        ftcdanshi = FTCBetNumbersConfig.danshi[subGameId],
        lhctema = LHCBetNumbersConfig.tema[subGameId],
        lhcteliangmian = LHCBetNumbersConfig.teliangmian[subGameId],
        lhcsebo = LHCBetNumbersConfig.sebo[subGameId],
        lhctexiao = LHCBetNumbersConfig.texiao[subGameId]
    let start = 0, end = 0, max = 0, min = 0, leftPad = false, names = [rightName], optionalMin = -1,
        labels = [], inputFormat, minSame = 1, maxSame, numberUnitFormat,
        quickBtnOption = [],
        dantuoMax;
    if (sscdanshi || elevendanshi || bjscdanshi || ftcdanshi) {
        if (sscdanshi) {
            max = 9
            min = 0
            maxSame = -1
            numberUnitFormat = 1
            switch (subGameId) {
                case "300202": // 前二直选 单式
                case "300206": // 后二直选 单式
                    inputFormat = 2
                    break
                case "300210": // 前二组选 单式
                case "300214": // 后二组选 单式
                    inputFormat = 2
                    maxSame = 1
                    break
                case "300302": // 前三组选 单式
                case "300402": // 中三组选 单式
                case "300502": // 后三组选 单式
                    inputFormat = 3
                    break
                case "300308": // 前三组选 混合组选
                case "300408": // 中三组选 混合组选
                case "300508": // 后三组选 混合组选
                    inputFormat = 3
                    maxSame = 2
                    break
                case "300602": // 后四直选 单式
                    inputFormat = 4
                    break
                case "300702": // 五星直选 单式
                    inputFormat = 5
                    break
                case "301002": // 任二直选 单式
                    optionalMin = 2
                    inputFormat = 2
                    break
                case "301005": // 任二组选 单式
                    optionalMin = 2
                    inputFormat = 2
                    maxSame = 2
                    break
                case "301102": // 任三直选 单式
                    optionalMin = 3
                    inputFormat = 3
                    break
                case "301105": // 任三组选 组三单式
                    optionalMin = 3
                    inputFormat = 3
                    minSame = 2
                    maxSame = 2
                    break
                case "301107": // 任三组选 组六单式
                    optionalMin = 3
                    inputFormat = 3
                    maxSame = 1
                    break
                case "301108": // 任三组选 混合组选
                    optionalMin = 3
                    inputFormat = 3
                    maxSame = 2
                    break
                case "301202": // 任四直选 单式
                    optionalMin = 4
                    inputFormat = 4
                    break
            }
        } else if (elevendanshi) {
            max = 11
            min = 1
            maxSame = 1
            numberUnitFormat = 2
            switch (subGameId) {
                case "500102": // 前三直选 单式
                case "500104": // 前三组选 单式
                case "500107": // 中三直选 单式
                case "500109": // 中三组选 单式
                case "500112": // 后三直选 单式
                case "500114": // 后三组选 单式
                case "500603": // 任选单式 任选三中三
                    inputFormat = 3
                    break
                case "500202": // 前二直选 单式
                case "500204": // 前二组选 单式
                case "500207": // 后二直选 单式
                case "500209": // 后二组选 单式
                case "500602": // 任选单式 任选二中二
                    inputFormat = 2
                    break
                case "500601": // 任选单式 任选一中一
                    inputFormat = 1
                    break
                case "500604": // 任选单式 任选四中四
                    inputFormat = 4
                    break
                case "500605": // 任选单式 任选五中五
                    inputFormat = 5
                    break
                case "500606": // 任选单式 任选六中五
                    inputFormat = 6
                    break
                case "500607": // 任选单式 任选七中五
                    inputFormat = 7
                    break
                case "500608": // 任选单式 任选八中五
                    inputFormat = 8
                    break
            }
        } else if (bjscdanshi) {
            max = 10
            min = 1
            maxSame = 1
            numberUnitFormat = 2
            if (subGameId === '600203') {
                inputFormat = 2
            } else {
                inputFormat = 3
            }
        } else if (ftcdanshi) {
            max = 9
            min = 0
            maxSame = -1
            numberUnitFormat = 1
            switch (subGameId) {
                case "100302": // 三星直选 单式
                    inputFormat = 3
                    break
            }
        }
        return {
            hasSub: false,
            inputFormat,
            max,
            maxSame,
            min,
            minSame,
            numberType: 'input',
            numberUnitFormat,
            numbers: [],
            optionalMin,
            quickBtnOption: [],
            subGameId,
        }
    } else {
        let hasSub = false
        if (sscfushi || sscother) {
            max = 9
            min = 0
            if (sscfushi) {
                names = SSCNames
                hasSub = true
            }
            switch (subGameId) {
                case "300101": // 定位胆
                case "300701": // 五星直选 复式
                case "301001": // 任二直选 复式
                case "301101": // 任三直选 复式
                case "301201": // 任四直选 复式
                    end = 4
                    quickBtnOption = quickBtnOptionFull
                    break
                case "300201": // 前二直选 复式
                    end = 1
                    quickBtnOption = quickBtnOptionFull
                    break
                case "300803": // 前二 大小单双
                    end = 1
                    quickBtnOption = quickBtnOptionPart
                    break
                case "300205": // 后二直选 复式
                    start = 3
                    end = 4
                    quickBtnOption = quickBtnOptionFull
                    break
                case "300801": // 后二 大小单双
                    start = 3
                    end = 4
                    quickBtnOption = quickBtnOptionPart
                    break
                case "300301": // 前三直选 复式
                case "300305": // 前三直选 组合
                    end = 2
                    quickBtnOption = quickBtnOptionFull
                    break
                case "300804": // 前三 大小单双
                    end = 2
                    quickBtnOption = quickBtnOptionPart
                    break
                case "300401": // 中三直选 复式
                case "300405": // 中三直选 组合
                    start = 1
                    end = 3
                    quickBtnOption = quickBtnOptionFull
                    break
                case "300501": // 后三直选 复式
                case "300505": // 后三直选 组合
                    start = 2, 
                    end = 4
                    quickBtnOption = quickBtnOptionFull
                    break
                case "300802": // 后三 大小单双
                    start = 2, 
                    end = 4
                    quickBtnOption = quickBtnOptionPart
                    break
                case "300601": // 后四直选 复式
                    start = 1, 
                    end = 4
                    quickBtnOption = quickBtnOptionFull
                    break
                case "300204": // 前二直选 跨度
                case "300208": // 后二直选 跨度
                case "300209": // 前二组选 复式
                case "300213": // 后二组选 复式
                case "300304": // 前三直选 跨度
                case "300306": // 前三组选 组三
                case "300307": // 前三组选 组六
                case "300311": // 前三其他 和值尾数
                case "300404": // 中三直选 跨度
                case "300406": // 中三组选 组三
                case "300407": // 中三组选 组六
                case "300411": // 中三其他 和值尾数
                case "300504": // 后三直选 跨度
                case "300506": // 后三组选 组三
                case "300507": // 后三组选 组六
                case "300511": // 后三其他 和值尾数
                case "301004": // 任二组选 复式
                case "301104": // 任三组选 组三复式
                case "301106": // 任三组选 组六复式
                case "301203": // 任四组选 组选24
                case "300901": // 前三 一码不定位
                case "300902": // 前三 二码不定位
                case "300903": // 后三 一码不定位
                case "300904": // 后三 二码不定位
                case "300905": // 前四 一码不定位
                case "300906": // 前四 二码不定位
                case "300907": // 后四 一码不定位
                case "300908": // 后四 二码不定位
                case "300909": // 五星 一码不定位
                case "300910": // 五星 二码不定位
                case "300911": // 五星 三码不定位
                    quickBtnOption = quickBtnOptionFull
                    break
                case "300212": // 前二组选 包胆
                case "300216": // 后二组选 包胆
                case "300310": // 前三组选 组选包胆
                case "300410": // 中三组选 组选包胆
                case "300510": // 后三组选 组选包胆
                    break
                case "300203": // 前二直选 和值
                case "300207": // 后二直选 和值
                case "301003": // 任二直选 和值
                    max = 18
                    quickBtnOption = quickBtnOptionPart
                    break
                case "300211": // 前二组选 和值
                case "300215": // 后二组选 和值
                case "301006": // 任二组选 和值
                    min = 1
                    max = 17
                    quickBtnOption = quickBtnOptionPart
                    break
                case "300303": // 前三直选 和值
                case "300403": // 中三直选 和值
                case "300503": // 后三直选 和值
                case "301103": // 任三直选 和值
                    max = 27
                    quickBtnOption = quickBtnOptionPart
                    break
                case "300309": // 前三组选 组选和值
                case "300409": // 中三组选 组选和值
                case "300509": // 后三组选 组选和值
                case "301109": // 任三组选 组选和值
                    min = 1
                    max = 26
                    quickBtnOption = quickBtnOptionPart
                    break
                case "300312": // 前三其他 特殊号码
                case "300412": // 中三其他 特殊号码
                case "300512": // 后三其他 特殊号码
                    labels = [['豹子', '对子', '顺子']]
                    quickBtnOption = quickBtnOptionPart
                    break
                case "301204": // 任四组选 组选12
                    names = ['二重号', '单号']
                    end = 1
                    quickBtnOption = quickBtnOptionFull
                    break
                case "301205": // 任四组选 组选6
                    names = ['二重号']
                    quickBtnOption = quickBtnOptionFull
                    break
                case "301206": // 任四组选 组选4
                    names = ['三重号', '单号']
                    end = 1
                    quickBtnOption = quickBtnOptionFull
                    break
                default: 
                    break
            }
            // 部分大类有一些共同特性
            const subGameType = subGameId.substr(2, 2)
            switch (subGameType) {
                case '08': // 大小单双
                    names = SSCNames
                    labels = Array(5).fill(bigSmallOddEven)
                    break
                case '10': // 任选二
                    if (subGameId.substr(4, 2) !== '01') optionalMin = 2
                    break
                case '11': // 任选三
                    if (subGameId.substr(4, 2) !== '01') optionalMin = 3
                    break
                case '12': // 任选四
                    if (subGameId.substr(4, 2) !== '01') optionalMin = 4
                    break
                default:
                    break
            }
        } else if (ftcfushi || ftcother) {
            max = 9
            min = 0
            if (ftcfushi) {
                names = FTCNames
                hasSub = true
            }
            switch (subGameId) {
                case "100101": // 定位胆
                    start = 0
                    end = 2
                    quickBtnOption = quickBtnOptionFull
                    break
                case "100201": // 前二直选
                    start = 0
                    end = 1
                    quickBtnOption = quickBtnOptionFull
                    break
                case "100501": // 前二 大小单双
                    start = 0
                    end = 1
                    quickBtnOption = quickBtnOptionPart
                    break
                case "100202": // 后二直选
                    start = 1
                    end = 2
                    quickBtnOption = quickBtnOptionFull
                    break
                case "100502": // 后二 大小单双
                    start = 1
                    end = 2
                    quickBtnOption = quickBtnOptionPart
                    break
                case "100301": // 三星直选 复试
                    start = 0
                    end = 2
                    quickBtnOption = quickBtnOptionFull
                    break
                case "100203": // 前二组选
                case "100204": // 后二组选
                case "100401": // 三星组选 组三
                case "100402": // 三星组选 组六
                case "100601": // 一码不定位
                case "100602": // 二码不定位
                quickBtnOption = quickBtnOptionFull
                break
                case "100303": // 三星直选 和值
                    max = 27
                    quickBtnOption = quickBtnOptionPart
                    break
                case "100403": // 三星组选 组选和值
                    min = 1
                    max = 26
                    quickBtnOption = quickBtnOptionPart
                    break
                default: 
                    break
            }
            // 部分大类有一些共同特性
            const subGameType = subGameId.substr(2, 2)
            switch (subGameType) {
                case '05': // 大小单双
                names = SSCNames
                labels = Array(5).fill(bigSmallOddEven)
                break
            default:
                break
            }
        } else if (elevenfushi || elevenother) {
            leftPad = true
            max= 11
            min = 1
            if (elevenfushi) {
                names = SSCNames
                hasSub = true
            }
            switch (subGameId) {
                case "500401": // 定位胆 定位胆
                    end = 4
                    quickBtnOption = quickBtnOptionFull
                    break
                case "500101": // 前三直选 复式
                    end = 2
                    quickBtnOption = quickBtnOptionFull
                    break
                case "500106": // 中三直选 复式
                    start = 1
                    end = 3
                    quickBtnOption = quickBtnOptionFull
                    break
                case "500111": // 后三直选 复式
                    start = 2, 
                    end = 4
                    quickBtnOption = quickBtnOptionFull
                    break
                case "500201": // 前二直选 复式
                    end = 1
                    quickBtnOption = quickBtnOptionFull
                    break
                case "500206": // 后二直选 复式
                    start = 3
                    end = 4
                    quickBtnOption = quickBtnOptionFull
                    break
                case "500103": // 前三组选 复式
                case "500108": // 中三组选 复式
                case "500113": // 后三组选 复式
                case "500203": // 前二组选 复式
                case "500208": // 后二组选 复式
                case "500301": // 不定位 前三
                case "500302": // 不定位 中三
                case "500303": // 不定位 后三
                case "500501": // 任选复式 任选一中一
                case "500502": // 任选复式 任选二中二
                case "500503": // 任选复式 任选三中三
                case "500504": // 任选复式 任选四中四
                case "500505": // 任选复式 任选五中五
                case "500506": // 任选复式 任选六中五
                case "500507": // 任选复式 任选七中五
                case "500508": // 任选复式 任选八中五
                    quickBtnOption = quickBtnOptionFull
                    break
                case "500105": // 前三组选 胆拖
                case "500110": // 中三组选 胆拖
                case "500115": // 后三组选 胆拖
                case "500702": // 任选胆拖 任选三中三
                    dantuoMax = 3
                    break
                case "500205": // 前二组选 胆拖
                case "500210": // 后二组选 胆拖
                case "500701": // 任选胆拖 任选二中二
                    dantuoMax = 2
                    break
                case "500703": // 任选胆拖 任选四中四
                    dantuoMax = 4
                    break
                case "500704": // 任选胆拖 任选五中五
                    dantuoMax = 5
                    break
                case "500705": // 任选胆拖 任选六中五
                    dantuoMax = 6
                    break
                case "500706": // 任选胆拖 任选七中五
                    dantuoMax = 7
                    break
                case "500707": // 任选胆拖 任选八中五
                    dantuoMax = 8
                    break
            }
            if (calcBetCountConfig.dantuo[subGameId]) {
                names = dantuo
                end = 1
            }
        } else if (ksnormal) {
            max = 6
            min = 1
            switch (subGameId) {
                case "400201": // 三同号 通选
                    labels = [['三同号通选']]
                    break;
                case "400301": // 三同号 单选
                    labels = [['111', '222', '333', '444', '555', '666']]
                    break;
                case "400402": // 三不同号 胆拖
                    names = dantuo
                    end = 1
                    dantuoMax = 3
                    break;
                case "400802": // 二不同号 胆拖
                    names = dantuo
                    end = 1
                    dantuoMax = 2
                    break;
                case "400501": // 三连号 通选
                    labels = [['三连号通选']]
                    break;
                case "400601": // 二同号 复选
                    labels = [['11', '22', '33', '44', '55', '66']]
                    break;
                case "400701": // 二同号 单选
                    names = ['同号', '不同号']
                    labels = [['11', '22', '33', '44', '55', '66'], ['1', '2', '3', '4', '5', '6']]
                    end = 1
                    dantuoMax = 6
                    break;
                case "400901":
					labels = [
						['123', '234', '345', '456']
					];
					break;
            }
        } else if (bjscnormal) {
            max = 10
            min = 1
            names = ["冠", "亚", "季", "四", "五", "六", "七", "八", "九", "十"]
            quickBtnOption = quickBtnOptionFull
            leftPad = true
            hasSub = true
            switch (subGameId) {
                case "600101": // 前一直选 复式
                    end = 0
                    break;
                case "600202": // 前二直选 复式
                    end = 1
                    break;
                case "600301": // 前三直选 复式
                    end = 2
                    break;
                case "600401": // 定位胆 定位胆
                    end = 9
                    break;
                case "600501": // 大小单双
                    end = 9
                    labels = Array(10).fill(['大', '小', '单', '双'])
                    quickBtnOption = []
                    hasSub = false
                    break;
                case "600502": // 龙虎
                    end = 4
                    names = ['冠vs十', '亚vs九', '季vs八', '四vs七', '五vs六']
                    labels = Array(5).fill(['龙', '虎'])
                    quickBtnOption = []
                    hasSub = false
                    break;
            }
        } 
        if (lhctema) {
            hasSub = true
            leftPad = true
            max= 49
            min = 1
            switch (subGameId) {
                case "200101": // 特码
                case "200501": // 正码 正码
                case "200601": // 正码特 正码特一
                case "200502": // 正码特 正码特二
                case "200503": // 正码特 正码特三
                case "200504": // 正码特 正码特四
                case "200505": // 正码特 正码特五
                case "200506": // 正码特 正码特六
                    break
                default:
                    break
            }
        } else if (lhcteliangmian) {
            hasSub = true
            leftPad = true
            switch(subGameId){
//              case "200701": // 正码1~6 正码1两面
//              case "200702": // 正码1~6 正码1红
//              case "200703": // 正码1~6 正码1蓝
//              case "200704": // 正码1~6 正码1绿
//              case "200705": // 正码1~6 正码2两面
//              case "200706": // 正码1~6 正码2红
//              case "200707": // 正码1~6 正码2蓝
//              case "200708": // 正码1~6 正码2绿
//              case "200709": // 正码1~6 正码3两面
//              case "200710": // 正码1~6 正码3红
//              case "200711": // 正码1~6 正码3蓝
//              case "200712": // 正码1~6 正码2绿
//              case "200713": // 正码1~6 正码4两面
//              case "200714": // 正码1~6 正码4红
//              case "200715": // 正码1~6 正码4蓝
//              case "200716": // 正码1~6 正码4绿
//              case "200717": // 正码1~6 正码5两面
//              case "200718": // 正码1~6 正码5红
//              case "200719": // 正码1~6 正码5蓝
//              case "200720": // 正码1~6 正码5绿
//              case "200721": // 正码1~6 正码6两面
//              case "200722": // 正码1~6 正码6红
//              case "200723": // 正码1~6 正码6蓝
//              case "200724": // 正码1~6 正码6绿
//              labels = [['大 ', '小 ', '单 ', '双 ', '合单', '合双', '红', '蓝', '绿']]
//              break
                case "200201": // 特两面
                labels = [['大 ', '小 ', '单 ', '双 ','合大', '合小', '合单', '合双','合尾大', '合尾小', '尾大', '尾小','家禽', '野兽']]
                break
                case "200502": // 正码 总和
                labels = [['大 ', '小 ', '单 ', '双 ']]
                break
            default:
                break
            }
        } else if (lhcsebo) {
            hasSub = true
            leftPad = true
            switch(subGameId){
                case "200301": // 色波红
                labels = [['01','02','07','08','12','13','18','19','23','24','29','30','34','35','40','45','46']]
                break
                case "200302": // 色波蓝
                labels = [['03','04','09','10','14','15','20','25','26','31','36','37','41','42','47','48']]
                break
                case "200303": // 色波绿
                labels = [['05','06','11','16','17','21','22','27','28','32','33','38','39','43','44','49']]
                break
//              case "200801"://半波  红波
//              labels = [['29','30','34','35','40','45','46'],['01','02','07','08','12','13','18','19','23','24'],['01','07','13','19','23','29','35','45'],['02','08','12','18','24','30','34','40','46']]
//              break
//              case "200805"://半波 蓝波
//              labels = [['25','26','31','36','37','41','42','47','48'],['03','04','09','10','14','15'],['03','09','15','25','31','37','41','47'],['04','10','14','20','26','36','42','48']]
//              break
//              case "200809"://半波 绿波
//              labels = [['27','28','32','33','38','39','43','44','49'],['05','06','11','16','17','21','22'],['05','11','17','21','27','33','39','43'],['06','16','22','28','32','38','44']]
//              break
                // case "200804":
                // labels = [['29','30','34','35','40','45','46'],['1','2','7','8','12','13','18','19','23','24'],['1','7','13','19','23','29','35','45'],['2','8','12','18','24','30','34','40','46']]
                // break
                default:
                break
            }
        } else if (lhctexiao) {
            max = 12
            min = 1
            names = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
            quickBtnOption = quickBtnOptionFull
            leftPad = true
            hasSub = true
            switch (subGameId) {
                case "200401": // 特肖
                case "200901": // 一肖 一肖
                    {
						end = 11
						labels = Array(12);
						let year = (new Date()).getFullYear();
						let animal = year % 12 + 8;
						let number_arr = new Array(12);
						for(var i = 0; i < 12; i++) {
							if(i == animal) {
								let first_number = 1;
								let item = [String(first_number<10?"0"+first_number:first_number), String(first_number + 12), String(first_number + 24), String(first_number + 36), String(first_number + 48)];
								labels.fill(item, i, i + 1);
							} else {
								let first_number = i < animal ? (animal - i) + 1 : 13 - (i - animal);
								let item = [String(first_number<10?"0"+first_number:first_number), String(first_number + 12), String(first_number + 24), String(first_number + 36)];
								labels.fill(item, i, i + 1);
							}
						}

					}
                    quickBtnOption = []
                    hasSub = false
                    break;
                case "201001": // 合肖(中) 一肖
                case "201002": // 合肖(中) 二肖
                case "201003": // 合肖(中) 三肖
                case "201004": // 合肖(中) 四肖
                case "201005": // 合肖(中) 五肖
                case "201006": // 合肖(中) 六肖
                case "201007": // 合肖(中) 七肖
                case "201008": // 合肖(中) 八肖
                case "201009": // 合肖(中) 九肖
                case "201010": // 合肖(中) 十肖
                case "201011": // 合肖(中) 十一肖
                    {
                        end = 11
                        labels = Array(12);
                        let year = (new Date()).getFullYear();
                        let animal = year%12 + 8;
                        let number_arr = new Array(12);
                        for(var i = 0;i<12;i++){
                            if(i == animal){
                                let first_number = 1;
                                let item = [String(first_number<10?"0"+first_number:first_number),String(first_number+12),String(first_number+24),String(first_number+36)];
                                        labels.fill(item,i,i+1);
                                }else{
                                    let first_number = i<animal? (animal-i)+1:13-(i-animal);
                                    let item = [String(first_number<10?"0"+first_number:first_number),String(first_number+12),String(first_number+24),String(first_number+36)];
                                    labels.fill(item,i,i+1);
                                }
                        }
                    }
                    quickBtnOption = []
                    hasSub = false
                    break;
                default:
                    break
            }
        }
        if (labels.length === 0) {
            let sameLabels = []
            for (let i = min; i <= max; i++) {
                sameLabels.push(leftPad ? i > 9 ? i + '' : '0' + i : i + '')
            }
            labels = Array(names.length).fill(sameLabels)
        }
        const numbers = getRegularNumbers({
            end, 
            names, 
            start, 
            subGameId,
            labels,
        })
        return {
            dantuoMax,
            end, 
            hasSub,
            max,
            min,
            numberType: 'button',
            numbers,
            optionalMin,
            quickBtnOption, 
            start, 
            subGameId, 
            isSpecial:false
        }
    }
}

export default createBetNumbers