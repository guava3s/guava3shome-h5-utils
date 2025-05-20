export interface TreeNode<T = any> {
    [key: string]: T | TreeNode[] | undefined;

    children?: TreeNode[];
}

export interface StackItem<T> {
    node: TreeNode;
    depth: number;
    parent: T | null;
}

export interface TreeNodeBase {
    [key: string]: unknown;

    children?: TreeNodeBase[];
}

/**
 * 获取两个数组的交集 <10w数据
 * @param arr1 源数组1
 * @param arr2 源数组2
 */
export function getIntersection<T>(arr1: T[], arr2: T[]): T[] {
    const set = new Set<T>(arr2);
    return [...new Set<T>(arr1)].filter(x => set.has(x));
}

/**
 * 树形结构扁平化处理50万+节点无压力
 * @param tree          源数据
 * @param childrenKey   树形链接关系字段
 * @param transform     节点转换函数
 */
export function flatTreeToList<T extends TreeNodeBase = TreeNodeBase>(
    tree: TreeNodeBase[],
    childrenKey: string = 'children',
    transform: (node: TreeNodeBase, depth: number, parent: T | null) => T = (node) => ({...node} as T)
): T[] {
    const list: T[] = [];
    const stack: StackItem<T>[] = [];
    let index = 0;

    // 初始化栈（反向压入保证遍历顺序）
    for (let i = tree.length - 1; i >= 0; i--) {
        stack.push({
            node: tree[i],
            depth: 0,
            parent: null
        });
    }

    while (stack.length > 0) {
        const {node, depth, parent} = stack.pop()!;

        // 处理当前节点
        const clonedNode = transform(
            {...node, [childrenKey]: undefined},
            depth,
            parent
        );

        list[index++] = clonedNode;

        // 处理子节点
        const children = node[childrenKey] as TreeNode<T>[] | undefined;
        if (children?.length) {
            const childDepth = depth + 1;
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push({
                    node: children[i],
                    depth: childDepth,
                    parent: clonedNode
                });
            }
        }
    }

    return list;
}
