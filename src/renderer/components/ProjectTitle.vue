<template>
    <div class="title-box">
        <div class="title-left" :style="titleLeft">
            <div v-for="limit of limitList">
                <div v-if="model === 'single'">
                    <strong>
                    <span>{{`${ $t('title.minToMax') } ${limit.currencyName}`}}</span>
                    <br>
                    <span>{{`${format(limit.betLimit.min)} - ${format(limit.betLimit.max)}`}}</span>
                    </strong>
                </div>
                <div v-else>
                    <strong>
                    <span style="display: block">{{`${ $t('title.minToMax') } ${limit.currencyName} ${format(limit.betLimit.min)} - ${format(limit.betLimit.max)}`}}</span>
                    </strong>
                </div>
            </div>
        </div>

        <div class="title-right" :style="titleRight">
            <div v-for="limit of limitList" >
                <span>{{`${ $t('title.tie') } ${ $t('title.minToMax') } ${limit.currencyName} ${format(limit.tieLimit.min)} - ${format(limit.tieLimit.max)}`}}</span>
                <span>{{`${ $t('title.pairs') } ${ $t('title.minToMax') } ${limit.currencyName} ${format(limit.pairLimit.min)} - ${format(limit.pairLimit.max)}`}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project-title",
        props:{
            currencyIds: {
                type: Array,
                required: true
            },
            limitList: {
                type: Array,
                required: true
            }
        },
        data(){
            return {
                titleLeft:'font-size:2.7vw;line-height:2.7vw;text-align: center;',
                titleRight:'font-size:2.5vw;line-height:2.5vw;text-align: center;',
                model:'single'//'single' //multiple
            }
        },
        watch:{
            'settings.currencyIds':function( ){
                this.watchIds();
            },
            model(){
                if(this.model === 'single'){
                    this.titleLeft = 'font-size:2.7vw;line-height:2.7vw;text-align: center;';
                    this.titleRight = 'font-size:2.5vw;line-height:2.5vw;text-align: center;';
                }else{
                    this.titleLeft = 'font-size:2.2vw;line-height:2.2vw;text-align: left;';
                    this.titleRight = 'font-size:1.3vw;line-height:1.4vw;text-align: left;';
                }
            }
        },
        methods:{
            format( number ){
                if(typeof number !== 'number'){
                    number = parseFloat(number);
                    if(isNaN(number)){
                        number = 0;
                    }
                }
                return number.toLocaleString('en');
            },
            watchIds(){
                let ids = this.currencyIds;
                if(Array.isArray(ids) && ids.length > 1){
                    this.model = 'multiple';
                }else{
                    this.model = 'single';
                }
            }
        },
        created(){
            this.watchIds();
        }
    }
</script>

<style scoped>

    .title-box{
        height: 100%;
    }

    .title-left,.title-right{
        width: 50%;
        height: 100%;
        float: left;
    }

    .title-left span ,.title-right span{
        display: inline-block;
        font-family: "Microsoft YaHei"
    }

</style>
