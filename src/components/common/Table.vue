<template>
  <div id="Table">
    <div class="Table_head">
      <table :style="{'width':width,'background':bgcolor}">
        <thead>
          <tr height=".7rem">
            <th ref="th" v-for="item of columns" :key="item.key">
              <span>{{item.title}}</span>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="Table_body">
      <table :style="{'width':width,borderBottom:'1px solid #bfbfbf'}">
        <tbody v-if="data.length===0">
          <tr>
            <td align='center'>暂无数据</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(item,index) of data" :key="index">
            <td :style="{'width':widths[index2]}" v-for="(item2,index2) of columns" :key="index2">
              <Expand v-if="item2.render" :row="item" :render="item2.render" :index="index"></Expand>
              <!-- <input style="width:100%" v-if="item2.render" type="number" v-model="item[item2.key]"> -->
              <span v-else>{{item[item2.key]}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Expand from "./renderElement.js";
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    width: {
      type: String,
      default: "100%"
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    bgcolor:{
      type:String,
      default:'#ece8e9'
    }
  },
  data() {
    return {
      tdWidth: "",
      widths: [],
      num: ""
    };
  },
  mounted() {
    this.$nextTick(function() {
      for (let item of this.$refs.th) {
        this.widths.push(item.offsetWidth + "px");
      }
    });
  },
  components: {
    Expand
  },
  computed: {}
};
</script>

<style lang="less">
#Table {
  .Table_head {
    table {
      border-right: 1px solid #bfbfbf;
      border-left: 1px solid #bfbfbf;
      tr {
        th {
           height: .7rem;
          &:last-child {
            span {
              border: 0;
            }
          }
          span {
            display: block;
            width: 100%;
            border-right: 1px solid #bfbfbf;
          }
        }
        th:nth-child(1){
          width: 2.5rem;
        }
        th:nth-child(2){
          width: 1rem;
        }
      }
    }
  }
  .Table_body {
    table {
      border-left: 1px solid #bfbfbf;
      border-right: 1px solid #bfbfbf;
      table-layout: fixed;
      tr {
        border-bottom: 1px solid #bfbfbf;
        td {
          height: .7rem;
          font-size: 14px;
          padding: 0.05rem;
          span {
            width: 100%;
            display: inline-block;
            text-align: center;
          }
          input {
            width: 100%;
            border: 1px solid #bfbfbf;
            padding: 0.1rem 0;
            border-radius: 4px;
            text-indent: 3px;
            font-size: 12px;
          }
          span{
             font-size: 12px;
             overflow: hidden;
          }
        }
        td:nth-child(1){
          width: 2.5rem;
        }
        td:nth-child(2){
          width: 1rem;
        }
      }
    }
  }
}
</style>
