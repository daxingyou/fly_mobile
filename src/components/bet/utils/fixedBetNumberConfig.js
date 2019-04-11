/**
 * 每个号有对应的注数是固定的
 */
const fixedBetArray1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
const fixedBetArray2 = [10, 18, 16, 14, 12, 10, 8, 6, 4, 2]
const fixedBetArray3 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 1, 1]
const fixedBetArray4 = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1]
const fixedBetArray5 = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1]
const fixedBetArray6 = [10, 54, 96, 126, 144, 150, 144, 126, 96, 54]
const plusAndCrossValueArray = {
    "100303": fixedBetArray4, // 三星直选 和值
    "300203": fixedBetArray1,  // 前二直选 和值
    "300204": fixedBetArray2,  // 前二直选 跨度
    "300207": fixedBetArray1,  // 后二直选 和值
    "300208": fixedBetArray2, // 后二直选 跨度
    "300211": fixedBetArray3,  // 前二组选 和值
    "300215": fixedBetArray3, // 后二组选 和值
    "300303": fixedBetArray4,  // 前三直选 和值
    "100403": fixedBetArray5, // 三星组选 和值
    "300304": fixedBetArray6,  // 前三直选 跨度
    "300309": fixedBetArray5,  // 前三组选 组选和值
    "300403": fixedBetArray4,  // 中三直选 和值
    "300404": fixedBetArray6,  // 中三直选 跨度
    "300409": fixedBetArray5,  // 中三组选 组选和值
    "300503": fixedBetArray4, // 后三直选 和值
    "300504": fixedBetArray6,  // 后三直选 跨度
    "300509": fixedBetArray5,  // 后三组选 组选和值
    "301003": fixedBetArray1,  // 任二直选 和值
    "301006": fixedBetArray3,  // 任二组选 和值
    "301103": fixedBetArray4,  // 任三直选 和值
    "301109": fixedBetArray5,  // 任三组选 组选和值
}

const baodanFixedValue = {
    "300212": 9, 
    "300216": 9, 
    "300310": 54, 
    "300410": 54, 
    "300510": 54
}
const fixedBetNumberConfig = {
    plusAndCrossValueArray, 
    baodanFixedValue
}

export default fixedBetNumberConfig