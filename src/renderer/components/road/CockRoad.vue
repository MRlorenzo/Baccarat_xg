<template>
    <div ref="cockLoad" class="load">
        <table :style="tableStyle">
            <tr :style="trCss" v-for="item of rows">
                <td :style="gridStyle(item , e)" v-for="e of cols">

                    <cock-road-grid
                            :result="grid(item , e)"
                            :item-css="itemCss"
                            :shine="shine"
                            :last-result="lastResult"
                    ></cock-road-grid>
                </td>
            </tr>
        </table>
        <div class="load-name">
            {{ $t('road.cockRoad')}}
        </div>
    </div>
</template>

<script>
    import CockRoadGrid from './grid/CockRoadGrid'
    import BaccaratResult from "../../../baccarat/result/BaccaratResult";
    import {get2DMaxItemLength} from "../../../utils";
    export default {
        name: 'cock-road',
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
            bgColor: { type: String },
            width: {
                type: Number
            },
            height: {
                type: Number
            },
            tableStyle: {
            	type: String
            }
        },
        components:{ CockRoadGrid },
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
            sizeVersion(){
                this.autoResize();
            }
        },
        computed:{
            offset(){
                let oset = get2DMaxItemLength(this.pointList) -1 - this.cols;
                oset = oset < 0 ? 0 : oset;
                return oset;
            },
            roadStyle(){
                let css = '';
                if (this.height != null){
                    css += `height: ${this.height}px;`
                }
                if (this.width != null){
                    css += `width: ${this.width}px;`
                }
                return css;
            }
        },
        methods:{
            grid( x , y){
                const point = this.pointList[x]&&this.pointList[x][y+this.offset]||null;
                return point && point.z;
            },
            gridStyle( x , y ){
                /*
                奇数行去掉下边框,偶数行去掉上边框

                奇数列去掉左边框,偶数列去掉右边框
                */
                let css = ''+this.tdCss;
                x % 2 === 1 ? css+='border-bottom-width: 0px;':css+='border-top-width: 0px;';
                y % 2 === 1 ? css+='border-right-width: 0px;':css+='border-left-width: 0px;';
                css += `border-color:${this.bgColor};`;
                return css;
            },
            autoResize(){
                //自适应表格,根据组件的总宽度,总高度算出合适的值
                let el = this.$refs.cockLoad;
                //去掉上下边框
                const offsetHeight = this.height == null ? el.offsetHeight : this.height;
                const offsetWidth = this.width == null ? el.offsetWidth : this.width;
                let px = Math.floor(offsetHeight / this.rows) || 1;
                this.cols = Math.floor(offsetWidth / px);
                if(this.cols % 2 === 1){
                    this.cols -= 1;
                }
                this.itemCss = `width:${px-4}px;height:${px-4}px;line-height:${px}px;`;
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
