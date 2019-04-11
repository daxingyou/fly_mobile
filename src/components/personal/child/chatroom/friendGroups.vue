<template>
    <div id="friendGroups">
        <yd-navbar title="移至分组">
            <a @click="$router.go(-1)" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </a>
        </yd-navbar>
        <div class="container">
            <yd-cell-group v-if="friendGroup.length!==0" title="分组">
                <yd-cell-item type="radio" v-for="(item,index) of friendGroup" :key="index">
                    <span slot="left">{{item.name}}</span>
                    <input slot="right" type="radio" :value="item.friendGroupId" v-model="picked" />
                </yd-cell-item>
                
            </yd-cell-group>
            <section v-else>
              暂无分组
            </section>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      picked: "",
      friendAccount: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions("chart", [
      "queryFriendGroup",
      "addFriendToFriendeGroup",
      "searchFriendGroupByFriendAccount"
    ]),
    init() {
      this.friendAccount = this.$route.query.friendAccount;
      this.queryFriendGroup(`/${this.userDetails.account}`);
      this.searchFriendGroupByFriendAccount({
        account: this.userDetails.account,
        friendAccount: this.friendAccount
      }).then(res => {
        if (res[0].friendGroupId) {
          this.picked = res[0].friendGroupId;
        } else {
          this.picked = 0;
        }
      });
    }
  },
  computed: {
    ...mapState("chart", ["friendGroup"]),
    ...mapState("login", ["userDetails"])
  },
  watch: {
    picked(newValue, oldValue) {
      if (oldValue !== "") {
        this.addFriendToFriendeGroup({
          account: this.userDetails.account,
          friendAccount: this.friendAccount,
          friendGroupId: newValue
        }).then(res => {
          if (res.code === 0) {
            this.$dialog.notify({
              mes: "移动好友分组成功！",
              timeout: 1000,
              callback: () => {
                this.$router.go(-1);
              }
            });
          } else {
            this.$dialog.toast({ mes: res.msg, timeout: 1000 });
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
@import url("../../../../../static/css/common.less");
#friendGroups {
  .init;
  padding-bottom: 0;
  .container {
    padding-top: 0.2rem;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
     section{
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #c4c4c4;
    &:before{
      content:'';
      display:block;
      width: 1rem;
      height: 1px;
      background:#c4c4c4
    }
    &:after{
      content:'';
      display:block;
      width: 1rem;
      height: 1px;
      background:#c4c4c4
    }
  }
  }
}
</style>
