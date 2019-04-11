"use strict";
const numbers = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
const units = ['仟', '', '拾', '佰'];
const numberToChinese = (money = 0) => {
    let str = '';
    let tempArray = money.toString().split('.');
    let intPart = tempArray[0].split('');
    let decimalPart = [];
    if (tempArray[1]) {
        decimalPart = tempArray[1].split('');
    }
    const intPartLength = intPart.length;
    let hasZeroBefore = false;
    intPart.forEach((item, index) => {
        const intItem = parseInt(item);
        const realIndex = (intPartLength - index) % 4;
        if (intItem > 0) {
            if (hasZeroBefore) {
                str += numbers[0];
                hasZeroBefore = false;
            }
            str = str + numbers[intItem] + units[realIndex];
        }
        else {
            hasZeroBefore = true;
        }
        if (intPartLength - index === 5) {
            str += '万';
        }
    });
    if (str) {
        str += '元';
    }
    decimalPart = decimalPart.slice(0, 3);
    const decimalPartLength = decimalPart.length;
    if (decimalPartLength > 0) {
        decimalPart.forEach((item, index) => {
            const intItem = parseInt(item);
            if (intItem > 0) {
                str += numbers[intItem];
                if (decimalPartLength > 1) {
                    switch (index) {
                        case 0:
                            str += '角';
                            break;
                        case 1:
                            str += '分';
                            break;
                        case 2:
                            str += '厘';
                            break;
                    }
                }
                else {
                    str += '角';
                }
            }
        });
    }
    else {
        str += '整';
    }
    return str === '整' ? '' : str;
};
exports.default = numberToChinese;
