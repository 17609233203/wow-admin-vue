import request from '../../../plug/request'
import urls from './urls'

export function login(params:IloginReq):Promise<IloginRes> {
    return request.post(urls.login,params).then(res=>{
        return res?.data
    })
}