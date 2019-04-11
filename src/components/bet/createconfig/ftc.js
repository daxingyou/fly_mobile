/**
 * danshi 单式 
 * fushi 复式
 * other 其他按钮形式的，但左侧不是万千百这些的
 */
const FTCBetNumbersConfig = {
    fushi: {
        "100101": true, // 定位胆
        "100201": true, // 前二直选
        "100202": true, // 后二直选
        "100301": true, // 三星直选 复试
    },
    other: {
        "100203": true, // 前二组选
        "100204": true, // 后二组选
        "100303": true, // 三星直选 和值
        "100401": true, // 三星组选 组三
        "100402": true, // 三星组选 组六
        "100403": true, // 三星组选 和值
        "100501": true, // 大小单双 前二
        "100502": true, // 大小单双 后二
        "100601": true, // 一码不定位
        "100602": true, // 二码不定位
    },
    danshi: {
        "100302": true, // 三星直选 单式
    }
}

export default FTCBetNumbersConfig