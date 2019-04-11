import calcChaseList from './calcChaseList';

const confirmBetTypeEnum = {
    normal:"1", // 正常投注
    common:"2", // 常规追号
    advanced:"3" // 高级追号
}
/**
 * createChaseList 生成追号方案
 * @param confirmBetFields 追号配置
 * @param betList 注单
 * @param chaseList 追号列表
 * @param hasPay 上期累积投入
 * @param periodNo 期号
 * @param gameType 游戏类型
 * @param isFirst 是否首次追号
 */
const createChaseList = ({confirmBetFields, betList, chaseList, periodNo, gameType, isFirst}) => {
    console.log({confirmBetFields, betList, chaseList, periodNo, gameType, isFirst})
    const { 
        chaseAfterPercent,
        chaseBeforePercent,
        chaseBeforePeriod,
        chaseMinNumber,
        chaseMinPercent,
        chasePeriods, 
        chasePrePay, 
        chaseTimes, 
        chaseWinType, 
        confirmBetType, 
    } = confirmBetFields
    // 普通追号
    let newChaseList = [], finalChaseList = [], targetChasePeriods = chasePeriods;
    // 是否重新生成追号方案，两者的区别在于是否使用现有追号的倍数
    if (isFirst) {
        for (let i = 0; i < chasePeriods; i++) {
            newChaseList.push({
                currentPay: 0,
                hasPay: 0,
                profit: '',
                profitRate: '',
                periodNo: createChasePeriod(periodNo, i, gameType),
                times: chaseTimes
            })
        }
    } else {
        newChaseList = chaseList.reduce((prev, item, index) => 
        [
            ...prev, 
            {
                ...item,
                periodNo: createChasePeriod(periodNo, index, gameType),
                times: item.times
            }
        ], newChaseList)
    }
    // 如果是常规追号
    if (confirmBetType === confirmBetTypeEnum.common) {
        let hasPay = 0
        newChaseList.forEach(item => {
            const times = item.times
            let currentPay = 0;
            // 多条投注的情况下，每条追号的当前投入，要把所有投注的金额相加
            currentPay = betList.reduce((prev, item) => prev + item.totalAmount * times, 0);
            currentPay = parseFloat(currentPay.toFixed(2));   
            hasPay += currentPay;       
            hasPay = parseFloat(hasPay.toFixed(2));                               
            // 默认不计算盈利
            let profit = {
                profit: '--',
                profitRate: '--'
            }
            // 如果只有一条投注，再来计算盈利
            if (betList.length === 1) {
                profit = calcChaseList.calcProfitByChaseTimes({
                    chaseTimes: times,
                    betItem: betList[0],
                    hasPay
                })
            }
            finalChaseList.push({
                currentPay,
                hasPay,
                periodNo: item.periodNo,
                profit: profit.profit,
                profitRate: profit.profitRate,
                times,
            })
        })
    } else {
        // 高级追号，只有一条投注
        let hasPay = chasePrePay
        const betItem = betList[0]
        // 最低盈利率
        if (chaseWinType == 1) {
            newChaseList.forEach((item, index) => {
                let times = 0
                if (isFirst) {
                    times = calcChaseList.calcChaseTimesByProfitRate({
                        profitRate: chaseMinPercent,
                        hasPay,
                        betItem
                    })
                    times = times >= chaseTimes ? times : chaseTimes
                } else {
                    times = item.times
                }
                // 如果倍数为0，不添加此条追号
                if (times != 0 && times < 99999) {
                    let currentPay = betItem.totalAmount * times;
                    currentPay = parseFloat(currentPay.toFixed(2));
                    hasPay += currentPay; 
                    hasPay = parseFloat(hasPay.toFixed(2)); 
                    const profit = calcChaseList.calcProfitByChaseTimes({
                        chaseTimes: times,
                        betItem,
                        hasPay
                    })
                    finalChaseList.push({
                        periodNo: item.periodNo,
                        times,
                        currentPay,
                        hasPay,
                        profit: profit.profit,
                        profitRate: profit.profitRate,
                    })
                }
            })
        }
        // 前n期多少最低盈利率，后面最低多少盈利率
        if (chaseWinType == 2) {
            newChaseList.forEach((item, index) => {
                let targetProfitRate
                if (index < chaseBeforePeriod) {
                    targetProfitRate = chaseBeforePercent
                } else {
                    targetProfitRate = chaseAfterPercent
                }
                let times = 0
                if (isFirst) {
                    times = calcChaseList.calcChaseTimesByProfitRate({
                        profitRate: targetProfitRate,
                        hasPay,
                        betItem
                    })
                    times = times >= chaseTimes ? times : chaseTimes
                } else {
                    times = item.times
                }
                if (times != 0 && times < 99999) {
                    let currentPay = betItem.totalAmount * times;
                    currentPay = parseFloat(currentPay.toFixed(2));
                    hasPay += currentPay; 
                    hasPay = parseFloat(hasPay.toFixed(2)); 
                    const profit = calcChaseList.calcProfitByChaseTimes({
                        chaseTimes: times,
                        betItem,
                        hasPay
                    })
                    finalChaseList.push({
                        currentPay,
                        hasPay,
                        periodNo: item.periodNo,
                        profit: profit.profit,
                        profitRate: profit.profitRate,
                        times,
                    })
                }
            })
        }
        // 最低盈利多少元
        if (chaseWinType == 3) {
            newChaseList.forEach((item, index) => {
                let times = 0
                if (isFirst) {
                    times = calcChaseList.calcChaseTimesByProfit({
                        profit: chaseMinNumber,
                        hasPay,
                        betItem
                    })
                    times = times >= chaseTimes ? times : chaseTimes
                } else {
                    times = item.times
                }
                if (times != 0 && times < 99999) {
                    let currentPay = betItem.totalAmount * times;
                    currentPay = parseFloat(currentPay.toFixed(2));
                    hasPay += currentPay; 
                    hasPay = parseFloat(hasPay.toFixed(2));
                    const profit = calcChaseList.calcProfitByChaseTimes({
                        chaseTimes: times,
                        betItem,
                        hasPay
                    })
                    finalChaseList.push({
                        currentPay,
                        hasPay,
                        periodNo: item.periodNo,
                        profit: profit.profit,
                        profitRate: profit.profitRate,
                        times,
                    })
                }
            })
        }
    }
    if (finalChaseList.length < targetChasePeriods) {
       console.log({type: 'error', msg: `您设定的条件只能生成${finalChaseList.length}期追号`, destory: true})
    } else {
       console.log({msg: '生成追号方案成功', destory: true})
    }
    return finalChaseList
}
/**
 * 生成追号下一期的期号
 * @param period 当前期号
 * @param offset 期数偏移
 * @param gameId 彩种id
 */
export const createChasePeriod = (period, offset, gameType) => {
    const { periodNoAll, kindId } = gameType
    if (kindId === "bjpk10" || kindId === "mlaft") {
        return parseInt(period) + offset + ''
    } else {
        const digit = period.length - 8
        // 当前期号的日期
        let periodTime = period.substr(0, 8)
        // 转化为moment型，方便后面计算
        let momentTime = moment(periodTime, 'YYYYMMDD')
        const nowPeriodString = period.substr(8, digit)
        // 当前期号
        let nowPeriod = parseInt(period.substr(8, digit))
        // 目标期号
        let targetPeriod = nowPeriod + offset
        let targetTime
        if (targetPeriod > periodNoAll) {
            targetPeriod -= periodNoAll
            targetTime = momentTime.add(1, 'd').format('YYYYMMDD')
        } else {
            targetTime = periodTime
        }
        const targetPeriodString = targetPeriod + ''
        return targetTime + targetPeriodString.padStart(digit, '0')
    }
}

export default createChaseList