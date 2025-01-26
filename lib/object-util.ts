/**
 * 深拷贝对象
 * @param target 目标对象
 * @returns {T} 返回深拷贝后的对象
 */
export function deepClone<T>(target: T): T {
    let result: T;

    if (typeof target === 'object' && target !== null) {
        if (Array.isArray(target)) {
            result = [] as T;
            for (const item of target) {
                (result as unknown as Array<any>).push(deepClone(item));
            }
        } else if (target.constructor === RegExp) {
            result = target as T;
        } else if (target.constructor === Date) {
            result = target as T;
        } else {
            result = {} as T;
            for (const key in target) {
                if (Object.prototype.hasOwnProperty.call(target, key)) {
                    (result as any)[key] = deepClone((target as Record<string, any>)[key]);
                }
            }
        }
    } else {
        result = target;
    }

    return result;
}
