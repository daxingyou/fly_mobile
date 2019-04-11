<template>
  <div id="friendGroupManage">
    <yd-navbar title="分组管理">
      <a @click="$router.go(-1)" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </a>
    </yd-navbar>
    <div class="container">
      <yd-cell-group>
        <yd-cell-item arrow @click.native="show=true">
          <!-- <yd-icon slot="icon" name="order" size=".42rem"></yd-icon> -->
          <i class="fa fa-plus-square-o" slot="icon" style="font-size:.42rem"></i>
          <span slot="left">添加分组</span>
        </yd-cell-item>
        <yd-cell-item type="radio" v-for="(item,index) of friendGroup" :key="index">
          <span slot="left">{{item.name}}</span>
          <input slot="right" type="radio" :value="index" v-model="checkedIndex" />
        </yd-cell-item>
      </yd-cell-group>

    </div>
    <div class="footer">
      <Box @click.native="deleteGroup" width="3.5rem" height=".8rem" backgroundColor="#fff" colorEffect="#d3d3d3">
        <span style="color:#000">删除分组</span>
      </Box>
    </div>

    <yd-popup v-model="show" position="center" width="80%">
      <div class="main">
        <p class="setRemark">分组名</p>
        <yd-input required v-model="groupName" max="20" placeholder="请输入分组名"></yd-input>
        <Box @click.native="addFriendGroup" height="1rem" backgroundColor="#d91d36" colorEffect="#a52c3c" style="color:#fff">提交</Box>
      </div>
    </yd-popup>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import Box from "../../../common/box.vue";
export default {
  data() {
    return {
      show: false,
      groupName: "",
      checkedIndex: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions("chart", [
      "saveFriendGroup",
      "queryFriendGroup",
      "delFriendGroup"
    ]),
    init() {
      this.queryFriendGroup(`/${this.userDetails.account}`);
    },
    //添加分组
    addFriendGroup() {
      if (this.groupName !== "") {
        this.saveFriendGroup({
          account: this.userDetails.account,
          name: this.groupName
        }).then(res => {
          if (res.code === 0) {
            this.$dialog.toast({
              mes: "添加成功",
              timeout: 1000,
              callback: () => {
                this.show = false;
                this.queryFriendGroup(`/${this.userDetails.account}`);
              }
            });
          } else {
            this.$dialog.toast({ mes: res.msg, timeout: 1000 });
          }
        });
      } else {
        this.$dialog.toast({ mes: "请输入分组名", timeout: 1000 });
      }
    },
    deleteGroup() {
      if (this.checkedIndex === "") {
        this.$dialog.toast({ mes: "请选择分组", timeout: 1000 });
      } else {
        this.$dialog.confirm({
          title: "删除分组",
          mes: "删除该分组后，组内联系人将移至默认分组。",
          opts: () => {
            this.delFriendGroup({
              account: this.userDetails.account,
              name: this.friendGroup[this.checkedIndex].name,
              type: "1",
              friendGroupId: this.friendGroup[this.checkedIndex].friendGroupId
            }).then(res => {
              if (res.code === 0) {
                this.$dialog.toast({
                  mes: "删除成功",
                  timeout: 1000,
                  callback: () => {
                    this.checkedIndex = "";
                    this.queryFriendGroup(`/${this.userDetails.account}`);
                  }
                });
              } else {
                this.$dialog.toast({ mes: res.msg, timeout: 1000 });
              }
            });
          }
        });
      }
    }
  },
  components: {
    Box
  },
  computed: {
    ...mapState("chart", ["friendGroup"]),
    ...mapState("login", ["userDetails"])
  }
};
</script>

<style  lang="less">
@import url("../../../../../static/css/common.less");
#friendGroupManage {
  .init;
  .container {
    .my-container;
    padding: 0;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .footer {
    height: 1rem;
    background: #d1d1d1;
    .my-display(center, center);
    #_Box {
      .my-display(center, center);
      border-radius: 4px;
      span {
        color: #fff;
      }
    }
  }
  #_Box {
    .my-display(center, center);
    p {
      width: 100%;
      padding: 0 0.3rem;
      .my-display(none, center);
      .text {
        margin-left: 0.3rem;
        color: #525252;
      }
    }
  }
  .main {
    background-color: #fff;
    padding: 0.2rem 0.3rem;
    .setRemark {
      margin-bottom: 0.3rem;
    }
    #_Box {
      margin-top: 0.3rem;
    }
  }
  .main {
    background-color: #fff;
    padding: 0.2rem 0.3rem;
    .setRemark {
      margin-bottom: 0.3rem;
    }
    #_Box {
      .my-display(center, center);
      margin-top: 0.3rem;
    }
  }
}
</style>
