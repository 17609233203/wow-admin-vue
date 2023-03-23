import {reactive} from 'vue'
// 存放menu
const useMenu = ()=>{
    const store = reactive<IMenu[]>([
        {
            id: 1,
            parentId: null,
            name: '工作台',
            path: '/',
            perms: null,
            types: 0,
            icon: '',
            orderNum: 0,
            viewPath: null,
            isShow:1,
        },
        {
            id: 1,
            parentId: null,
            name: 'demoNews',
            path: '/demo',
            perms: null,
            types: 0,
            icon: '',
            orderNum: 0,
            viewPath: 'demo/views/news',
            isShow:1,
        }
    ])
    return store
}

export default useMenu