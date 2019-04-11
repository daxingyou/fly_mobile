<template>
	<div class="jfxVPi nn-wrapper">
		<div class="sc-hSdWYo pWWRo" style="font-size: 0.2rem;">
			<h1 style="text-align: center; margin: 0px auto 0.6em;">极速牛牛规则</h1>
			<ol datatype="1" class="type-none">
				<li>
					<span class="red title">1. 游戏规则说明</span>
					<br> 极速牛牛由极速赛车官方开奖结果演变而成的一款公平公正的牛牛游戏，公正之处为先开牌后开奖杜绝一切作假嫌疑。全天开奖1104期，每75秒一期，每天由06:59:15—05:59:15（北京时间）。
				</li>
				<li>
					<span class="red title">2. 发牌规则</span>
					<br> 由于极速赛车官方开奖号为1到10号不重复的10个数字，所以开奖号和发牌数可以相对应。发牌从左到右依次1/2/3/4/5/6/7/8/9/10号位牌，依次取五张牌分给庄家和闲家作为开奖牌。
					<br> 庄： 取1～5号位牌
					<br> 闲一：取2～6号位牌
					<br> 闲二：取3～7号位牌
					<br> 闲三：取4～8号位牌
					<br> 闲四：取5～9号位牌
					<br> 闲五：取6～10号位牌
					<p>例如：</p>
					<p>
						极速赛车官方开奖号为： 1 5 7 9 4 3 2 6 8 10
						<br> 庄： 1 5 7 9 4
						<br> 闲一： 5 7 9 4 3
						<br> 闲二： 7 9 4 3 2
						<br> 闲三： 9 4 3 2 6
						<br> 闲四： 4 3 2 6 8
						<br> 闲五： 3 2 6 8 10
					</p>
				</li>
				<li>
					<span class="red title">3. 大小比较</span>
					<br>
					<p>牛牛 &gt; 牛九 &gt; 牛八 &gt; 牛七 &gt; 牛六 &gt; 牛五 &gt; 牛四 &gt; 牛三 &gt; 牛二 &gt; 牛一 &gt; 无牛</p>
					<p>扑克牌依次大小为：10 &gt; 9 &gt; 8 &gt; 7 &gt; 6 &gt; 5 &gt; 4 &gt; 3 &gt; 2 &gt; A</p>
					<p class="red">注：当庄家与闲家牛型相同时，比为首第一张牌点数大小定输赢（例如：庄家：15462牛八，闲家：46297牛八，4比1大，闲家赢）。</p>
				</li>
				<li>
					<span class="red title">4. 牌型介绍</span>
					<br>
					<table class="table">
						<thead>
							<tr>
								<th colspan="2">牌型介绍</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style="width: 30%">
									无牛
								</td>
								<td>
									五个球中的任意3个球不能成为10的倍数
								</td>
							</tr>
							<tr>
								<td>牛一至牛六</td>
								<td rowspan="3">五个球中的任意3个球相加能成10的倍数，另外两张相加的点数为牛几</td>
							</tr>
							<tr>
								<td>牛七至牛八</td>
							</tr>
							<tr>
								<td>牛九</td>
							</tr>
							<tr>
								<td>牛牛</td>
								<td>五个球中的任意3个球相加能成10的倍数，另外两张相加的点数也是10点</td>
							</tr>
						</tbody>
					</table>
				</li>
				<li>
					<span class="red title">5. 翻倍介绍</span>
					<br>
					<p>下注金额会暂时冻结下注金额的4倍加本金，开奖后连本带利一并返还。</p>
					<p>闲赢上方会有“赢”标志，输则不会显示。</p>
					<p>例如玩家下注1元，冻结4元，下注总金额为5元。如果庄家（牛六及以下）赢，返还4元，庄家（牛七、牛八）赢，返还3元；庄家（牛九）赢，返还2元；庄家（牛牛）赢，不返还。</p>
					<p></p>
				</li>
				<li>
					<span class="red title">6. 翻倍投注与派彩范例</span>
					<br>
					<p>例1</p>
					<table class="table">
						<tbody>
							<tr>
								<th style="width: 30%">
									条件
								</th>
								<td colspan="2">
									玩家于“闲二”门中押注 100
								</td>
							</tr>
							<tr>
								<th>
									可用余额
								</th>
								<td colspan="2">
									冻结500
								</td>
							</tr>
							<tr>
								<th>
									比牌结果
								</th>
								<td>
									庄家持牌：牛7
								</td>
								<td>
									“闲二”门持牌：牛5
								</td>
							</tr>
							<tr>
								<th>
									派彩
								</th>
								<td>
									返还300
								</td>
								<td>
									输赢：-200
								</td>
							</tr>
						</tbody>
					</table>
					<p>例2</p>
					<table class="table">
						<tbody>
							<tr>
								<th style="width: 30%">
									条件
								</th>
								<td colspan="2">
									玩家于“闲二”门中押注 100
								</td>
							</tr>
							<tr>
								<th>
									可用余额
								</th>
								<td colspan="2">
									冻结500
								</td>
							</tr>
							<tr>
								<th>
									比牌结果
								</th>
								<td>
									庄家持牌：牛8
								</td>
								<td>
									“闲二”门持牌：牛牛
								</td>
							</tr>
							<tr>
								<th>
									派彩
								</th>
								<td>
									返还500
								</td>
								<td>
									输赢：+500
								</td>
							</tr>
						</tbody>
					</table>
				</li>
			</ol>
			<div class="divider"></div>
			<h1>例牌举例说明:</h1>
			<div class="help_card">
				<h5>1. 无牛</h5>
				<p>结果：五个球中的任意3个球不能成为10的倍数，派彩1:2。</p>
				<img src="../n0.png">
			</div>
			<div class="help_card">
				<h5>2. 牛一至牛六</h5>
				<p>结果：五个球中的任意3个球相加能成10的倍数，另外两张相加的点数为牛几，派彩1:2。</p>
				<img src="../n16.png">
			</div>
			<div class="help_card">
				<h5>3. 牛七至牛八</h5>
				<p>结果：五个球中的任意3个球相加能成10的倍数，另外两张相加的点数为牛几，派彩1:3。</p>
				<img src="../n78.png">
			</div>
			<div class="help_card">
				<h5>4. 牛九</h5>
				<p>结果：五个球中的任意3个球相加能成10的倍数，另外两张相加的点数为牛九，派彩1:4。</p>
				<img src="../n9.png">
			</div>
			<div class="help_card">
				<h5>5. 牛牛</h5>
				<p>结果：五个球中的任意3个球相加能成10的倍数，另外两张相加的点数也是10点，派彩1:6。</p>
				<img src="../n10.png">
			</div>
		</div>
		<button class="sc-hSdWYo iOOiHt" @click="$emit('closeHelp')"></button>
	</div>
