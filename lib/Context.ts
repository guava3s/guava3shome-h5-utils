export type InternalContext = Record<string, any>
export type InternalProps = Record<string, any>
export type InternalFunc = (args: { context: InternalContext, props: InternalProps }) => InternalContext

export class G3Context {
    // context > props
    context: InternalContext = {}
    props: InternalProps = {}

    constructor(props: InternalProps = {}, extraProps: InternalContext = {}) {
        this.props = props
        this.context = {...extraProps}
    }

    // 以 func 和 extraProps 更新 context，并返回更新后的 context
    add(func: InternalFunc, extraProps: InternalContext = {}): InternalContext {
        const funReturnProps = func({context: {...this.context, ...extraProps}, props: this.props})
        Object.assign(this.context, funReturnProps)
        return funReturnProps
    }

    // 以 func 和 props 更新 context 并返回
    addConf({func, props}: { func: InternalFunc, props: InternalContext }): InternalContext {
        return this.add(func, props)
    }

    /**
     * 以数组形式加入 context
     * [ [func, extraProps] ]
     * @param funcList
     */
    addList(...funcList: [InternalFunc, InternalContext][]): InternalContext {
        const propsRef: InternalContext = {}
        for (const [func, extraProps] of funcList) {
            Object.assign(propsRef, this.add(func, extraProps))
        }
        return propsRef
    }

    // 添加 context 的额外属性
    addContextProps(props: InternalContext): void {
        Object.assign(this.context, props)
    }
}
