import calcBetCountConfig from './calcBetCountConfig';
import fixedBetNumberConfig from './fixedBetNumberConfig';
import {
    allCombination,//从每个子数组中取一位
    arrange,
    calcDantuo,
    combination,
    combineTimesClac,
    fixedBetClac,
    noOneEqualCalc,
    numberTimesClac,
    optionalFourClac
    } from './quickCalc';
//数字选号组  任选万千百十个 计算选号的注数
export const calcChooseBetCount = (betNumbers, optionalFields = []) => {
    //subGameId子玩法id dantuoMax11选5的胆拖 numbers输入的号码 optionalMin用于任选
    const subGameId = betNumbers.subGameId, { dantuoMax, numbers, optionalMin } = betNumbers
    let ticketCount = 0, newNumbers = []
    numbers.forEach(row => {
        let selectedNumber = []
        row.cols.forEach((col, index) => {//数字选号单个
            if (col.selected) selectedNumber.push(index)
        })
        newNumbers.push(selectedNumber)
    })
    const firstRow = newNumbers[0], secondRow = newNumbers[1] 
    //直选复式
    if (calcBetCountConfig.numberTimes[subGameId]) { // 每一行选中的数量相乘
        switch (subGameId) {
            case "300305": // 前三直选 组合
            case "300405": // 中三直选 组合
            case "300505": // 后三直选 组合
                ticketCount = 3 * numberTimesClac(newNumbers)
                break
            default:
                ticketCount = numberTimesClac(newNumbers)
                break
        }
    }
    //六合彩合肖
    if (subGameId.substr(0, 4) === '2010') {
    	let selCount = 0,maxCount = Number(subGameId.substr(4));
    	selCount = newNumbers.reduce((prev, item) => prev + combination(item, 1).length, 0)
    	if(selCount === maxCount){
    		ticketCount = 1
    	}
    }
    if (calcBetCountConfig.fixedBet[subGameId]) ticketCount = fixedBetClac(firstRow, fixedBetNumberConfig.plusAndCrossValueArray[subGameId]) // 每个号有对应的注数
    if (calcBetCountConfig.baodan[subGameId]) ticketCount = firstRow.length * fixedBetNumberConfig.baodanFixedValue[subGameId]
    if (calcBetCountConfig.oneCombine[subGameId]) ticketCount = newNumbers.reduce((prev, item) => prev + combination(item, 1).length, 0)
    if (calcBetCountConfig.twoCombine[subGameId]) ticketCount = combination(firstRow, 2).length
    if (calcBetCountConfig.threeCombine[subGameId]) ticketCount = combination(firstRow, 3).length
    if (calcBetCountConfig.combineTimes[subGameId]) {
        switch (subGameId) {
            case "301001": // 任二直选 复式
                ticketCount = combineTimesClac(newNumbers, 2)
                break
            case "301101": // 任三直选 复式
                ticketCount = combineTimesClac(newNumbers, 3)
                break
            case "301201": // 任四直选 复式
                ticketCount = combineTimesClac(newNumbers, 4)
                break
        }
    }
    if (calcBetCountConfig.twoArrange[subGameId]) ticketCount = arrange(firstRow, 2).length
    if (calcBetCountConfig.moreCombine[subGameId]) ticketCount = combination(firstRow, parseInt(subGameId.charAt(5))).length
    if (calcBetCountConfig.noOneEqual[subGameId]) ticketCount = noOneEqualCalc(newNumbers)
    if (calcBetCountConfig.dantuo[subGameId]) ticketCount = calcDantuo(firstRow, secondRow, dantuoMax)
    if (subGameId === '400701') ticketCount = firstRow.length * secondRow.length // 二同号 单选
    if (subGameId === "301203") ticketCount = combination(firstRow, 4).length // 任四组选 组选24
    if (subGameId === "301204") ticketCount = optionalFourClac(firstRow, secondRow, 2) // 任四组选 组选12
    if (optionalMin > 0) ticketCount *= combination(optionalFields, optionalMin).length
    return {
        newNumbers,
        ticketCount
    }
}
//数字选号组 计算手动输入号码的注数
export const calcInputBetCount = (betNumbers, inputNumber, optionalFields = []) => {
    if (/^[\d,\s,,,;]*$/.test(inputNumber)) {
        // alert(optionalFields);
        inputNumber = inputNumber.replace(/[\s]+/g, '')
        const orginalNumbers = inputNumber.replace(/[,,,;]+/g, ',').split(',')
        const {
            inputFormat,
            max,
            maxSame,
            min,
            minSame,
            numberUnitFormat,
            optionalMin,
        } = betNumbers
        const reg = new RegExp(`\\B(?=(\\d{${numberUnitFormat}})+(?!\\d))`, 'g')
        let numbers = [], msg = ''
        orginalNumbers.forEach(item => {
            if (item !== '') {
                let arr = item.replace(reg, ',').split(','), sameNumber = 1, content = ''
                arr.forEach(unit => {
                    if (unit.length !== numberUnitFormat) content = `${item}格式不正确`
                })
                if (arr.length !== inputFormat) {
                    content = `${item}不是${inputFormat}个号码，无法作为一注`
                } else {
                    // 如果有某个号码超过了最大值
                    const sortNumbers = arr.sort()
                    const maxNumber = parseInt(sortNumbers[arr.length - 1]), 
                        minNumber = parseInt(sortNumbers[0])
                    if (maxNumber > max || minNumber < min) content = `${item}中有不属于该玩法的号码`
                }
                if (!content) {
                    arr.forEach(item => {
                        let same = 0
                        // 如果有相同的号码，就+1
                        arr.forEach(sub => {
                            if (item === sub) same++
                        })
                        if (same > sameNumber) sameNumber = same
                    })
                    if (sameNumber < minSame) content = `每注号码至少有${minSame}个相同的数，${item}中只有${sameNumber}个相同的数`
                    if (maxSame > 0 && sameNumber > maxSame) content = `每注号码至多有${maxSame}个相同的数，${item}中有${sameNumber}个相同的数`
                }
                if (content) {
                    if (!msg) msg = content
                } else {
                    numbers.push(item)
                }
            }
        })
        // const ticketCount = optionalMin > 0 ? numbers.length * combination(optionalFields, optionalMin).length : numbers.length
        console.info(msg);
        console.info(numbers);
        return {
            msg,
            numbers,
            ticketCount: optionalMin > 0 ? numbers.length * combination(optionalFields, optionalMin).length : numbers.length,
        }
    } else {
        return {
            msg: '您输入的号码不合规范，请参考玩法说明',
            numbers: [],
            ticketCount: 0,
        }
    }
}
//两面盘 计算注数
export const calcLmpBetCount = function(lmpBetNumbers){
    let ticketCount = 0;
    let newNumbers = [];
    lmpBetNumbers.forEach((item1, index1) => {
        item1.groups.forEach((item2) => {
            if(item2.selected) {
                ticketCount++
                item2.title = item1.title
                newNumbers.push(item2)
            }
        })
    })
    return {
        ticketCount,
        newNumbers
    }
}