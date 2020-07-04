<template>

    <div>
        <!--中文滚动文字-->
        <p class="marqueeText">
            <!--路纸所显示之资料，只供参考，如因系统故障出现问题，一切以现场结果为实，本公司一概不负责。-->
            {{marqueeText}}
        </p>
        <!--英文滚动文字-->
        <p class="marqueeText">
            {{orderMarqueeText}}
            <!--Results in this System serves as reference only.
            Should errors occur we regret that we will not be held responsible.
            Onsite results will serve as final results.-->
        </p>
    </div>
</template>

<script>
    export default {
        name: "print-footer",
        props: ['marqueeText' , 'orderMarqueeText']
    }
</script>

<style scoped>
    .marqueeText{
        word-wrap:break-word;
        word-break:break-all;
    }
</style>