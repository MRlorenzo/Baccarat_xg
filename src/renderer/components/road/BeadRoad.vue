<template>
  <div ref="beadLoad" class="load">
    <table>
      <tr :style="trCss" v-for="row of rows">
        <td :style="syncTdCss" v-for="col of cols">
          <bead-road-grid
                  :item-css="itemCss"
                  :result="grid(row , col)"
                  :shine="shine"
                  :last-result="lastResult"
          >

          </bead-road-grid>
        </td>
      </tr>
    </table>

    <div class="load-name">
      {{$t('road.beadRoad')}}
    </div>
  </div>
</template>

<script>
    import BeadRoadGrid from './grid/BeadRoadGrid';
    import BaccaratResult from "../../../baccarat/result/BaccaratResult";
    export default {
        name: "bead-road",
        components: { BeadRoadGrid },
        props: {
        	// 结果列表(一维数组)
            resultList: {
            	type: Array ,
                required: true
            },
			// 窗口大小的版本
			sizeVersion: {
				type: Number,
				default: 0
			},
			// 是否闪烁
			shine: {
				type: Boolean
			},
			// 最后一个结果
			lastResult: {
				type: BaccaratResult
			},
            // 背景颜色
            bgColor: { type: String }
        },
        data(){
            return {
                rows: 6,
                cols: 0,
                trCss: '',
                tdCss: '',
                itemCss: ''
            }
        },
        watch:{
			sizeVersion(){
                this.autoResize();
            }
        },
        computed:{
        	// 超过了最大容量(this.rows * this.cols)的偏移量
            offset(){
                let oset = 0;
                let num = this.resultList.length - (this.rows * this.cols);
                if(num > 0){
                    oset = Math.ceil(num/this.rows) * this.rows;
                }
                return oset;
            },
            syncTdCss(){
                return this.tdCss + `border-color:${this.bgColor};`;
            }
        },
        methods:{
        	// 根据坐标获取baccaratResult
            grid( x , y){
                let len = x  - 1 + (y - 1) * 6 + this.offset;
                return  this.resultList[len]||null;
            },
            autoResize(){
                //自适应表格,根据组件的总宽度,总高度算出合适的值
                let el = this.$refs.beadLoad;
                //去掉上下边框
                let px = Math.floor(el.offsetHeight / this.rows) || 1;

                this.cols = Math.floor(el.offsetWidth / px);
                this.itemCss = `width:${px-4}px;height:${px-4}px;line-height:${px-4}px;`;
                this.tdCss = `width:${px-1}px;max-width:${px-1}px;max-height:${px-1}px;height:${px-1}px;`;
                this.trCss = `height:${px}px;`;
            }
        },
        mounted(){
			this.autoResize();
        }
    }
</script>

<style scoped>

</style>