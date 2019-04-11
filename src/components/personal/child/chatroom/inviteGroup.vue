<template>
  <div id="inviteGroup">
    <yd-navbar title="邀请新成员">
      <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    <div class="container">
      <yd-accordion>
        <yd-accordion-item @click.native="queryFriendOfGroup('')" title="我的好友">
          <yd-infinitescroll :callback="loadList('')" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
              <yd-list-item v-for="(item,index) in inviteFriend" :key="index">
                <yd-list-other slot="other">
                  <yd-cell-group>
                    <yd-cell-item :data-Ingroup="item.Ingroup" type="checkbox" ref="Input">
                      <div slot="left" class="person">
                        <!-- <img style="width:.7rem;margin-right:.2rem;" src="../../../../../static/img/chartroom/member.png" alt=""> -->
                        <div v-if="!item.accountProperties||item.accountProperties==='1'" id="_img" :class="'sprite-icon-'+item.icon" alt=""></div>
                        <img v-else src="../../../../../static/img/chartroom/customService.png" alt="">
                        <span>{{item.nickName}}</span>
                      </div>
                      <input v-if="item.Ingroup!=='1'" slot="right" type="checkbox" :value="item.friendAccount" v-model="checkedNames" />
                      <input v-else slot="right" disabled type="checkbox" :checked='confirm'>
                    </yd-cell-item>
                  </yd-cell-group>
                </yd-list-other>
              </yd-list-item>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
          </yd-infinitescroll>

        </yd-accordion-item>

        <yd-accordion-item @click.native="queryFriendOfGroup(item.friendGroupId)" :title="item.name" v-for="(item,index) of friendGroup" :key="index">
          <yd-infinitescroll :callback="loadList(item.friendGroupId)" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
              <yd-list-item v-for="(item,index) in inviteFriend" :key="index">
                <yd-list-other slot="other">
                  <yd-cell-group>
                    <yd-cell-item :data-Ingroup="item.Ingroup" type="checkbox" ref="Input">
                      <div slot="left" class="person">
                        <!-- <img style="width:.7rem;margin-right:.2rem;" src="../../../../../static/img/chartroom/member.png" alt=""> -->
                        <div v-if="!item.accountProperties||item.accountProperties==='1'" id="_img" :class="'sprite-icon-'+item.icon" alt=""></div>
                        <img v-else src="../../../../../static/img/chartroom/customService.png" alt="">
                        <span>{{item.nickName}}</span>
                      </div>
                      <input v-if="item.Ingroup!=='1'" slot="right" type="checkbox" :value="item.friendAccount" v-model="checkedNames" />
                      <input v-else slot="right" disabled type="checkbox" :checked='confirm'>
                    </yd-cell-item>
                  </yd-cell-group>
                </yd-list-other>
              </yd-list-item>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
          </yd-infinitescroll>

        </yd-accordion-item>
      </yd-accordion>
    </div>
    <div class="footer">
      <Box v-if="checkedNames.length!==0" @click.native="invite" width="100%" height=".8rem" backgroundColor="#d91d36" colorEffect="#a52c3c">
        <span>立即邀请</span>
      </Box>
      <Box v-else width="100%" height=".8rem" backgroundColor="#ddd" colorEffect="#ddd">
        <span>立即邀请</span>
      </Box>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import Box from "../../../common/box.vue";
export default {
  data() {
    return {
      checkedNames: [],
      confirm: false,
      allPages: "",
      page: 1
    };
  },
  created() {
    // this.queryFriend({}).then(() => {
    //   this.queryGroupFriend({
    //     groupId: String(this.$route.query.groupId)
    //   }).then(res => {
    //     console.log(this.inviteFriend);
    //     //好友在群内时默认选中
    //     this.$nextTick(() => {
    //       this.confirm = true;
    //     });
    //   });
    // });
    this.init();
  },
  mounted() {},
  methods: {
    ...mapActions("chart", [
      "queryFriend",
      "inviteGroup",
      "queryGroupFriend",
      "queryGroup",
      "queryFriendGroup"
    ]),
    init() {
      this.queryFriendGroup(`/${this.userDetails.account}`).then(res => {
        for (let item of res) {
          this.allGroupFriends += item.cont;
        }
        this.queryGroupFriend({
          groupId: String(this.$route.query.groupId)
        }).then(() => {
          console.log(this.inviteFriend);
          this.$nextTick(() => {
            this.confirm = true;
          });
        });
      });
    },
    invite() {
      this.inviteGroup({
        accountList: this.checkedNames,
        groupId: String(this.$route.query.groupId)
      }).then(res => {
        if (res.code === 0) {
          this.$dialog.toast({
            mes: "发送成功",
            timeout: 1000,
            callback: () => {
              this.$router.go(-1);
            }
          });
        } else if (res.code === 111) {
          this.$dialog.toast({ mes: res.msg, timeout: 1000 });
        }
      });
    },
    searchFriends(page, id) {
      return new Promise((resolve, reject) => {
        this.queryFriend({
          page: page,
          showRows: "10",
          friendGroupId: id
        }).then(res => {
          if (id === "") {
            this.friendsCounts = res.count;
          }
          if (page === 1) {
            this.friendsList = [...res.list];
          } else {
            this.friendsList = [...this.friendsList, ...res.list];
          }
          this.allPages = Math.ceil(res.count / 10);
          resolve(res);
        });
      });
    },
    queryFriendOfGroup(id) {
      this.page = 1;
      this.$nextTick(function() {
        this.searchFriends(this.page, id);
      });
    },
    loadList(id) {
      return id => {
        this.page += 1;
        if (this.page > this.allPages) {
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
        } else {
          this.searchFriends(this.page, id);
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
        }
      };
    }
  },
  components: {
    Box
  },
  computed: {
    ...mapState("chart", ["friends", "friendGroup"]),
    ...mapGetters("chart", ["inviteFriend"]),
    ...mapState("login", ["userDetails"])
  },
  watch: {
    checkedNames() {
      console.log(this.checkedNames);
    }
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#inviteGroup {
  .init;
  .container {
    height: 100%;
    overflow: auto;
    .yd-cell-left {
      .person {
        .my-display(center, center);
        img,
        #_img {
          width: 0.9rem;
          height: 0.9rem;
          margin-right: 0.2rem;
        }
        .personal_img2;
        #_img {
          background-size: cover;
          background-image: url(../../../../../static/img/sprite.png);
        }
      }
    }
    .yd-cell-item[data-ingroup="1"] {
      .yd-cell-checkbox-icon:after {
        color: #d9d9d9;
      }
    }
    & > div {
      // height: 100%;
      .yd-list-loading {
        display: none;
      }
      .yd-list {
        //  height: 100%;
        .yd-list-item {
          width: auto;
          height: auto;
          float: none;
          margin: 0;
          padding: 0;
          display: block;
          .yd-list-img {
            width: 0;
            height: 0;
            padding: 0;
          }
          .yd-list-mes {
            padding: 0;
            .yd-list-title {
              height: 0;
            }
            .yd-list-other {
              display: block;
              color: #000;
            }
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 1rem;
    padding: 0 0.3rem;
    position: fixed;
    bottom: 0;
    background: #d1d1d1;
    .my-display(center, center);
    #_Box {
      border-radius: 4px;
      .my-display(center, center);
      color: #fff;
    }
  }
}
</style>


