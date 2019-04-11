import calcBetCountConfig from './calcBetCountConfig';
import SSCBetNumbersConfig from '../createconfig/ssc';
import LHCBetNumbersConfig from '../createconfig/lhc';
import SSCList from '../gamelist/ssc';
import { Toast } from 'vue-ydui/dist/lib.rem/dialog'; 
const normalChooseNumber = ({
	betNumbers,
	rowIndex,
	colIndex
}) => {
	let newBetNumbers = { ...betNumbers
	}
	const {
		subGameId,
		dantuoMax
	} = betNumbers
	let selectedNumber = newBetNumbers.numbers[rowIndex].cols[colIndex]
	let beforeStatus = selectedNumber.selected
	selectedNumber.selectedTime = Date.now()
	// 包胆完全互斥
	if(SSCBetNumbersConfig.fullInverse[subGameId]) {
		newBetNumbers.numbers[rowIndex].cols.forEach((item) => item.selected = false)
	}
	
	// 六合彩合肖，选号个数存在限制
	if(subGameId.substr(0, 4) === '2010'&&!selectedNumber.selected) {
		let selCount = 1,
		    maxCount = Number(subGameId.substr(4));
		
		newBetNumbers.numbers.forEach((row,rowIndex)=>{
			if(row.cols[0].selected){
				selCount++
			}
		})
		if(selCount>maxCount){
			Toast({
                    mes: `最多只能选取${maxCount}个号码`,
                    timeout: 1500
                });
		}else{
			selectedNumber.selected = !beforeStatus
		}
	}else{
		selectedNumber.selected = !beforeStatus
	}
	
	// 胆拖
	if(calcBetCountConfig.dantuo[subGameId]) {
		if(selectedNumber.selected) {
			newBetNumbers.numbers[1 - rowIndex].cols[colIndex].selected = false
			newBetNumbers.numbers[1 - rowIndex].cols[colIndex].selectedTime = undefined
			if(rowIndex === 0) {
				let oldestSelected = Date.now() * 10,
					oldestIndex = -1,
					selecteds = 0
				newBetNumbers.numbers[rowIndex].cols.forEach((item, index) => {
					if(item.selected) selecteds++
						if(item.selectedTime && item.selectedTime < oldestSelected) {
							oldestSelected = item.selectedTime
							oldestIndex = index
						}
				})
				if(selecteds > dantuoMax - 1) {
					newBetNumbers.numbers[0].cols[oldestIndex].selected = false
					newBetNumbers.numbers[0].cols[oldestIndex].selectedTime = undefined
				}
			}
		}
	}
	// 如果是两面盘，存在互斥
	if(SSCList[subGameId] && subGameId.substr(2, 2) === '14' && selectedNumber.inverse !== undefined) {
		let inverseNumber = newBetNumbers.numbers[rowIndex].cols[selectedNumber.inverse]
		if(selectedNumber.selected && inverseNumber) {
			inverseNumber.selected = false
		}
	}
	
	// 六合彩两面盘类玩法，存在互斥
	if((LHCBetNumbersConfig.teliangmian[subGameId] || LHCBetNumbersConfig.zmlm[subGameId]) && selectedNumber.inverse !== undefined) {
		if(LHCBetNumbersConfig.zmlm[subGameId] && rowIndex !== 0) {
            selectedNumber.inverse.forEach((item)=>{
            	let inverseNumber = newBetNumbers.numbers[item].cols[0]
            	if(selectedNumber.selected && inverseNumber) {
				     inverseNumber.selected = false
			    }
            })
		} else {
			let inverseNumber = newBetNumbers.numbers[rowIndex].cols[selectedNumber.inverse]
			if(selectedNumber.selected && inverseNumber) {
				inverseNumber.selected = false
			}
		}

	}
	return newBetNumbers
}

export default normalChooseNumber