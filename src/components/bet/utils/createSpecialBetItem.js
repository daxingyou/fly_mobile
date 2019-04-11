import BJSCBetNumbersConfig from '../createconfig/bjsc';
import LHCBetNumbersConfig from '../createconfig/lhc';
import KSBetNumbersConfig from '../createconfig/ks';
import { ksMergeMap, lhcMergeMap, dtSumMap, sumOEMap, zhengheMap } from './createSpecialBetNumbers';
import { fhRound } from "./quickCalc"
const createSpecialBetItem = (data) => {
    const { betNumbers, unitPrice, betRates, ticketUnitCost, ticketUnit, ticketCost } = data
    let betArray = []
    const { numbers, subGameId: firstSubGameId } = betNumbers
    if (dtSumMap[firstSubGameId]) {//龙虎
        let sumColString = []
        numbers.forEach((row, rowIndex) => {
            row = Object.assign(row, betRates[rowIndex])
            const { rowName, subGameId, cols, oddMax, leftName, rightName, oneNoteLimit, singleLimit } = row
            const betName = rightName && leftName !== rightName ? leftName + "(" + rightName + ")" : leftName
            let colString = []
            cols.forEach((col, index) => {
                const { selected, label } = col
                if (selected) {
                    if (index === 2) {
                        sumColString.push(rightName)
                    } else {
                        colString.push(label)
                    }
                }
            })
            if (colString.length > 0) {
                betArray.push({
                    betName,
                    bonus: oddMax,
                    lotteryNum: colString.toString(),
                    odds: oddMax,
                    oneNoteLimit,
                    optionalMin: -1,
                    orderNum: colString.length,
                    singleLimit,
                    subGameId,
                    ticketUnit,
                    ticketCost,
                    ticketUnitCost: ticketUnitCost,
                    totalAmount: fhRound(unitPrice),
                    unitPrice,
                    chasePeriods: 1,
                })
            }
        })
        if (sumColString.length > 0) {
            let lastRow = numbers[numbers.length - 1];
            lastRow = Object.assign(lastRow, betRates[numbers.length - 1])
            const { rowName, subGameId, cols, oddMax, leftName, rightName, oneNoteLimit, singleLimit } = lastRow
            const orderNum = sumColString.length
            const betName = rightName && leftName !== rightName ? leftName + "(" + rightName + ")" : leftName
            betArray.push({
                betName,
                bonus: oddMax,
                lotteryNum: sumColString.toString(),
                odds: oddMax,
                oneNoteLimit,
                optionalMin: -1,
                orderNum,
                singleLimit,
                subGameId,
                ticketUnit,
                ticketCost: ticketCost,
                ticketUnitCost: ticketUnitCost,
                totalAmount: fhRound(unitPrice * orderNum),
                unitPrice,
                chasePeriods: 1,
            })
        }
    }//和值 
    else if (sumOEMap[firstSubGameId] || zhengheMap[firstSubGameId] || BJSCBetNumbersConfig.special[firstSubGameId] || LHCBetNumbersConfig.zmlm[firstSubGameId]) {
        numbers.forEach((row, rowIndex) => {
            row = Object.assign(row, betRates[rowIndex])
            const { rowName, subGameId, cols, oddMax, leftName, rightName, oneNoteLimit, singleLimit } = row

            const betName = rightName && leftName !== rightName ? leftName + "(" + rightName + ")" : leftName
            let colString = []
            cols.forEach(col => {
                const { selected, label } = col
                if (selected) {
                    colString.push(label)
                }
            })
            const orderNum = colString.length
            if (orderNum > 0) {
                betArray.push({
                    betName,
                    bonus: oddMax,
                    lotteryNum: colString.toString(),
                    odds: oddMax,
                    oneNoteLimit,
                    optionalMin: -1,
                    orderNum,
                    singleLimit,
                    subGameId,
                    ticketUnit,
                    ticketCost: ticketCost,
                    ticketUnitCost: ticketUnitCost,
                    totalAmount: fhRound(unitPrice * orderNum),
                    unitPrice,
                    chasePeriods: 1,
                })
            }
        })
    } //快三
    else if (KSBetNumbersConfig.special[firstSubGameId]) {
        numbers.forEach((row) => {
            const { cols } = row
            let colString = []
            cols.forEach((col, colIndex) => {
                col = Object.assign(col, betRates[colIndex])
                const { selected, label, oddMax, leftName, rightName, oneNoteLimit, singleLimit, subGameId } = col
                const betName = rightName && leftName !== rightName ? leftName + "(" + rightName + ")" : leftName
                if (selected) {
                    betArray.push({
                        betName,
                        bonus: oddMax,
                        lotteryNum: label,
                        odds: oddMax,
                        oneNoteLimit,
                        optionalMin: -1,
                        orderNum: 1,
                        singleLimit,
                        subGameId,
                        ticketUnit,
                        ticketCost,
                        ticketUnitCost: ticketUnitCost,
                        totalAmount: fhRound(unitPrice),
                        unitPrice,
                        chasePeriods: 1,
                    })
                }
            })
        })
    } else if (ksMergeMap[firstSubGameId]) {
        numbers.forEach((row, rowIndex) => {
            let isSel = false;
            let colString = [], orderNum = 0;
            row = Object.assign(row, betRates[rowIndex])
            const { label, oddMax, oneNoteLimit, singleLimit, subGameId, rowName, cols } = row;
            cols.forEach((col, colIndex) => {
                const { selected, label } = col
                if (selected) {
                    colString.push(label);
                    isSel = true;
                    orderNum++
                }
            })
            if (isSel) {
                betArray.push({
                    betName: rowName,
                    bonus: oddMax,
                    lotteryNum: colString.toString(),
                    odds: oddMax,
                    oneNoteLimit,
                    optionalMin: -1,
                    orderNum,
                    singleLimit,
                    subGameId,
                    ticketUnit,
                    ticketCost,
                    ticketUnitCost: ticketUnitCost,
                    totalAmount: fhRound(unitPrice * orderNum),
                    unitPrice,
                    chasePeriods: 1,
                })
            }

        })
    } else if (lhcMergeMap[firstSubGameId] || LHCBetNumbersConfig.banbo[firstSubGameId]) {
        numbers.forEach((row, rowIndex) => {
            row = Object.assign(row, betRates[rowIndex])
            const { selected, label, oddMax, leftName, rightName, oneNoteLimit, singleLimit, subGameId } = row
            const betName = rightName && leftName !== rightName ? leftName + "(" + rightName + ")" : leftName
            if (row.cols[0].selected) {
                betArray.push({
                    betName,
                    bonus: oddMax,
                    lotteryNum: rightName.slice(rightName.length - 1),
                    odds: oddMax,
                    oneNoteLimit,
                    optionalMin: -1,
                    orderNum: 1,
                    singleLimit,
                    subGameId,
                    ticketUnit,
                    ticketCost, ticketCost,
                    ticketUnitCost: ticketUnitCost,
                    totalAmount: fhRound(unitPrice),
                    unitPrice,
                    chasePeriods: 1,
                })
            }
        })
    }
    return betArray
}

export default createSpecialBetItem