import KSBetNumbersConfig from '../createconfig/ks'
import BJSCBetNumbersConfig from '../createconfig/bjsc'
import LHCBetNumbersConfig from '../createconfig/lhc'
const bigSmallOddEven = ['大', '小', '单', '双']
const bigSmallOddEvenPrimeValue = ['大', '小', '单', '双', '质', '合']
const dragonTiger = ['龙', '虎', '和']
const oddEven = ['单', '双']

export const ksMergeMap = {
	"401001": true, // 号码 必出
	"401002": true, // 号码 不出
	"401101": true, // 1~3号球 第一球
	"401102": true, // 1~3号球 第二球
	"401103": true, // 1~3号球 第三球
}
export const lhcMergeMap = {
	"200301": true, // 红波
	"200302": true, // 蓝波
	"200303": true, // 绿波
}
export const zhengheMap = {
	"301401": true, // 整合 万定位
	"301402": true, // 整合 千定位
	"301403": true, // 整合 佰定位
	"301404": true, // 整合 拾定位
	"301405": true, // 整合 个定位
	"301406": true, // 整合 总和
}
export const dtSumMap = {
	"301407": true, // 龙虎 万千
	"301408": true, // 龙虎 万佰
	"301409": true, // 龙虎 万拾
	"301410": true, // 龙虎 万个
	"301411": true, // 龙虎 千佰
	"301412": true, // 龙虎 千拾
	"301413": true, // 龙虎 千个
	"301414": true, // 龙虎 佰拾
	"301415": true, // 龙虎 佰个
	"301416": true, // 龙虎 拾个
	"301417": true, // 龙虎 和
}
export const sumOEMap = {
	"301418": true, // 和值单双 万千
	"301419": true, // 和值单双 万佰
	"301420": true, // 和值单双 万拾
	"301421": true, // 和值单双 万个
	"301422": true, // 和值单双 千佰
	"301423": true, // 和值单双 千拾
	"301424": true, // 和值单双 千个
	"301425": true, // 和值单双 佰拾
	"301426": true, // 和值单双 佰个
	"301427": true, // 和值单双 拾个
}

export const doubleEdtionMap = {
	...zhengheMap,
	...dtSumMap,
	...sumOEMap,
}

/**
 * 通过循环生成选号按钮
 */
const loopNumbers = ({
	betTypeMap,
	labels,
	subGameId
}) => {
	let numbers = []
	const betType = betTypeMap[subGameId]
	labels.forEach((label, index) => {
		let inverse
		if(!(dtSumMap[subGameId] && index === 2)) { // 和的情况
			inverse = index % 2 === 0 ? index + 1 : index - 1
		}
		numbers.push({
			inverse,
			label,
			selected: false,
		})
	})

	return {
		...betType,
		cols: numbers,
		rowName: betType.rightName,
		subGameId
	}
}

