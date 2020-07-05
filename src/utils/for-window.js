import { ipcRenderer , screen, desktopCapturer} from 'electron';

/**
 * 设置窗口全屏
 * @returns {Promise<any>}
 */
export async function setFullScreen() {
    return new Promise((resolve) => {
        ipcRenderer.send('fullScreen');
        ipcRenderer.once('fullScreened', event=> {
            resolve();
        })
    })
}

/**
 * 打印页面
 * @returns {Promise<any>}
 */
export async function printPage() {
    return new Promise((resolve, reject) => {
        ipcRenderer.send('printPage');
        ipcRenderer.once('printSuccess' , event=> {
            resolve();
        });
        ipcRenderer.once('printError', (event , err)=> {
            reject(err);
        })
    })
}

export async function cutFullScreen() {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    const {width , height} = screenSize;
    const maxDimension = Math.max(width, height);
    const thumbSize = {
        width: maxDimension * window.devicePixelRatio,
        height: maxDimension * window.devicePixelRatio
    };

    /** types : 列出了可以捕获的桌面资源类型, 可用类型为 screen 和 window.
     * thumbnailSize:建议缩略可被缩放的 size, 默认为 {width: 150, height: 150}
     */
    let options = { types: ['screen'], thumbnailSize: thumbSize };
    /*
    * Source 对象数组, 每个 Source 表示了一个捕获的屏幕或单独窗口，并且有如下属性 :
    * id String - 在 navigator.webkitGetUserMedia 中使用的捕获窗口或屏幕的 id . 格式
    * name String - 捕获窗口或屏幕的描述名 . 如果资源为屏幕，名字为 Entire Screen 或 Screen <index>; 如果资源为窗口, 名字为窗口的标题.
    * thumbnail NativeImage - 缩略图.
    * 注意: 不能保证 source.thumbnail 的 size 和 options 中的 thumnbailSize 一直一致. 它也取决于屏幕或窗口的缩放比例.
    * */
    const sources = await getDesktopSources(options);

    return new Promise(resolve => {
        sources.forEach(source => {
            if (source.name === 'Entire screen' || source.name === 'Screen 1') {
                /*
                * 在 Electron 中, 对所有创建 images 的 api 来说, 你可以使用文件路径或 nativeImage 实例.
                * 如果使用 null ，将创建一个空的image 对象.
                * 当前支持 PNG 和 JPEG 图片格式. 推荐 PNG ，因为它支持透明和无损压缩.
                * toPng() : 返回一个 Buffer ，它包含了图片的 PNG 编码数据.
                * toJpeg(quality) : quality Integer (必须) - 在 0 - 100 之间  返回一个 Buffer ，它包含了图片的 JPEG 编码数据.
                * toDataURL() : 返回图片数据的 URL.
                * */
                resolve(source.thumbnail.toDataURL());
            }
        })
    })
}

/**
 * 获取所有桌面资源
 * @param options
 * @returns {Promise<void>}
 */
async function getDesktopSources(options) {
    return new Promise((resolve, reject) => {
        desktopCapturer.getSources(options , (error, sources) => {
            if (error){
                reject(error);
                return ;
            }
            return resolve(sources);
        })
    });
}