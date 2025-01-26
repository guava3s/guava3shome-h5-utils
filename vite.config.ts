import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'h5-utils',  // 工具库的全局名称
            fileName: 'guava3shome-h5-utils',
            formats: ['es', 'cjs'],  // 支持 ES 模块和 CommonJS
        },
        rollupOptions: {
            external: ['vue'],  // 如果有外部依赖，如 Vue，可以排除
        },
    },
});
