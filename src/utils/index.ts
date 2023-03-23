export const addLocalStorage = (key:string,data:any)=>{
    const dataStr = JSON.stringify(data)
    localStorage.setItem(key,dataStr)
}
export const getLocalStorage = (key:string)=>{
    const dataStr = localStorage.getItem(key)
    if(!dataStr || dataStr === 'undefined'){
        return undefined
    }
    return JSON.parse(dataStr)
}
export const removeLocalStorage = (key:string)=>{
    localStorage.removeItem(key)
}
export const addSessionStorage = (key:string,data:any)=>{
    const dataStr = JSON.stringify(data)
    sessionStorage.setItem(key,dataStr)
}
export const getSessionStorage = (key:string)=>{
    const dataStr = sessionStorage.getItem(key)
    if(!dataStr || dataStr === 'undefined'){
        return undefined
    }
    return JSON.parse(dataStr)
}
export const removeSessionStorage = (key:string)=>{
    sessionStorage.removeItem(key)
}
