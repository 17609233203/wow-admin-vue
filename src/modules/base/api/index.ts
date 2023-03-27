import request from '../../../plug/request'
import urls from './urls'

export function login(params:IloginReq):Promise<IloginRes> {
    return request.post(urls.login,params).then(res=>{
        console.log("res.data",res.data)
        return res?.data
    })
}