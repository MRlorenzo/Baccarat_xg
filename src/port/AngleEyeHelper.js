/*天使靴管理助手*/
import Connector from './Connector';
import AngleEyeProvider from './provider/impl/AngleEyeProvider';
import Tm from './provider/impl/type.json';
import IllegalDataException from "../exception/IllegalDataException";
import {com, angle} from '../local-storage';

const connect = Symbol(), distributor = Symbol(),getConnector = Symbol();
/**
 * 天使靴操作助手
 * async open() throw ReOpenException,ModuleException,UnknownException,EmptyPortException,ErrorNameException
 * whenDisconnect(handler) throw UnableCloseException,ModuleException,ReOpenException,UnknownException
 * async updateComName(comName)
 * async close() throw ReCloseException,ModuleException,EmptyPortException,ErrorNameException
 * setHooks(hooks)
 */
export default class AngleEyeHelper {
    constructor() {
        this.hooks = {};
        this.disconnect = (err) => {
        };

		this.connector = null;
    }

    async [getConnector](){
        if (this.connector == null){
            let comConfig = await com.findOne();
            let angleConfig = await angle.findOne();
            this.connector = this[connect](comConfig, angleConfig);
        }
        return this.connector;
    }

    /**
     * 打开资源
     * throw ReOpenException,ModuleException,UnknownException,EmptyPortException,ErrorNameException
     * @returns {Promise<void>}
     */
    async open() {
        const connector = await this[getConnector]();
        await connector.open();
    }

    // 连接资源
    [connect](comConfig, angleEyeSettings) {
        let provider = new AngleEyeProvider(comConfig, angleEyeSettings);
		let connector = new Connector(provider);
		connector.whenData(d => {
			// 接受到完整的数据...
			// 数据是否合法
			if (d.isLegal()) {
				this[distributor](d);
			} else {
				new IllegalDataException('非法的数据', d.getSource());
			}
		});

		connector.whenDisconnect(err => {
			// 失去连接。。。
			this.disconnect(err);
		});
		return connector;
    }

    // 断线处理程序
    whenDisconnect(handler) {
        if (typeof handler === 'function') {
            this.disconnect = handler;
        }
        return this;
    }

    // 分发任务
    [distributor](angleData) {
        const type = angleData.getType();
        const methodName = Tm[type];
        let hook;
        if (methodName != null) {
            const handler = this.hooks[methodName];
            if (typeof handler === 'function') {
                hook = handler;
            }
        }

        if (hook != null) {
            hook(angleData);
        } else if (typeof this.hooks.default === 'function') {
            this.hooks.default(angleData);
        }
    }

    /**
     * 更新/切换串口名称
     * throw UnableCloseException,ModuleException,ReOpenException,UnknownException
     * @param comName
     * @returns {Promise<void>}
     */
    async updateComName(comName) {
        const connector = await this[getConnector]();
        await connector.updateComName(comName);
    }

    /**
     * 关闭资源
     * throw ReCloseException,ModuleException,EmptyPortException,ErrorNameException
     * @returns {Promise<void>}
     */
    async close() {
        const connector = await this[getConnector]();
        await connector.close();
    }

    /**
     * 设置各种天使靴数据的处理钩子
     * hooks: {key: methodName , value: function(angleData: AngleData )}
     *     methodName: boot,standBy,cardDrawing...详情见../provider/impl/type.json
     * @param hooks
     */
    setHooks(hooks) {
        this.hooks = hooks;
    }
}