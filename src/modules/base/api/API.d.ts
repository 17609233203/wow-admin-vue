interface IloginReq {
    userName: string;
    passWord: string;
}
interface IloginRes {
    token: string;
}



interface IMenu {
    id: number;
    parentId: number | null;
    name: string;
    path: string | null;
    perms: string | null;
    types: 0|1|2;
    icon: string | null;
    orderNum: number;
    viewPath:string | null;
    isShow:0 | 1;
}