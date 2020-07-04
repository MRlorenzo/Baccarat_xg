export default {
	watch: {
		width(){
			this.styles = this.styleFromSize(this.width , this.height);
		},
		height(){
			this.styles = this.styleFromSize(this.width , this.height);
		}
	},
	methods: {
		// 根据窗口的宽度，高度计算样式
		styleFromSize( width , height ){
			let bigHeight = height * (250 / 1080);
			let smallHeight = height * (150 / 1080);
			let headHeight = height * (100 / 1080);
			let footerHeight = height * (40 / 1080);

			//如果用户的分辨率超低,例如1366*768,我不得不为它们做特殊处理.因为此分辨率不足以渲染所有的内容.
			if (height <= 800) {
				headHeight = 50;
			}
			return {
				beadLoad: `height:${~~bigHeight}px;`,
				bigEyeLoad: `height:${~~smallHeight}px;`,
				bigLoad: `height:${~~bigHeight}px;`,
				smallLoad: `height:${~~smallHeight}px;`,
				head: `height:${~~headHeight}px;width:${~~width}px;`,
				logo: `width:100%;height:${~~(bigHeight - 6)}px;`,
				footer: `width:100%;height:${~~footerHeight}px;`,
				height: height
			}
		}
	},
	mounted(){
		// 窗口大小发生改变。
		this.$electron.ipcRenderer.on('resize', (event , [width , height]) => {
			this.width = width;
			this.height = height;
			this.windowSizeVersion ++;
		});
	}
}