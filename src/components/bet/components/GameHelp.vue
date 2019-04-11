<template>
	<yd-popup v-model="$parent.showHelp" position="center" width="90%" class="show-help">
			<div>
				<div style="padding: 0.2rem;background-color:#fff;color: #000000;display: flex;border-radius: 4px 4px 0 0;height: .6rem;align-items: center;line-height: .6rem;justify-content: space-between;">
					<div style="text-align: left;font-size: 16px;">
						玩法说明
					</div>
					<img style="width:.3rem;height: 0.3rem;" @click="$parent.showHelp=false" src="../../../../static/img/img_delete.png" />
				</div>
				<div style="background: #FFFFFF;padding: 0.2rem;font-size: 12px;">
					{{betRates[0].gameTip}}
				</div>
				<div style="background: #FFFFFF;padding: 0.2rem;font-size: 12px;border-radius: 0 0 4px 4px">
					<div>{{betRates[0].gameCase}}</div>
				</div>

			</div>
			<div>
			</div>
	</yd-popup>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("bet", ["betRates"])
  },
};
</script>

<style lang="less">

</style>