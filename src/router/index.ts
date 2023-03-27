
import { createRouter, createWebHashHistory, createWebHistory, Router, RouteRecordNormalized, RouteRecordRaw } from "vue-router";
import config from '../wow/config'
import useMenu from "../modules/base/store/useMenu";
import { Loading } from "@element-plus/icons-vue";
import { getLocalStorage } from "@/utils";
interface IRouter extends Router {
	append:(data:any)=>void;
	clear:()=>void;
	find:(path:string)=>RouteRecordNormalized | undefined
}
// 扫描文件
const files = import.meta.glob(["/src/modules/*/{views,pages}/**/*", "!**/components"]);
console.log("files",files)
// 默认路由
const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "layout",
		component: ()=> import ("../modules/base/layout/index.vue"),
		children: [
			// {
			// 	path: "",
			// 	name: "home",
			// 	component: config.app.router.home
			// }
		]
	},
	{
		path: "/login",
		name: "login",
		component: ()=> import ("../modules/base/views/login.vue"),
	},
	{
		path: "/404",
		name: "404",
		component: ()=> import ("../modules/base/views/404.vue"),
	},
	// {
	// 	path: "/:pathMatch(.*)*",
	// 	component: () => import("/$/base/pages/error/404.vue")
	// }
];

// 创建路由器
const router = createRouter({
	history: config.app.router.mode == "history" ? createWebHistory() : createWebHashHistory(),
	routes
}) as IRouter;

const routerFind = (path:string)=>{
	console.log("router.getRoutes()",router.getRoutes())
	return router.getRoutes().find(e=>e.path === path) 
}
interface Irouter extends IMenu {
	isPage: boolean
}
// 添加路由
const routerAdd = (data:any)=>{
	const list = Array.isArray(data)?data:[data]
	console.log("list",list)
	list.forEach(item=>{
		if(!item.name){
			item.name = item.path.substring(1)
		}
		if (!item.meta) {
			item.meta = {};
		}
		if(!item.component){
			const url = item.viewPath
			if (url) {
				item.component = files["/src/modules/" + url+".vue"];
				console.log("files[url]",files,files["/src/modules/" + url+".vue"])
			} else {
				item.redirect = "/404";
			}
		}
		item.meta.dynamic = true;
		if (item.isPage) {
			router.addRoute(item);
		} else {
			router.addRoute("index", item);
		}
		
	})
}
// 注册路由
const register =  async (path:string)=>{
	// 先查找是否有注册
	const isExist = routerFind(path)
	if(!isExist){
		const menu = useMenu()
		// await Loading.wait();
		// 待注册列表
		const list:Irouter[] = []
		console.log("menu",menu)
		menu.find(e=>{
			list.push({
				...e,
				isPage: e.viewPath?.includes('/views') || false
			})
		})
		const r = list.find(e=>e.path === path)
		console.log("R",r)
		if(r){
			
			routerAdd(r)
		}
	} 
	return {
		isReg:!isExist,
		route:routerFind(path)
	}
}
// 路由守卫
router.beforeEach(async (to,from,next)=>{

	const {isReg,route} = await register(to.path)
	console.log("isReg",isReg,"route",route)
	const token = getLocalStorage("token")
	if(!route?.components){
		next(token?'/404':'/login')
	}else{
		if(isReg){
			next({ ...to, path: route.path });
		}else{
			// 登录成功
			if (token) {
				// 在登录页
				if (to.path.includes("/login")) {
					// Token 未过期
					// if (!storage.isExpired("token")) {
					// 	// 回到首页
					// 	return next("/");
					// }
					return next("/");
				} else {
					// 添加路由进程
					// process.add(to);
				}
			} else {
				// 忽略部分 Token 验证
				console.log()
				if (!config.ignore.token.find((e) => to.path == e)) {
					return next("/login");
				}
			}

			next();
		}
	}


})

export { router };
