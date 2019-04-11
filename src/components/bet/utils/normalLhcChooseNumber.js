"use strict";
const calcBetCountConfig_1 = require('./calcBetCountConfig');
const ssc_1 = require('../createconfig/ssc');
const ssc_2 = require('../../gamelist/ssc');
const normalChooseNumber = ({ betNumbers, rowIndex }) => {
    let newBetNumbers = { betNumbers: betNumbers };
    const { subGameId, dantuoMax } = betNumbers;
    let selectedNumber = newBetNumbers.numbers[rowIndex];
    let beforeStatus = selectedNumber.selected;
    selectedNumber.selectedTime = Date.now();
    // 包胆完全互斥
    if (ssc_1.default.fullInverse[subGameId]) {
        newBetNumbers.numbers[rowIndex].cols.forEach((item) => item.selected = false);
    }
    // 胆拖
    selectedNumber.selected = !beforeStatus;
    if (calcBetCountConfig_1.default.dantuo[subGameId]) {
        if (selectedNumber.selected) {
            newBetNumbers.numbers[1 - rowIndex].selected = false;
            if (rowIndex === 0) {
                let oldestSelected = Date.now() * 10, oldestIndex = -1, selecteds = 0;
                newBetNumbers.numbers[rowIndex].cols.forEach((item, index) => {
                    if (item.selected)
                        selecteds++;
                    if (item.selectedTime && item.selectedTime < oldestSelected) {
                        oldestSelected = item.selectedTime;
                        oldestIndex = index;
                    }
                });
                if (selecteds === dantuoMax) {
                    newBetNumbers.numbers[0].cols[oldestIndex].selected = false;
                    newBetNumbers.numbers[0].cols[oldestIndex].selectedTime = undefined;
                }
            }
        }
    }
    // 如果是两面盘，存在互斥
    if (ssc_2.default[subGameId] && subGameId.substr(2, 2) === '14' && selectedNumber.inverse !== undefined) {
        let inverseNumber = newBetNumbers.numbers[rowIndex].cols[selectedNumber.inverse];
        if (selectedNumber.selected && inverseNumber) {
            inverseNumber.selected = false;
        }
    }
    return newBetNumbers;
};
exports.default = normalChooseNumber;
