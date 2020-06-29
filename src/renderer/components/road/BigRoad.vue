<template>
    <div ref="bigLoad" class="load">
        <table>
            <tr :style="trCss" v-for="row of rows">
                <td :style="syncTdCss" v-for="col of cols">
                    <big-road-grid
                        :item-css="itemCss"
                        :result="result(row , col)"
                        :tie="tie(row , col)"
                        :shine="shine"
                        :last-result="lastResult"
                    >

                    </big-road-grid>
                </td>
            </tr>
        </table>
        <div class="load-name">
            {{ $t('road.bigRoad')}}
        </div>
    </div>
</template>

<script>
    import BigRoadGrid from './grid/BigRoadGrid';
	import BaccaratResult from "../../../baccarat/result/BaccaratResult";
    import { get2DMaxItemLength } from "../../../utils";

	export default {
        name: 'big-road',
        props:{
			// 结果列表(二维数组)
			pointList: {
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
        components:{ BigRoadGrid },
        data(){
            return {
                rows:6,
                cols:0,
                trCss:'',
                tdCss:'',
                itemCss:''
            }
        },
        watch:{
			sizeVersion( ){
                this.autoResize();
            }
        },
        computed:{
			// 超过了最大容量的偏移量
            offset(){
                let oset = get2DMaxItemLength(this.pointList) -1 - this.cols;
                oset = oset < 0 ? 0 : oset;
                return oset;
            },
            syncTdCss(){
                return this.tdCss + `border-color:${this.bgColor};`;
            }
        },
        methods:{
			// 根据坐标获取baccaratResult
            grid( x , y){
                return this.pointList[x] &&
                    this.pointList[x][y+this.offset]|| null;
            },
            result( x, y){
            	const grid = this.grid(x, y);
            	return grid && grid.z;
            },
            tie( x , y){
				const grid = this.grid(x, y);
				return grid && grid.tie;
            },
            autoResize(){
                //自适应表格,根据组件的总宽度,总高度算出合适的值
                let el = this.$refs.bigLoad;
                //去掉上下边框
                let px = Math.floor(el.offsetHeight / this.rows) || 1;

                this.cols = Math.floor(el.offsetWidth / px);
                this.itemCss = `width:${px-12}px;height:${px-12}px;line-height:${px-12}px;`;
                this.tdCss = `width:${px-1}px;max-width:${px-1}px;max-height:${px-1}px;height:${px-1}px;`;
                this.trCss = `height:${px}px;`;
            }
        },
        mounted(){
            this.autoResize();
        }
    }
</script>

<style>

</style>
