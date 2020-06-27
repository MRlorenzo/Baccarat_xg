<template>
  <game-result-view
          :show-result="showResult"
          :result="result"
          :banker-card-list="bankerCardList"
          :player-card-list="playerCardList"
  ></game-result-view>
</template>

<script>
    import ReOpenException from "../../exception/ReOpenException";
    import UnknownException from "../../exception/UnknownException";
    import EmptyPortException from "../../exception/EmptyPortException";
    import ErrorNameException from "../../exception/ErrorNameException";
    import ModuleException from "../../exception/ModuleException";
    import AccessDeniedException from "../../exception/AccessDeniedException";
    import CardDrawingAnalysis from "../../baccarat/analysis/angleEye/CardDrawingAnalysis";
    import DealCardsShowAnalysis from "../../baccarat/analysis/angleEye/DealCardsShowAnalysis";
    import SystemErrorAnalysis from "../../baccarat/analysis/angleEye/SystemErrorAnalysis";
    import CardDrawingRetransmissionAnalysis from "../../baccarat/analysis/angleEye/CardDrawingRetransmissionAnalysis";
    import GameResultAnalysis from "../../baccarat/analysis/angleEye/GameResultAnalysis";
    import GameResultView from './GameResultView';

    export default {
        name: "angle-eye",
        components: {GameResultView},
        props: {
            showResultTime: {
                type: Number,
                default: 10
            }
        },
        data() {
            return {
                showResult: false,
                result: null,
                bankerCardList: [],
                playerCardList: []
            }
        },
        methods: {
            async tryOpen() {
                const helper = this.$angleEye;
                // 只有尝试打开资源之后才知道连接是否成功。
                try {
                    await helper.open();
                    console.log('打开成功')
                } catch (e) {
                    if (e instanceof ModuleException) {
                        if (e instanceof AccessDeniedException) {
                            // 或许是端口被占用了，或者端口拒绝访问。
                            console.log('或许是端口被占用了，或者端口拒绝访问。');
                        }
                        // 模块异常
                        console.log('没救的了，应该要重启程序');
                    }
                    // 没有串口
                    if (e instanceof EmptyPortException) {
                        // 不用管它，没有串口就不要使用helper
                        console.log('没有串口')
                    }
                    // 存在多个串口，但是配置的串口名称不匹配
                    if (e instanceof ErrorNameException) {
                        console.log('串口名称不正确')
                    }
                    if (e instanceof ReOpenException) {
                        // 重复打开资源，无需处理
                    }
                }
            },
            initEvent() {
                const helper = this.$angleEye;
                window.helper = helper;

                // 断线时
                helper.whenDisconnect(err => {
                    if (err instanceof UnknownException) {
                        if (err.code === 500) {
                            // 定时器检查到isOpen状态为false
                            console.log('失去连接')
                        }
                    } else if (err instanceof ModuleException) {
                        // 模块异常
                        console.log(err.message)
                    } else {
                        // 真.未知异常
                        console.error(err)
                    }
                });

            },
            openFullScreen(result) {
                this.showResult = true;
                this.result = result;

                let time = this.showResultTime;

                time = parseFloat(time);
                if (isNaN(time)) {
                    time = 10;
                }

                this.showOpenFullScreenTimer = setTimeout(() => {
                    this.showResult = false;
                    this.bankerCardList = [];
                    this.playerCardList = [];
                }, time * 1000);
            },
            initHooks() {
                const helper = this.$angleEye;
                const that = this;

                helper.setHooks({
                    boot(d) {
                        // 天使靴开机
                        this.$notify.info(this.$t('angleEye.boot'));
                        // 清空卡片列表
                        // 庄家牌
                        that.bankerCardList = [];
                        // 玩家牌
                        that.playerCardList = [];
                    },
                    /*当荷官抽牌时*/
                    cardDrawing(d) {
                        const sis = new CardDrawingAnalysis(d);
                        // 是不是开新靴的抽牌动作？
                        if (sis.direct() === 'newBoot') {
                            // 开新靴
                            this.$notify.info(this.$t('angleEye.newGame'));
                            this.$emit('newGame');
                        } else {
                            // 普通抽牌动作
                            //const lot = sis.allot();
                            // console.log(`发给${lot.master}的第${lot.index}张牌`);
                        }

                    },
                    // 抽多牌了
                    cardDrawingEgig(d) {
                        this.$notify.warning(this.$t('angleEye.drawMoreCard'));
                    },
                    // 使用发多的牌
                    cardDrawingRetransmission(d) {
                        this.$notify.info(this.$t('angleEye.useDrawMoreCard'));
                        // const sis = new CardDrawingRetransmissionAnalysis(d);
                        // ...
                    },
                    // 撤销发多的牌
                    revokeMultipleCards(d) {
                        this.$notify.info(this.$t('angleEye.cancelDrawMoreCard'));
                    },
                    /*发牌结果*/
                    dealCardsShow(d) {

                        const sis = new DealCardsShowAnalysis(d);
                        // 是不是开新靴的抽牌动作？
                        if (sis.direct() === 'newBoot') {

                        } else {
                            // 普通抽牌动作
                            const lot = sis.allot();
                            // console.log(`发给${lot.master}的第${lot.index}张牌`);
                            if (lot.master === 'banker') {
                                that.bankerCardList.push(sis.getCard());
                            } else if (lot.master === 'player') {
                                that.playerCardList.push(sis.getCard());
                            }
                        }
                        // console.log('发牌结果', sis.getCard());
                    },
                    /*天使靴发送结果*/
                    gameResult(d) {

                        const sis = new GameResultAnalysis(d);

                        that.$emit('result', sis.getResult());
                        // 显示扑克牌
                        that.openFullScreen(sis.getResult());
                        // console.log('游戏结果:胜者:', sis.getWinner());
                    },
                    cancellationOfError(d) {
                        this.$notify.info(this.$t('angleEye.cancelError'));
                    },
                    standBy(d) {
                        this.$notify.info(this.$t('angleEye.standBy'));
                    },
                    systemError(d) {
                        this.$notify.info(this.$t('angleEye.systemError'));
                        const sis = new SystemErrorAnalysis(d);
                        new UnknownException(sis.getMsg(), sis.getCode());
                    },
                    lockOperation(d) {
                        this.$notify.info(this.$t('angleEye.lock'));
                    },
                    changeOfPresetValue(d) {
                        this.$notify.info(this.$t('angleEye.changeOfPresetValue'));
                    },
                    default(d) {
                        console.log('默认', d.getData())
                    }
                });
            }
        },
        async created() {
            if (this.$angleEye != null) {
                this.initEvent();
                this.initHooks();
                await this.tryOpen();
            }
        }
    }
</script>

<style scoped>

</style>