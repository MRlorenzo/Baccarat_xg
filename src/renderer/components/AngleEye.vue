<template>
  <div>
    <game-result-view
            :show-result="showResult"
            :result="result"
            :banker-card-list="bankerCardList"
            :player-card-list="playerCardList"
            :body-width="bodyWidth"
            :bg-color="backgroundColor"
    ></game-result-view>
    <com-setting-page ref="comSetting" :com-name="comName" @update="connectCom"></com-setting-page>
  </div>
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
    import GameResultView from '../views/GameResultView';
	import ComSettingPage from '../views/ComSettingPage';
	import Mousetrap from 'mousetrap';
	import UnableCloseException from "../../exception/UnableCloseException";

    export default {
        name: "angle-eye",
        components: {GameResultView , ComSettingPage },
        props: {
            showResultTime: {
                type: Number,
                default: 10
            },
			bodyWidth: {
				type: Number,
				default: 0
			},
            backgroundColor: {
            	type: String
            },
            debug: {
            	type: Boolean,
                default: true
            }
        },
        data() {
            return {
                showResult: false,
				showOpenFullScreenTimer: null,
                result: null,
                bankerCardList: [],
                playerCardList: [],
                comName: null
            }
        },
        methods: {
			openComSetting() {
				this.$refs.comSetting.open();
			},
			closeComSetting(){
				this.$refs.comSetting.close();
			},
			async connectCom( comName ){
				const helper = this.$angleEye;
				if (helper != null) {
					try {
						await helper.updateComName(comName);
						this.closeComSetting();
						this.comName = comName;
						this.$notify.success(this.$t('angleEye.connectSuccess'));
					} catch (e) {
						// UnableCloseException,ModuleException,ReOpenException,UnknownException
						if (e instanceof ReOpenException) {
							this.$notify.warning(this.$t('angleEye.reOpen'));
						}
						if (e instanceof UnknownException) {
							this.$notify.error(this.$t('angleEye.moduleError') + ':\n' + e.message);
						}
						if (e instanceof UnableCloseException) {
							this.$notify.warning(this.$t('angleEye.unableCloseException'));
						}
						if (e instanceof ModuleException) {
							this.$notify.error(this.$t('angleEye.moduleError') + ':\n' + e.message);
						}
					}
				}else {
					this.closeComSetting();
				}
			},
            async tryOpen() {
                const helper = this.$angleEye;
                // 只有尝试打开资源之后才知道连接是否成功。
                try {
                    await helper.open();
                    this.comName = helper.getComName();
                    this.$notify.success(this.$t('angleEye.connectSuccess'));
                } catch (e) {
                    if (e instanceof ModuleException) {
                        if (e instanceof AccessDeniedException) {
                            // 或许是端口被占用了，或者端口拒绝访问。
                            this.$notify.error(this.$t('angleEye.accessDenied'));
                        }else{
							// 模块异常
							this.$notify.error(this.$t('angleEye.moduleError') + ':\n' + e.message);
                        }
                    }
                    // 没有串口
                    if (e instanceof EmptyPortException) {
                        // 不用管它，没有串口就不要使用helper
                        this.$notify.warning(this.$t('angleEye.emptyPort'))
                    }
                    // 存在多个串口，但是配置的串口名称不匹配
                    if (e instanceof ErrorNameException) {
                        this.$notify.error(this.$t('angleEye.errorName'));

                    }
                    if (e instanceof ReOpenException) {
                        // 重复打开资源，无需处理
                        this.$notify.warning(this.$t('angleEye.reOpen'));
                    }
                }
            },
            initEvent() {
                const helper = this.$angleEye;

                // 断线时
                helper.whenDisconnect(err => {
                    if (err instanceof UnknownException) {
                        if (err.code === 500) {
                            // 定时器检查到isOpen状态为false
                            this.$message.warning(this.$t('angleEye.lostConnection') + ':' + err.message);
                            this.openComSetting();
                        }
                    } else if (err instanceof ModuleException) {
                        // 模块异常
						this.$message.error(this.$t('angleEye.lostConnection') + ':' + err.message);
                    } else {
                        // 真.未知异常
						this.$message.error(this.$t('angleEye.lostConnection') + ':' + err.message);
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
                // 扑克牌展示的时候不要响应全局按键
                this.$fnKeyMap.stop();

                this.showOpenFullScreenTimer = setTimeout(() => {
                    this.closeFullScreen();
                }, time * 1000);
            },
            closeFullScreen(){
				if (this.showOpenFullScreenTimer != null){
					clearTimeout(this.showOpenFullScreenTimer);
                }
                this.showResult = false;
				this.bankerCardList = [];
				this.playerCardList = [];
				this.$fnKeyMap.start();
            },
            initHooks() {
                const helper = this.$angleEye;
                const that = this;
                const _ = this;

                helper.setHooks({
                    boot(d) {
                        // 天使靴开机
						_.info('angleEye.boot');
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
							_.msg('angleEye.newGame');
							that.$emit('newGame');
                        } else {
                            // 普通抽牌动作
							// 抽牌的时候马上关掉上一局的扑克牌结果。
                            that.closeFullScreen();
                            const lot = sis.allot();
                            _.info(`发给${lot.master}的第${lot.index}张牌`);
                        }

                    },
                    // 抽多牌了
                    cardDrawingEgig(d) {
						_.warning('angleEye.drawMoreCard');
                    },
                    // 使用发多的牌
                    cardDrawingRetransmission(d) {
						_.msg('angleEye.useDrawMoreCard');
                        // const sis = new CardDrawingRetransmissionAnalysis(d);
                        // ...
                    },
                    // 撤销发多的牌
                    revokeMultipleCards(d) {
						_.msg('angleEye.cancelDrawMoreCard');
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
                    },
                    /*天使靴发送结果*/
                    gameResult(d) {

                        const sis = new GameResultAnalysis(d);

                        that.$emit('result', sis.getResult());
                        // 显示扑克牌
                        that.openFullScreen(sis.getResult());
                        _.info('angleEye.gameResult');
                    },
                    cancellationOfError(d) {
						_.msg('angleEye.cancelError');
                    },
                    standBy(d) {
						_.info('angleEye.standBy');
                    },
                    systemError(d) {
						_.msg('angleEye.systemError');
                        const sis = new SystemErrorAnalysis(d);
                        new UnknownException(sis.getMsg(), sis.getCode());
                    },
                    lockOperation(d) {
						_.msg('angleEye.lock');
                    },
                    changeOfPresetValue(d) {
						_.msg('angleEye.changeOfPresetValue');
                    },
                    default(d) {
                        console.log('默认', d.getData())
                    }
                });
            },
            msg(code){
				this.$notify.info(this.$t(code));
            },
            info( code ){
				if (this.debug){
					this.$notify.info(this.$t(code));
                }
            },
			warning( code ){
				this.$notify.warning(this.$t(code));
            }
        },
        async created() {
            this.initEvent();
            this.initHooks();
            if (this.$angleEye != null) {
                await this.tryOpen();
            }
        },
        mounted(){
        	this.$fnKeyMap.addHooks('.', ()=> {
				this.openComSetting();
            });
			// 显示最后一次扑克牌记录(放弃)
			/*this.$fnKeyMap.addHooks('*' ,()=>{
				this.$message.info('显示最后一次扑克牌记录')
			});*/
        }
    }
</script>

<style scoped>

</style>