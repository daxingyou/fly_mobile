<template>
	<div class="bet-input">
		<p style="height:0.6rem;line-height:0.6rem;color:red;font-size:0.24rem;text-align: center;">{{errMsg}}</p>
        <textarea v-model="inputText" @input="calcInputBetCount"></textarea>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { bus } from "../utils/bus";
export default {
  data() {
    return {
      inputText: ""
    };
  },
  computed: {
    ...mapState("bet", ["errMsg"])
  },
  created() {
    bus.$on("calcInputText",()=>{
      this.inputText = "";
    });
  },
  methods: {
    ...mapMutations("bet", ["CHOOSE_INPUT_BETNUMBER"]),
    calcInputBetCount() {
      this.CHOOSE_INPUT_BETNUMBER(this.inputText);
    }
  }
};
</script>

<style lang="less">
.bet-input {
  padding: 0.2rem;
  textarea {
    width: 100%;
    height: 5.5rem;
    border-radius: 0.08rem;
    outline: 0;
    -webkit-appearance: none;
  }
}
</style>