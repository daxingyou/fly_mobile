<template>
	<div class="dEXenv">
	<div class="sc-iAyFgw hkMGEq" >
		<h1 style="text-align: center;">牌型{{gameType=='nns'?'平倍':'翻倍'}}赔率介绍</h1>
		<table class="table">
			<thead class="no-bg">
				<tr>
					<th style="width: 30%;">牌型</th>
					<th style="width: 20%; text-align: center;">赔率</th>
					<th>牌型介绍</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>⽆⽜</td>
					<td style="text-align: center;">1:{{odds[0]}}</td>
					<td>五个球中的任意3个球不能成为10的倍数</td>
				</tr>
				<tr>
					<td>
						<div>⽜⼀⾄⽜六</div>
						<div>牛七至牛八</div>
						<div>⽜九</div>
					</td>
					<td style="text-align: center;" v-if="gameType=='nns'">
						<div>1:{{odds[1]}}</div>
					</td>
					<td style="text-align: center;" v-else>
						<div>1:{{odds[1]}}</div>
						<div>1:{{odds[2]}}</div>
						<div>1:{{odds[3]}}</div>
					</td>
					<td>五个球中的任意3个球相加能成10的倍数，另外两张相加的点数为牛几</td>
				</tr>
				<tr>
					<td>⽜⽜</td>
					<td style="text-align: center;" v-if="gameType=='nns'">1:{{odds[2]}}</td>
					<td style="text-align: center;" v-else>1:{{odds[4]}}</td>
					<td>五个球中的任意3个球相加能成10的倍数，另外两张相加的点数也是10点</td>
				</tr>
			</tbody>
		</table>
		<button class="sc-hSdWYo hvhtbN" @click="$emit('close')"></button>
		<p>下注金额会暂时冻结下注金额的4倍加本金，开奖后连本带利一并返还。</p>
		<p>例如玩家下注1元，冻结4元，下注总金额为5元。如果庄家（牛六及以下）赢，返还4元，庄家（牛七、牛八）赢，返还3元；庄家（牛九）赢，返还2元；庄家（牛牛）赢，不返还。</p>
		<p class="red">注：当庄家与闲家牛型相同时，比为首第一张牌点数大小定输赢（例如：庄家：15462牛八，闲家：46297牛八，4比1大，闲家赢）。</p>
	</div>
	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	export default {
		props:['kindId','gameType'],
		data(){
			return {
				odds:[],
			}
		},
		created(){
			this.getSubGames({gameIds: [this.gameType]}).then((res)=>{
				this.odds = res.data[0].oddMax.split(",");
			})
		},
		methods: {
			...mapActions('bet', [
				'getSubGames'
			]),
		}
	}
</script>

<style>
.hkMGEq {
    color: rgb(255, 255, 255);
    font-size: 3.2vw;
    position: relative;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    padding: 4vw;
}
.hkMGEq .table thead {
    border-width: 1px;
    border-style: solid;
    border-color: rgb(112, 112, 112);
    border-image: initial;
}
.hkMGEq .table thead.no-bg {
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
}
.hkMGEq .table tbody tr {
    vertical-align: top;
    border-bottom: 1px solid rgb(112, 112, 112);
}
.hkMGEq .table tbody tr td {
    padding: 4px 6px;
}
.hkMGEq h1 {
    font-size: 5vw;
}
.hkMGEq .table {
    width: 100%;
    border-collapse: collapse;
}
.hkMGEq .red {
    color: rgb(219, 0, 1);
}
.hvhtbN {
    position: absolute;
    right: 0px;
    left: auto;
    top: 0px;
    height: 30px;
    width: 30px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    padding: 25px;
    border-radius: 0px 0px 50%;
    background: url(../cuo.png) center center / 40% no-repeat;
}
.dEXenv {
    position: fixed;
    width: 85%;
    height: auto;
    top: 50%;
    right: 0px;
    bottom: initial;
    left: 0px;
    background-color: rgb(0, 0, 0);
    color: white;
    z-index: 30;
    box-sizing: border-box;
    transform: translateY(-50%);
    overflow: auto;
    padding: 0px;
    margin: auto;
    border-radius: 10px;
}
</style>