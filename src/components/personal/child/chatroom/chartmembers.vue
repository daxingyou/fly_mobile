<template>
  <div id="chartmembers">
    <yd-cell-item arrow type="link" href="/newFriends">
      <span slot="left">新朋友
      </span>
      <span slot="right">
        <yd-badge bgcolor="rgb(235, 0, 4)" v-show="applyRecord.length!==0">{{applyRecord.length>99?'99+':applyRecord.length}}</yd-badge>
      </span>
    </yd-cell-item>
    <yd-cell-item arrow @click.native="$router.push('/friendGroupManage')">
      <span slot="left">分组管理
      </span>
    </yd-cell-item>
    <yd-tab v-model="tab1" active-color="#d91d36">
      <yd-tab-panel :label="'好友  '+(allGroupFriends+friendsCounts)">
        <div class="container">
          <yd-accordion>
            <yd-accordion-item @click.native="queryFriendOfGroup('')" :title="'我的好友 '+friendsCounts">
              <yd-infinitescroll :callback="loadList()" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                  <yd-list-item v-for="(item,index) in friendsList" :key="index">
                    <yd-list-other slot="other">
                      <MessageBox @click.native="$router.push({name:'memberCenter',query:{account:item.friendAccount,status:item.onlineStatus}})" :name="item.nickName||'1'">
                        <div v-if="!item.accountProperties||item.accountProperties==='1'" id="_img" slot="img" :style="{'opacity':item.onlineStatus==='2'?.4:1}" :class="'sprite-icon-'+item.icon" alt=""></div>
                        <img slot="img" v-else :style="{'opacity':item.onlineStatus==='2'?.4:1}" src="../../../../../static/img/chartroom/customService.png" alt="">
                          <span style="font-size:.2rem;color:rgb(138, 138, 138)" slot="tips">{{item.onlineStatus==='2'?'离线':'在线'}}</span>
                      </MessageBox>
                    </yd-list-other>
                  </yd-list-item>
                </yd-list>
                <!-- 数据全部加载完毕显示 -->
                <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
                <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
              </yd-infinitescroll>
            </yd-accordion-item>
            <yd-accordion-item @click.native="queryFriendOfGroup(item.friendGroupId)" v-for="(item,index) of friendGroup" :key="index" :title="`${item.name}  ${item.cont}`">
              <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                  <yd-list-item v-for="(item,index) in friendsList" :key="index">
                    <yd-list-other slot="other">
                      <MessageBox @click.native="$router.push({name:'memberCenter',query:{account:item.friendAccount,status:item.onlineStatus}})" :name="item.nickName||'1'">
                        <div v-if="!item.accountProperties||item.accountProperties==='1'" id="_img" slot="img" :style="{'opacity':item.onlineStatus==='2'?.4:1}" :class="'sprite-icon-'+item.icon" alt=""></div>
                        <img slot="img" v-else src="../../../../../static/img/chartroom/customService.png" alt="">
                       <span style="font-size:.2rem;color:rgb(138, 138, 138)" slot="tips">{{item.onlineStatus==='2'?'离线':'在线'}}</span>
                      </MessageBox>
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
      </yd-tab-panel>
      <yd-tab-panel :label="'群聊  '+groups.length">
        <div class="container">
          <MessageBox @click.native="query(String(item.groupId),'2','1',item.name)" v-for="(item,index) in groups" :key="index" :name="item.name">
            <img slot="img" :src="`../../../../../static/img/chartroom/${item.icon}.png`" alt="">
          </MessageBox>
        </div>
      </yd-tab-panel>
    </yd-tab>

  </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import MessageBox from "../../../common/messageBox.vue";
import Box from "../../../common/box.vue";
export default {
  data() {
    return {
      tab1: 0,
      page: 1,
      allPages: "",
      friendsList: [],
      show: false,
      //分组名
      groupName: "",
      id: "",
      friendsCounts: "",
      //所以分组好友人数
      allGroupFriends: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("chart", ["queryFriend", "queryGroup", "queryFriendGroup"]),
    init() {
      this.searchFriends(this.page, "").then(res => {
        this.queryFriendGroup(`/${this.userDetails.account}`).then(res => {
          for (let item of res) {
            this.allGroupFriends += item.cont;
          }
        });
      });

      this.queryGroup();
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
    query(fromSource, singleOrGroup, readStatus, nickName) {
      if (fromSource !== "notice") {
        this.$router.push({
          name: "chartpage",
          query: { fromSource, singleOrGroup, readStatus, nickName }
        });
      } else {
        return;
      }
    },
    loadList() {
      return () => {
        this.page += 1;
        if (this.page > this.allPages) {
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
        } else {
          this.searchFriends(this.page, this.id);
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
        }
      };
    },
    queryFriendOfGroup(id) {
      this.page = 1;
      this.id = id;
      this.$nextTick(function() {
        this.searchFriends(this.page, this.id);
      });
    }
  },
  components: {
    MessageBox,
    Box
  },
  computed: {
    ...mapState("chart", ["applyRecord", "friends", "groups", "friendGroup"]),
    ...mapGetters('chart',['dealApplyRecord']),
    ...mapState("login", ["userDetails"])
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#chartmembers {
  .init;
  display: flex;
  padding-bottom: 0;
  flex-direction: column;
  color: #000;
  .yd-cell-right {
    display: flex;
    align-items: center;
    .yd-badge {
      display: flex;
      align-items: center;
    }
  }
  .yd-tab {
    // height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    .yd-tab-panel {
      flex: 1;
      display: flex;
      .yd-tab-panel-item {
        // height: 100%;
        display: flex;
        flex: 1;
      }
      .container {
        // .my-container;
        // height: 100%;
        flex: 1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
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
                  // color:rgb(138, 138, 138)
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>


