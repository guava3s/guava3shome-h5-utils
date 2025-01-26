type Context = Record<string, any>  // 可以根据需要更具体化这个类型
type Props = Record<string, any>    // 可以根据需要更具体化这个类型
type Func = (args: { context: Context, props: Props }) => Context

export class G3Context {
    // context > props
    context: Context = {}
    props: Props = {}

    constructor(props: Props = {}, extraProps: Context = {}) {
        this.props = props
        this.context = {...extraProps}
    }

    // 以 func 和 extraProps 更新 context，并返回更新后的 context
    add(func: Func, extraProps: Context = {}): Context {
        const funReturnProps = func({context: {...this.context, ...extraProps}, props: this.props})
        Object.assign(this.context, funReturnProps)
        return funReturnProps
    }

    // 以 func 和 props 更新 context 并返回
    addConf({func, props}: { func: Func, props: Context }): Context {
        return this.add(func, props)
    }

    /**
     * 以数组形式加入 context
     * [ [func, extraProps] ]
     * @param funcList
     */
    addList(...funcList: [Func, Context][]): Context {
        const propsRef: Context = {}
        for (const [func, extraProps] of funcList) {
            Object.assign(propsRef, this.add(func, extraProps))
        }
        return propsRef
    }

    // 添加 context 的额外属性
    addContextProps(props: Context): void {
        Object.assign(this.context, props)
    }
}