const createSpecialBetNumbers = (props) => {
	const {
		betTypeMap,
		subGameIds
	} = props
	const firstSubGameId = subGameIds[0]
	let numbers = [],
		max = 9,
		i = 0
	subGameIds.forEach(subGameId => {
		let labels = [],
			cols = [];
		if(zhengheMap[subGameId]) {
			if(subGameId === '301406') { //整合 总和
				labels = bigSmallOddEven
			} else {
				labels = bigSmallOddEvenPrimeValue
			}

		} else if(dtSumMap[subGameId]) {
			labels = dragonTiger
		} else if(sumOEMap[subGameId]) {
			labels = oddEven
		} else if(KSBetNumbersConfig.special[subGameId] || BJSCBetNumbersConfig.special[subGameId] || LHCBetNumbersConfig.teliangmian[firstSubGameId]) {
			labels = [betTypeMap[subGameId].rightName]
		}
		if(KSBetNumbersConfig.special[subGameId] || BJSCBetNumbersConfig.special[subGameId] || KSBetNumbersConfig.merge[subGameId]) {
			const betType = betTypeMap[subGameId]
			if(ksMergeMap[subGameId]) {
				["1", "2", "3", "4", "5", "6"].forEach((item) => {
					cols.push({
						label: item,
						selected: false,
						odd: betType.odd
					})
				})
				numbers.push({
					subGameId: subGameId,
					rowName: betType.rightName,
					cols: cols,
				})
			} else {
				numbers.push({
					...betType,
					label: betType.rightName,
					selected: false
				})
			}

		}else if(lhcMergeMap[subGameId]){
			const betType = betTypeMap[subGameId]
			switch(subGameId) {
				case "200301":
					cols.push({
						label:['01','02','07','08','12','13','18','19','23','24','29','30','34','35','40','45','46'],
						selected: false,
					})
					break;
				case "200302":
				    cols.push({
						label: ['03','04','09','10','14','15','20','25','26','31','36','37','41','42','47','48'],
						selected: false,
					})
					break;
				case "200303":
				    cols.push({
						label: ['05','06','11','16','17','21','22','27','28','32','33','38','39','43','44','49'],
						selected: false,
					})
					break;
				default:
					break;
			}
			numbers.push({
				    ...betType,
					rowName: betType.rightName[betType.rightName.length-1],
					cols: cols,
				})
		} else if(LHCBetNumbersConfig.banbo[subGameId]) {
			const betType = betTypeMap[subGameId]
			switch(subGameId) {
				case "200801":
					cols.push({
						label: ['29', '30', '34', '35', '40', '45', '46'],
						selected: false,
					})
					break;
				case "200802":
				    cols.push({
						label: ['01','02','07','08','12','13','18','19','23','24'],
						selected: false,
					})
					break;
				case "200803":
				    cols.push({
						label: ['01','07','13','19','23','29','35','45'],
						selected: false,
					})
					break;
				case "200804":
				    cols.push({
						label: ['02','08','12','18','24','30','34','40','46'],
						selected: false,
					})
					break;
				case "200805":
					cols.push({
						label: ['25','26','31','36','37','41','42','47','48'],
						selected: false,
					})
					break;
				case "200806":
				    cols.push({
						label: ['03','04','09','10','14','15'],
						selected: false,
					})
					break;
				case "200807":
				    cols.push({
						label: ['03','09','15','25','31','37','41','47'],
						selected: false,
					})
					break;
				case "200808":
				    cols.push({
						label: ['04','10','14','20','26','36','42','48'],
						selected: false,
					})
					break;
				case "200809":
					cols.push({
						label: ['27','28','32','33','38','39','43','44','49'],
						selected: false,
					})
					break;
				case "2008010":
				    cols.push({
						label: ['05','06','11','16','17','21','22'],
						selected: false,
					})
					break;
				case "200811":
				    cols.push({
						label: ['05','11','17','21','27','33','39','43'],
						selected: false,
					})
					break;
				case "200812":
				    cols.push({
						label: ['06','16','22','28','32','38','44'],
						selected: false,
					})
					break;
				default:
					break;
			}
			numbers.push({
					...betType,
					rowName: betType.rightName.slice(betType.rightName.length-2),
					cols: cols,
				})
		}else if(LHCBetNumbersConfig.zmlm[subGameId]){
			const betType = betTypeMap[subGameId]
			switch(subGameId) {
				case "200701":
				case "200705":
				case "200709":
				case "200713":
				case "200717":
				case "200721":
				['大 ', '小 ', '单 ', '双 ', '合单', '合双'].forEach((item,index) => {
					let inverse = index % 2 === 0 ? index + 1 : index - 1
					cols.push({
						...betType,
						label: item,
						inverse,
						selected: false,
					})
				})
					break;
				case "200702":
				case "200706":
				case "200710":
				case "200714":
				case "200718":
				case "200722":
					cols.push({
						...betType,
						inverse:[2,3],
						label: "红",
						selected: false,
					})
					break;
				case "200703":
				case "200707":
				case "200711":
				case "200715":
				case "200719":
				case "200723":
					cols.push({
						...betType,
						inverse:[1,3],
						label: "蓝",
						selected: false,
					})
					break;
				case "200704":
				case "200708":
				case "200712":
				case "200716":
				case "200720":
				case "200724":
					cols.push({
						...betType,
						inverse:[1,2],
						label: "绿",
						selected: false,
					})
					break;
				default:
					break;
			}
			numbers.push({
					rowName: betType.rightName,
					cols: cols,
				})
		} else {
			numbers.push(loopNumbers({
				betTypeMap,
				labels,
				subGameId
			}))
		}
	})
	if(doubleEdtionMap[subGameIds[0]]) {
		max = 9
	} else if(ksMergeMap[subGameIds[0]]) {
		//		numbers = 
	} else if(KSBetNumbersConfig.special[subGameIds[0]]) {
		max = 21
		numbers = [{
			cols: numbers
		}]
	} else if(BJSCBetNumbersConfig.special[subGameIds[0]]) {
		max = 10;
		numbers = [{
			cols: numbers
		}]
	}
	return {
		hasSub: false,
		max,
		numberType: 'button',
		numbers,
		optionalMin: -1,
		quickBtnOption: [],
		subGameId: firstSubGameId,
		isSpecial: true
	}
}

export default createSpecialBetNumbers