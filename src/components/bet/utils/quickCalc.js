"use strict";
/**
 * 保留digit位小数
 * @param value
 * @param digit 位数
 */
export const fhRound = (value, digit = 3) => Math.round(value * (Math.pow(10, digit))) / Math.pow(10, digit);
/**
 * 随机取整，
 * @param plus 倍数
 * @param add 偏移
 */
export const getRandomInt = (plus, add = 0) => Math.floor(Math.random() * plus + add);
/**
 * 排列,有重复
 * @param arr 数据
 * @param num 选几个数
 */
export const arrange = (arr, num) => {
    let result = [];
    (function f(t, a, n) {
        if (n === 0)
            return result.push(t);
        for (let i = 0, l = a.length; i < l; i++) {
            f([...t, a[i]], [...a.slice(0, i), ...a.slice(i + 1)], n - 1);
        }
    })([], arr, num);
    return result;
};
/**
 * 组合,无重复
 * @param arr 数据
 * @param num 选几个数
 */
export const combination = (arr, num) => {
    let result = [];
    (function f(t, a, n) {
        if (n === 0)
            return result.push(t);
        for (let i = 0, l = a.length; i <= l - n; i++) {
            f([...t, a[i]], a.slice(i + 1), n - 1);
        }
    })([], arr, num);
    return result;
};
/**
 * 从每个子数组中取一位
 * @param arr 二维数组
 */
export const allCombination = (arr) => {
    let result = [];
    (function f(t, a, n) {
        if (n < a.length) {
            a[n].forEach(item => {
                if (n === a.length - 1) {
                    result.push([...t, item]);
                }
                else {
                    f([...t, item], a, n + 1);
                }
            });
        }
    })([], arr, 0);
    return result;
};
/**
 * numberTimes 每一行的选中的数量相乘，就是最后的结果，直选复式
 * @param numbers 选择的号码
 */
export const numberTimesClac = (numbers) => numbers.reduce((prev, item) => prev * item.length, 1);
/**
 * fixedBet 每个号码固定对应几注
 * @param firstRow 第一行
 * @param countArr 每个号码对应的注数
 */
export const fixedBetClac = (firstRow, countArr) => firstRow.reduce((prev, item) => prev + countArr[item], 0);
/**
 * combineTimes 先对二维数组进行组合，然后把组合里每个数据的所有数组长度相乘，就是注数
 * @param numbers 二维数组
 * @param n 组合的关键参数
 * @param optionalFields 任选的位置
 */
export const combineTimesClac = (numbers, n) => combination(numbers, n).reduce((prev, item) => prev + item.reduce((subPrev, subItem) => subPrev * subItem.length, 1), 0);
/**
 * optionalFour 任四组选的 组选12 的专用方法
 * @param firstRow 第一行
 * @param secondRow 第二行
 * @param n 组选12传2
 * @param optionalFields 任选的位置
 */
export const optionalFourClac = (firstRow, secondRow, n) => {
    let ticketCount = 0;
    // 遍历选中的三重号
    firstRow.forEach(item => {
        let itemIndex = secondRow.indexOf(item);
        // 如果与单号有重复
        if (itemIndex > -1) {
            // 有重合就去掉重合的号码，重新对选中的单号进行 Cx1
            ticketCount += combination([...secondRow.slice(0, itemIndex), ...secondRow.slice(itemIndex + 1)], n).length;
        }
        else {
            // 加上单号选1的组合 Cx1
            ticketCount += combination(secondRow, n).length;
        }
    });
    return ticketCount;
};
/**
 * 计算胆拖
 * @param firstRow 胆码
 * @param secondRow 拖码
 * @param n 至少选几个号码
 */
export const calcDantuo = (firstRow, secondRow, n) => firstRow.length > 0 ? combination(secondRow, n - firstRow.length).length : 0;
/**
 * noOneEqual 的计算函数
 * @param numbers 选择的号码
 */
export const noOneEqualCalc = (numbers) => {
    const allPossibleCombines = allCombination(numbers);
    let ticketCount = 0;
    allPossibleCombines.forEach(item => {
        let isEffect = true;
        item.forEach((sub, index) => {
            if (item.indexOf(sub) !== index) {
                isEffect = false;
            }
        });
        if (isEffect) {
            ticketCount++;
        }
    });
    return ticketCount;
};
/**
 * 快速排序
 * @param arr 要排序的数组
 */
// export const quickSort = <T>(arr: T[]): T[] => {
//     if (arr.length <= 1) { return arr; }
//     const pivotIndex = Math.floor(arr.length / 2);
//     const pivot = arr.splice(pivotIndex, 1)[0];
//     let left: T[] = [], right: T[] = [];
//     arr.forEach(item => {
//         if (item < pivot) {
//             left.push(item);
//         } else {
//             right.push(item);
//         }
//     })
//     return quickSort(left).concat([pivot], quickSort(right));
// };