</template>

<script>
</script>

<style>
	.jfxVPi {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		background-color: rgb(0, 0, 0);
		color: white;
		z-index: 30;
		box-sizing: border-box;
		transform: unset;
		overflow: auto;
		padding: 4vw;
		margin: auto;
		border-radius: 0px;
	}
	
	.iOOiHt {
		position: fixed;
		right: auto;
		left: 0px;
		top: 0px;
		height: 30px;
		width: 30px;
		border-width: initial;
		border-style: none;
		border-color: initial;
		border-image: initial;
		padding: 25px;
		border-radius: 0px 0px 50%;
		background: url(../back.png) center center / 40% no-repeat rgba(0, 0, 0, 0.5);
	}
	
	.nn-wrapper {
		color: #fff;
		font-size: 0.825rem;
		padding: 4vw;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	
	.nn-wrapper .red {
		color: #ff4e4e;
	}
	
	.nn-wrapper h1 {
		font-size: 0.32rem;
	}
	
	.nn-wrapper ol {
		padding-left: 0.3rem;
		font-size: 0.28rem;
	}
	
	.nn-wrapper ol.type-none li {
		list-style-type: none;
	}
	
	.nn-wrapper ol.type-none li .title {
		margin-left: -1em;
	}
	
	.nn-wrapper ol li {
		padding-bottom: 8px;
	}
	
	.nn-wrapper .bold {
		font-weight: bold;
	}
	
	.nn-wrapper .divider {
		margin: 1rem 0;
		border-bottom: 1px solid #707070;
	}
	
	.nn-wrapper .table {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid #707070;
	}
	
	.nn-wrapper .table thead {
		border-bottom: 1px solid #707070;
	}
	
	.nn-wrapper .table thead tr:not(:last-child) {
		border-bottom: 1px solid #707070;
	}
	
	.nn-wrapper .table tr th {
		background-color: #222;
		color: #9e9e9e;
		padding: 4px 6px;
	}
	
	.nn-wrapper .table tr th:not(:last-child) {
		border-right: 1px solid #707070;
	}
	
	.nn-wrapper .table thead.no-bg {
		border: 0;
	}
	
	.nn-wrapper .table thead.no-bg tr {
		border-bottom: 1px solid #707070;
	}
	
	.nn-wrapper .table thead.no-bg tr th {
		border-right: 0;
		background-color: transparent;
		color: #9e9e9e;
		text-align: left;
	}
	
	.nn-wrapper .table tbody tr {
		border-bottom: 1px solid #707070;
		vertical-align: middle;
	}
	
	.nn-wrapper .table tbody tr.green {
		background-color: rgba(39, 201, 137, 0.2);
	}
	
	.nn-wrapper .table tbody tr.red {
		background-color: rgba(255, 0, 0, 0.2);
	}
	
	.nn-wrapper .table tbody tr td {
		padding: 4px 6px;
		border-left: 1px solid #707070;
		border-right: 1px solid #707070;
	}
	
	.nn-wrapper .table tbody tr td:not(:only-child):last-child {
		border-left: 0;
	}
	
	.nn-wrapper .help_card {
		width: 100%;
		border: 1px solid #999;
		margin-bottom: 16px;
		text-align: center;
		border-radius: 16px;
	}
	
	.nn-wrapper .help_card h5 {
		font-size: 0.32rem;
		margin: 0.1rem;
	}
	
	.nn-wrapper .help_card p {
		font-size: 0.24rem;
		margin: 0.1rem;
		padding: 0 15%;
	}
	
	.nn-wrapper .help_card img {
		width: 60%;
		margin-bottom: 8px;
	}
</style>