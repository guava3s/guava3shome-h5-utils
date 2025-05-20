export function getIntersection<T>(arr1: T[], arr2: T[]): T[] {
    const set = new Set<T>(arr2);
    return [...new Set<T>(arr1)].filter(x => set.has(x));
}
