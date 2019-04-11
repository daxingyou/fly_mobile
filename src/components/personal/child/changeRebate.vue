<template>
  <div id="changeRebate">
    <yd-navbar title="赚水设置">
      <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
      <div slot="right" @click="assisShow()">
        小助手
      </div>
    </yd-navbar>
    <div class="container">
      <div class="_top">
        <select @change="search" name="lottery_types" v-model="types">
          <option :value="item.classId" v-for="(item,index) of kindList" :key="index">{{item.className}}</option>
        </select>
        <div v-if="show">
          <yd-button @click.native="confirm" type="danger">完成</yd-button>
          <yd-button @click.native="cancel" type="hollow">取消</yd-button>
        </div>
        <div v-else>
          <yd-button @click.native="revise" type="danger">修改</yd-button>
        </div>
      </div>
      <p>说明：设置赚取差价的时候，每个模式设置不能超过该账户的最高赔率，否则会出现会员盈利负数。（例如：赔率1.992设置赚取大于0.992时，例如赚取1，会出现-0.008）</p>
      <Table :columns="columns1" :data="data1"></Table>

    </div>
    <footer>
      <Pagination ref="pagination" @enter="changePage" @change="changePage" :allCounts="memberModel.length" align="right"></Pagination>
    </footer>
    <!-- 小助手 -->
    <div class="Assis_tant" v-show="assis_tant">
      <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Table from "../../common/Table.vue";
