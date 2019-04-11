import { combination, fhRound } from './quickCalc';
/**
 * 已知最低盈利，计算最低追号倍数
 * 最低追号倍数 = (最低盈利 + 上期累积投入) / (最大可中注数 * 奖金 - 注单价格)
 * @param profit 最低盈利
 * @param hasPay 上期累积投入
 * @param betItem 注单
 */
const calcChaseTimesByProfit = ({profit, hasPay, betItem}) => {
    const {odds, totalAmount} = betItem
    let oddArray = odds.split(',').map(item => parseFloat(item)).sort((a, b) => a - b)
    const oddMin = oddArray[0]
    const betTimes = calcBetTimes(betItem)
    const maxBonus = oddMin * betTimes - totalAmount
    if (maxBonus <= 0) {
        return 0
    }
    const chaseTimes = Math.ceil((profit + hasPay) / (betTimes * oddMin - totalAmount))
    return isNaN(chaseTimes) || !isFinite(chaseTimes) || chaseTimes < 0 ? 0 : chaseTimes
}
/**
 * 
 */
/**
 * 已知最低盈利率，计算最低追号倍数
 * 利润 = 奖金 X 追号倍数 X 最大可中注数 X 单价 应该加上单价
 * 盈利 = 利润 - 累积投入 - 注单价格 * 追号倍数
 * 盈利率 = 盈利 / (累积投入 + 注单价格 * 追号倍数) * 100 + '%'
 * @param profitRate 最低盈利率
 * @param hasPay 上期累积投入
 * @param betItem 注单
 */
const calcChaseTimesByProfitRate = ({profitRate, hasPay, betItem}) => {
    const {odds, totalAmount} = betItem
    let oddArray = odds.split(',').map(item => parseFloat(item)).sort((a, b) => a - b)
    const oddMin = oddArray[0]
    const betTimes = calcBetTimes(betItem)
    // 盈利率上限
    let profitRateMax = (oddMin * betTimes - totalAmount) / totalAmount * 100
    if (hasPay == 0) {
        // 目标超过最大可能，返回0
        if (profitRate > profitRateMax) {
            return 0 
        } else {
            return 1
        }
    }
    const chaseTimes = Math.ceil(hasPay * (profitRate / 100 + 1) / (oddMin * betTimes - totalAmount - profitRate * totalAmount / 100))

    return isNaN(chaseTimes) || !isFinite(chaseTimes) || chaseTimes < 0 ? 0 : chaseTimes
}

/**
 * 已知追号倍数，计算盈利和盈利率
 * @param hasPay 累积投入
 * @param chaseTimes 追号倍数
 * @param betItem 注单
 */


const calcProfitByChaseTimes = ({chaseTimes, betItem, hasPay}) => {
    // 下注号码可能中奖的注数，一般情况下是一注
    const {subGameId, lotteryNum, odds, optionalMin} = betItem
    const betTimes = calcBetTimes(betItem)
    let oddArray = odds.split(',').map(item => parseFloat(item)).sort((a, b) => a - b)
    const oddMin = oddArray[0]
    const oddMax = oddArray[oddArray.length - 1]
    const profit = {
        min: calcProfitAndRate({odds: oddMin, chaseTimes, betTimes, hasPay}),
        max: calcProfitAndRate({odds: oddMax, chaseTimes, betTimes, hasPay})
    }
    if (oddArray.length === 1) {
        return {
            profit: profit.min.profit.toFixed(3),
            profitRate: profit.min.profitRate + '%'
        }
    } else {
        return {
            profit: profit.min.profit.toFixed(3) + '~' + profit.max.profit.toFixed(3),
            profitRate: profit.min.profitRate + '%~' + profit.max.profitRate + '%'
        }
    }
}

/**
 * 计算盈利和盈利率
 * @param hasPay 累积投入
 * @param chaseTimes 追号倍数
 * @param betTimes 起始倍数
 * @param odds 赔率
 * 
 */
const calcProfitAndRate = ({odds, chaseTimes, betTimes, hasPay}) => {
    const all = odds * chaseTimes * betTimes * ( hasPay / betTimes )
    const real = all - hasPay
    return {
        profit: real,
        profitRate: fhRound(real / hasPay * 100)
    }
}
/**
 * 计算注单最大可中注数
 * @param betItem 注单
 */
const calcBetTimes = (betItem) => {
    let betTimes = 1
    const {subGameId, lotteryNum, optionalMin} = betItem
    if (subGameId === "300101") { // 定位胆
        const lotteryNumArray = lotteryNum.replace(/\?/g, '').split(',')
        betTimes = lotteryNumArray.reduce((prev, item) => item.length > 0 ? ++prev : prev, 0)
    }
    if (optionalMin > 0) {
        const optionalNum = lotteryNum.split('|')[0]
        betTimes = combination(optionalNum.split(''), optionalMin).length
    }
    return betTimes
}

const calcChaseList = {
    calcChaseTimesByProfit,
    calcChaseTimesByProfitRate,
    calcProfitByChaseTimes,
}

export default calcChaseList