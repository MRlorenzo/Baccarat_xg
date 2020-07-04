<template>
    <div ref="bigEyeLoad" class="load" :style="roadStyle">
        <table>
            <tr :style="trCss" v-for="item of rows">
                <td :style="gridStyle(item , e)" v-for="e of cols">
                    <big-eye-road-grid
                            :item-css="itemCss"
                            :result="grid(item , e)"
                            :shine="shine"
                            :last-result="lastResult"
                    >

                    </big-eye-road-grid>
                </td>
            </tr>
        </table>
        <div class="load-name">
            {{ $t('road.bigEyeRoad')}}
        </div>
    </div>
</template>

<script>

    import BigEyeRoadGrid from './grid/BigEyeRoadGrid';
    import {get2DMaxItemLength} from "../../../utils";
    import BaccaratResult from "../../../baccarat/result/BaccaratResult";
    export default {
        name: 'big-eye-road',
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
            }
        },
        components:{BigEyeRoadGrid},
        data(){
            return {
                itemCss:'',
                rows:6,
                cols:0,
                trCss:'',
                tdCss:''
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
                const point = this.pointList[x]&&
                    this.pointList[x][y+this.offset]||null;
                return point && point.z;
            },
            gridStyle( x , y ){
                /*
                奇数行去掉下边框,偶数行去掉上边框

                奇数列去掉左边框,偶数列去掉右边框
                */
                let clazz = ''+this.tdCss;
                x % 2 === 1 ? clazz+='border-bottom-width: 0px;':clazz+='border-top-width: 0px;';
                y % 2 === 1 ? clazz+='border-right-width: 0px;':clazz+='border-left-width: 0px;';
                clazz += `border-color:${this.bgColor};`;
                return clazz;
            },
            autoResize(){
                //自适应表格,根据组件的总宽度,总高度算出合适的值
                let el = this.$refs.bigEyeLoad;
                const offsetHeight = this.height == null ? el.offsetHeight : this.height;
                const offsetWidth = this.width == null ? el.offsetWidth : this.width;
                //去掉上下边框
                let px = Math.floor(offsetHeight / this.rows) || 1;

                this.cols = Math.floor(offsetWidth / px) - 2;//去掉两个保持一定的间距,因为它们实在是太小了

                if(this.cols % 2 === 1){
                    this.cols -= 1;
                }
                if (this.cols <0 ){
                    this.cols = 50;
                }
                this.itemCss = `width:${px-7}px;height:${px-7}px;line-height:${px}px;`;
                this.tdCss = `width:${px}px;max-width:${px}px;max-height:${px}px;height:${px}px;`;
                this.trCss = `height:${px}px;`;
            }
        },
        mounted(){
            this.autoResize();
        }
    }
</script>

<style >

</style>