import Pagination from "../../common/pagination.vue";
import Box from "../../common/box.vue";
import Assistant from "../../home/dome/assistant.vue";
export default {
  data() {
    return {
      assis_tant: false,
      types: "1",
      show: false,
      //储存更改的id
      rows: [],
      //储存更改的数据
      arr: [],
      page: 1,
      columns1: [
        {
          title: "种类",
          key: "subGameName"
        },
        {
          title: "赔率",
          // key:'ownOdd',
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  fontSize: ".2rem",
                  "word-wrap": "break-word",
                  "text-align": "center"
                }
              },
              Number(params.row.ownOdd)
            );
          }
        },
        {
          title: "A",
          key: "A_model",
          render: (h, params) => {
            if (this.show) {
              return h("input", {
                style:{
                  fontSize: ".2rem",
                },
                domProps: {
                  value: params.row.oddsModela
                },
                attrs: {
                  type: "number"
                },
                on: {
                  change: event => {
                    if (event.target.value != params.row.oddsModela) {
                      let obj = {};
                      for (let [key, value] of Object.entries(params.row)) {
                        obj[key] = value;
                        if(event.target.value<0){
                          event.target.value = 0;
                        }
                      }
                      if (!this.rows.includes(params.row.id)) {
                        obj.oddsModela = String(event.target.value);
                        this.rows.push(obj.id);
                        this.arr.push(obj);
                      } else {
                        this.arr[this.rows.indexOf(params.row.id)][
                          "oddsModela"
                        ] = String(event.target.value);
                      }
                    }
                  }
                }
              });
            } else {
              return h("span",{
                 style:{
                  fontSize: ".2rem",
                },

              } ,params.row.oddsModela);
            }
          }
        },
        {
          title: "B",
          key: "B_model",
          render: (h, params) => {
            if (this.show) {
              return h("input", {
                 style:{
                  fontSize: ".2rem",
                },
                domProps: {
                  value: params.row.oddsModelb
                },
                attrs: {
                  type: "number"
                },
                on: {
                  change: event => {
                    if (event.target.value != params.row.oddsModelb) {
                      let obj = {};
                      for (let [key, value] of Object.entries(params.row)) {
                        obj[key] = value;
                        if(event.target.value<0){
                          event.target.value = 0;
                        }
                      }
                      if (!this.rows.includes(params.row.id)) {
                        obj.oddsModelb = String(event.target.value);
                        this.rows.push(obj.id);
                        this.arr.push(obj);
                      } else {
                        this.arr[this.rows.indexOf(params.row.id)][
                          "oddsModelb"
                        ] = String(event.target.value);
                      }
                    }
                  }
                }
              });
            } else {
              return h("span",{
                 style:{
                  fontSize: ".2rem",
                },
              }, params.row.oddsModelb);
            }
          }
        },
        {
          title: "C",
          key: "C_model",
          render: (h, params) => {
            if (this.show) {
              return h("input", {
                 style:{
                  fontSize: ".2rem",
                },
                domProps: {
                  value: params.row.oddsModelc
                },
                attrs: {
                  type: "number"
                },
                on: {
                  change: event => {
                    if (event.target.value != params.row.oddsModelc) {
                      let obj = {};
                      for (let [key, value] of Object.entries(params.row)) {
                        obj[key] = value;
                        if(event.target.value<0){
                          event.target.value = 0;
                        }
                      }
                      if (!this.rows.includes(params.row.id)) {
                        obj.oddsModelc = String(event.target.value);
                        this.rows.push(obj.id);
                        this.arr.push(obj);
                      } else {
                        this.arr[this.rows.indexOf(params.row.id)][
                          "oddsModelc"
                        ] = String(event.target.value);
                      }
                    }
                  }
                }
              });
            } else {
              return h("span",{
                 style:{
                  fontSize: ".2rem",
                },
              },params.row.oddsModelc);
            }
          }
        },
        {
          title: "D",
          key: "D_model",
          render: (h, params) => {
            if (this.show) {
              return h("input", {
                 style:{
                  fontSize: ".2rem",
                },
                domProps: {
                  value: params.row.oddsModeld
                },
                attrs: {
                  type: "number"
                },
                on: {
                  change: event => {
                    if (event.target.value != params.row.oddsModeld) {
                      let obj = {};
                      for (let [key, value] of Object.entries(params.row)) {
                        obj[key] = value;
                        if(event.target.value<0){
                          event.target.value = 0;
                        }
                      }
                      if (!this.rows.includes(params.row.id)) {
                        obj.oddsModeld = String(event.target.value);
                        this.rows.push(obj.id);
                        this.arr.push(obj);
                      } else {
                        this.arr[this.rows.indexOf(params.row.id)][
                          "oddsModeld"
                        ] = String(event.target.value);
                      }
                    }
                  }
                }
              });
            } else {
              return h("span",{
                 style:{
                  fontSize: ".2rem",
                },
              }, params.row.oddsModeld);
            }
          }
        }
      ],
      data1: [
        {
          subGameName: 4
        }
      ]
    };
  },
  created() {
    console.log(this.memberModel_p);
    this.init();
  },
  components: {
    Table,
    Pagination,
    Box,
    Assistant
  },
  methods: {
    ...mapActions(["queryMemberModel", "updateMemberModel"]),
    ...mapActions("home", ["kind"]),
    // 初始化
    init() {
      if (this.kindList.length == 0) {
        this.kind();
      }
      this.query(this.page);
    },
    //搜索彩类
    search() {
      this.$nextTick(() => {
        this.$refs.pagination.currentPage = 1;
        this.query(1);
      });
    },
    query(page) {
      this.queryMemberModel(`/${this.types}`).then(res => {
        this.data1 = this.memberModel_p[page - 1];
      });
    },
    revise() {
      this.show = true;
    },
    cancel() {
      this.arr = [];
      this.rows = [];
      this.show = false;
    },
    changePage(page) {
      this.page = page;
      this.data1 = this.memberModel_p[page - 1];
    },
    confirm() {
      this.updateMemberModel({
        baseModelList: this.arr
      }).then(res => {
        if (res.code === 0) {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1000,
            callback: () => {
              this.query(this.page);
            }
          });
          this.show = false;
          this.arr = [];
          this.rows = [];
        } else {
          this.$dialog.toast({ mes: res.msg, timeout: 1000 });
        }
      });
    },
    // 小助手
    assisShow() {
      if (this.assis_tant == false) {
        this.assis_tant = true;
      } else {
        this.assis_tant = false;
      }

      // console.log(this.assis_tant)
    }
  },
  computed: {
    ...mapState("home", ["kindList"]),
    ...mapState(["memberModel"]),
    ...mapGetters(["memberModel_p"])
  }
};
</script>

<style lang="less">
@import url("../../../../static/css/common.less");
#changeRebate {
  .init;
  .container {
    .my-container;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    ._top {
      display: flex;
      justify-content: space-between;
      flex-shrink: 0;
      select {
        width: 3.5rem;
        flex-shrink: 0;
        padding: 0.1rem;
        border-radius: 4px;
        margin-bottom: 0.2rem;
      }
      div {
        button {
          margin: 0 0.1rem;
        }
      }
    }
    p {
      margin-bottom: 0.2rem;
      font-size: 12px;
    }
  }
  footer {
    .my-footer;
    #pagination {
      font-size: 14px !important;
    }
  }
  .Assis_tant {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    height: calc(100% - 1rem - 0px);
    /* background: #2dabf3; */
  }
}
</style>
