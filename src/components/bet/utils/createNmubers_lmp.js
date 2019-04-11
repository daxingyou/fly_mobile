import { ssc_btnLabels, pk10_btnLabels } from '../createconfig/btn_lables.js';
var ball_num = {
	"b1": "第一球",
	"b2": "第二球",
	"b3": "第三球",
	"b4": "第四球",
	"b5": "第五球"
}
export function createNmubers_lmp(classId, showId) {
	if(classId == 3) {
		return ssc_groupList(showId)
	} else if(classId == 6) {
		return pk10_groupList(showId)
	}
}

function pk10_groupList(showId) {
	var numbers = [];
	var names, ids;
	switch(showId) {
		case 'plm':
			names = ["冠、亚军和", "冠军", "亚军", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", "第九名", "第十名"];
			ids = ["gyds", "p1_lhOrdxds", "p2_lhOrdxds", "p3_lhOrdxds", "p4_lhOrdxds", "p5_lhOrdxds", "p6_lhOrdxds", "p7_lhOrdxds", "p8_lhOrdxds", "p9_lhOrdxds", "p10_lhOrdxds"];
			ids.forEach((item1, index1) => {
				if(item1 == "gyds") {
					numbers[index1] = pk10_btnLabels[item1];
				} else {
					let keyNames = item1.split("_");
					let newsItems = []
					if(keyNames[1] == 'lhOrdxds') {
						let ary
						if(keyNames[0].split('p')[1] * 1 <= 5) {
							ary = pk10_btnLabels['lhOrdxds']
						} else {
							ary = pk10_btnLabels["dxds"]
						}
						ary.forEach((item2, index2) => {
							let obj = {};
							obj.name = item2.name
							obj.selected = item2.selected
							obj.key = item2.key
							obj.className = item2.className
							obj.key = obj.key.replace("%xx", keyNames[0])
							newsItems.push(obj)
						})
					}
					numbers[index1] = newsItems
				}
			})
			break;
		case '1T5':
			names = ["冠军", "亚军", "第三名", "第四名", "第五名"];
			ids = ["p1_pn", "p2_pn", "p3_pn", "p4_pn", "p5_pn"];
			ids.forEach((item1, index1) => {
				let keyNames = item1.split("_");
				let newsItems = []
				pk10_btnLabels[keyNames[1]].forEach((item2, index2) => {
					let obj = {};
					obj.name = item2.name
					obj.selected = item2.selected
					obj.key = item2.key
					obj.key = obj.key.replace("%xx", keyNames[0])
					obj.className = item2.className
					newsItems.push(obj)
				})

				numbers[index1] = newsItems

			})
			break;
		case '6T10':
			names = ["第六名", "第七名", "第八名", "第九名", "第十名"];
			ids = ["p6_pn", "p7_pn", "p8_pn", "p9_pn", "p10_pn"];
			ids.forEach((item1, index1) => {
				let keyNames = item1.split("_");
				let newsItems = []
				pk10_btnLabels[keyNames[1]].forEach((item2, index2) => {
					let obj = {};
					obj.name = item2.name
					obj.selected = item2.selected
					obj.key = item2.key
					obj.key = obj.key.replace("%xx", keyNames[0])
					obj.className = item2.className
					newsItems.push(obj)
				})

				numbers[index1] = newsItems

			})
			break;
		case '1T10':
			names = ["冠军", "亚军", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", "第九名", "第十名"];
			ids = ["p1_pn", "p2_pn", "p3_pn", "p4_pn", "p5_pn", "p6_pn", "p7_pn", "p8_pn", "p9_pn", "p10_pn"];
			ids.forEach((item1, index1) => {
				let keyNames = item1.split("_");
				let newsItems = []
				pk10_btnLabels[keyNames[1]].forEach((item2, index2) => {
					let obj = {};
					obj.name = item2.name
					obj.selected = item2.selected
					obj.key = item2.key
					obj.key = obj.key.replace("%xx", keyNames[0])
					obj.className = item2.className
					newsItems.push(obj)
				})

				numbers[index1] = newsItems

			})
			break;
		case 'gyzh':
			names = ["冠、亚军和"];
			ids = ["gyzh"];
			ids.forEach((item1, index1) => {
				let ary = pk10_btnLabels['gyds'].concat(pk10_btnLabels[item1])
				let newsItems = []
				ary.forEach((item2, index2) => {
					let obj = {};
					obj.name = item2.name
					obj.selected = item2.selected
					obj.key = item2.key
					obj.className = item2.className
					newsItems.push(obj)
				})
				numbers[index1] = newsItems
			})
			break;
		default:
			break;
	}
	return getNumbers(names, numbers)
}

function ssc_groupList(showId) {
	var numbers = [];
	var names, ids;
	switch(showId) {
		case 'lm':
			names = ["总和-龙虎和", "第一球", "第二球", "第三球", "第四球", "第五球"];
			ids = ["zh_lhh", "b1_dxds", "b2_dxds", "b3_dxds", "b4_dxds", "b5_dxds"];
			ids.forEach((item1, index1) => {
				if(item1 == "zh_lhh") {
					numbers[index1] = ssc_btnLabels[item1]
				} else {
					let keyNames = item1.split("_");
					let newsItems = []
						ssc_btnLabels[keyNames[1]].forEach((item2, index2) => {
							let obj = {};
							obj.name = item2.name
							obj.selected = item2.selected
							obj.key = item2.key
							obj.className = item2.className
							obj.key = obj.key.replace("%xx", keyNames[0])
							newsItems.push(obj)
						})
					
					numbers[index1] = newsItems
				}
			})
			break;
		
		case '1T5':
			names = ["第一球", "第二球", "第三球", "第四球", "第五球"];
			ids = ["b1_bn", "b2_bn", "b3_bn", "b4_bn", "b5_bn"];
			ids.forEach((item1, index1) => {
				let newsItems = [];
				let keyNames = item1.split("_");
				ssc_btnLabels[keyNames[1]].forEach((item2, index2) => {
						let obj = {};
						obj.name = item2.name
						obj.selected = item2.selected
						obj.key = item2.key
						obj.className = item2.className
						obj.key = obj.key.replace("%xx", keyNames[0])
						newsItems.push(obj)
					})
					numbers[index1] = newsItems
			})
			break;
		case 'qzh3':
			names = ["前三", "中三", "后三"];
			ids = ["ft3b_3b", "md3b_3b", "lt3b_3b"];
			ids.forEach((item1, index1) => {
				let newsItems = [];
				let keyNames = item1.split("_");
				ssc_btnLabels[keyNames[1]].forEach((item2, index2) => {
						let obj = {};
						obj.name = item2.name
						obj.selected = item2.selected
						obj.key = item2.key
						obj.className = item2.className
						obj.key = obj.key.replace("%xx", keyNames[0])
						newsItems.push(obj)
					})
					numbers[index1] = newsItems
			})
			break;
		default:
			break;
	}
	return getNumbers(names, numbers)
}

function getNumbers(names, numbers) {
	let ary = [];
	numbers.forEach((item1, index)=>{
		item1.forEach((item2)=>{
			item2.selected = false
		})
	})
	names.forEach((item, index) => {
		let obj = {};
		obj.title = item;
		obj.groups = numbers[index];
		ary.push(obj)
	})
	return ary
}