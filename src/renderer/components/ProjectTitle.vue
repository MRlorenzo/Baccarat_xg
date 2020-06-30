<template>
    <div class="title-box">
        <div class="title-left" :style="titleLeft">
            <div v-for="l of limitList">
                <div v-if="model === 'single'">
                    <strong>
                    <span>{{`${ $t('title.minToMax') } ${l.label}`}}</span>
                    <br>
                    <span>{{`${format(l.v.bet.min)} - ${format(l.v.bet.max)}`}}</span>
                    </strong>
                </div>
                <div v-else>
                    <strong>
                    <span style="display: block">{{`${ $t('title.minToMax') } ${l.label} ${format(l.v.bet.min)} - ${format(l.v.bet.max)}`}}</span>
                    </strong>
                </div>
            </div>
        </div>

        <div class="title-right" :style="titleRight">
            <div v-for="l of limitList" >
                <span>{{`${ $t('title.tie') } ${ $t('title.minToMax') } ${l.label} ${format(l.v.tie.min)} - ${format(l.v.tie.max)}`}}</span>
                <span>{{`${ $t('title.pairs') } ${ $t('title.minToMax') } ${l.label} ${format(l.v.pairs.min)} - ${format(l.v.pairs.max)}`}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project-title",
        props:{
            /**
             * {
             *  USD: {},
             *  RMB: {},...
             * }
             */
            limitItem: {
                type: Object,
                required: true
            }
        },
        computed: {
            currencyNames(){
                return Object.keys(this.limitItem);
            },
            model(){
                return this.currencyNames.length === 1 ? 'single' : 'multiple';
            },
            titleLeft(){
                return this.model === 'single' ?
                    'font-size:2.7vw;line-height:2.7vw;text-align: center;':
                    'font-size:2.2vw;line-height:2.2vw;text-align: left;'
            },
            titleRight(){
                return this.model === 'single' ?
                    'font-size:2.5vw;line-height:2.5vw;text-align: center;':
                    'font-size:1.3vw;line-height:1.4vw;text-align: left;'
            },
            limitList(){
                return this.currencyNames.map(name => {
                    return {
                        label: name,
                        v: this.limitItem[name]
                    }
                })
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
            }
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
