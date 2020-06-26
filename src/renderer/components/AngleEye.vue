<template>

</template>

<script>
    import ReOpenException from "../../exception/ReOpenException";
    import UnknownException from "../../exception/UnknownException";
    import EmptyPortException from "../../exception/EmptyPortException";
    import ErrorNameException from "../../exception/ErrorNameException";
    import ModuleException from "../../exception/ModuleException";
    import AccessDeniedException from "../../exception/AccessDeniedException";

    export default {
        name: "angle-eye",
        methods: {
            async tryOpen(){
                const helper = this.$angleEye;
                // 只有尝试打开资源之后才知道连接是否成功。
                try {
                    await helper.open();
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
            initEvent(){
                const helper = this.$angleEye;
                window.helper = helper;

                // 断线时
                helper.whenDisconnect(err => {
                    if (err instanceof UnknownException) {
                        if (err.code === 500) {
                            // 定时器检查到isOpen状态为false
                            console.log('失去连接')
                        }
                    }else
                    if (err instanceof ModuleException) {
                        // 模块异常
                        console.log(err.message)
                    }else{
                        // 真.未知异常
                        console.error(err)
                    }
                });

            },
            initHooks() {
                const helper = this.$angleEye;
                helper.setHooks({
                    boot(d) {
                        console.log('天使靴开机', d.getData());
                    },
                    /*当荷官抽牌时*/
                    cardDrawing(d) {
                        console.log('抽牌',d.getData())
                    },
					/*发牌结果*/
					dealCardsShow(d) {
						console.log('抽牌？', d.getData())
					},
					revokeMultipleCards(d) {
						console.log('取消发多的牌', d.getData())
					},
                    /*天使靴发送结果*/
                    gameResult(d) {
                        console.log('游戏结果', d.getData())
                    },
					cancellationOfError(d) {
						console.log('取消错误', d.getData())
					},
					standBy(d) {
						console.log('待机', d.getData())
					},
					systemError(d) {
						console.log('系统错误', d.getData())
					},
                    cardDrawingEgig(d) {
                        console.log('...' , d.getData());
                    },
                    lockOperation(d) {
                        console.log('锁定', d.getData())
                    },
                    changeOfPresetValue(d) {
                        console.log('重新设定默认值', d.getData())
                    },
                    cardDrawingRetransmission(d) {
                        console.log('...', d.getData())
                    },
                    default(d) {
                        console.log('默认', d.getData())
                    }
                });
            }
        },
        async created() {
            this.initEvent();
            this.initHooks();
            await this.tryOpen();
        }
    }
</script>

<style scoped>

</style>