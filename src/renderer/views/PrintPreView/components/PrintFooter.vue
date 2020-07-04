<template>
    <el-footer>
        <!--中文滚动文字-->
        <p style="word-wrap:break-word;word-break:break-all;">
            <!--路纸所显示之资料，只供参考，如因系统故障出现问题，一切以现场结果为实，本公司一概不负责。-->
            {{marqueeText}}
        </p>
        <!--英文滚动文字-->
        <p style="word-wrap:break-word;word-break:break-all;">
            {{orderMarqueeText}}
            <!--Results in this System serves as reference only.
            Should errors occur we regret that we will not be held responsible.
            Onsite results will serve as final results.-->
        </p>
    </el-footer>
</template>

<script>
    export default {
        name: "print-footer",
        props: ['marqueeText' , 'orderMarqueeText']
    }
</script>

<style scoped>

</style>