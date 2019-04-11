import LHCBetNumbersConfig from '../createconfig/lhc';
import { fhRound } from "./quickCalc"
const createBetItem = ({
	betNumbers,
	betType,
	betRate,
	optionalFields,
	ticketUnitCost,
	ticketUnit,
	ticketCost,
	ticketCount,
	unitPrice
}) => {
	const {
		numberType,
		subGameId,
		numbers,
		optionalMin
	} = betNumbers
	const {
		oddMax,
		oneNoteLimit,
		singleLimit
	} = betRate //赔率信息
	const {
		leftName,
		rightName
	} = betType //下注类型
	let numberString = '',
		mapIndex = 0,
		needSeperatorInCol = false
	if(numberType === "button") { //选号类型， button 或者 input
		if(LHCBetNumbersConfig.texiao[subGameId]) {
			let rows = []
			numbers.forEach(item => {
				if(item.cols[0].selected) {
					rows.push(item.rowName)
				}
			})
			numberString = rows.join(",")
		} else {
			let rows = []
			if(numbers.length === 1) needSeperatorInCol = true
			numbers.forEach(item => {
				let colString = []
				item.cols.forEach((subItem) => {
					if(subItem.selected) {
						colString.push(subItem.label)
					}
				})
				if(colString.length === 0) {
					colString.push('?')
				}
				rows.push(colString.join(needSeperatorInCol ? ',' : ''))
			})
			numberString = rows.join()
		}

	} else {
		console.log(numbers.join())
		numberString = numbers.join()
	}
	if(optionalMin > 0) {
		numberString = optionalFields.sort().join('').replace(/1/g, '万').replace(/2/g, '千').replace(/3/g, '百').replace(/4/g, '十').replace(/5/g, '个') + '|' + numberString
	}
	let betArray = []
	let oddArray = oddMax.split(',')
	const betName = rightName && leftName !== rightName ? leftName + "(" + rightName + ")" : leftName
	if(subGameId === "300312" || subGameId === "300412" || subGameId === "300512") {
		numbers[0].cols.forEach((item, index) => {
			if(item.selected) {
				betArray.push({
					betName,
					bonus: oddArray[index],
					lotteryNum: item.label,
					odds: oddMax,
					oneNoteLimit,
					optionalMin,
					orderNum: 1,
					singleLimit,
					subGameId,
					ticketCost,
					ticketUnit:ticketUnit,
					ticketUnitCost:ticketUnitCost,
					totalAmount: fhRound(unitPrice),
					unitPrice,
					chasePeriods:1,
				})
			}
		})
	} else {
		betArray.push({
			betName,
			bonus: oddMax,
			lotteryNum: numberString,
			odds: oddMax,
			oneNoteLimit,
			optionalMin,
			orderNum: ticketCount,
			singleLimit,
			subGameId,
			ticketUnit:ticketUnit,
			ticketUnitCost:ticketUnitCost,
			ticketCost:ticketCost,
			totalAmount: fhRound(ticketCost),
			unitPrice,
			chasePeriods:1,
		})
	}
	return betArray
}

export default createBetItem