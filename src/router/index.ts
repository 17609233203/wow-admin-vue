
import { createRouter, createWebHashHistory, createWebHistory, Router, RouteRecordNormalized, RouteRecordRaw } from "vue-router";
import config from '../wow/config'
interface IRouter extends Router {
	append:(data:any)=>void;
	clear:()=>void;
	find:(path:string)=>RouteRecordNormalized | undefined
}
// console.log("layout",layout)
// 扫描文件
const files = import.meta.glob(["/src/modules/*/{views,pages}/**/*", "!**/components"]);
// 默认路由
const routes: RouteRecordRaw[] = [
	{
		path: "/login",
		name: "login",
		component: ()=> import ("../modules/base/view/login.vue"),
		children: [
			// {
			// 	path: "",
			// 	name: "home",
			// 	component: config.app.router.home
			// }
		]
	},
	{
		path: "/",
		name: "layout",
		component: ()=> import ("../layout/index.vue"),
		children: [
			// {
			// 	path: "",
			// 	name: "home",
			// 	component: config.app.router.home
			// }
		]
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



export { router };
