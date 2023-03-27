interface IstorageValue {
    data: any;
    delTimeStamp?:number
}
export const addLocalStorage = (key:string,data:any,expirationDate?:number)=>{
    const dateTimeStamp = new Date().getTime()
    const storageValue:IstorageValue = {
        data:data
    }
    if(expirationDate){
        storageValue.delTimeStamp = dateTimeStamp + expirationDate
    }
    const dataStr = JSON.stringify(storageValue)
    localStorage.setItem(key,dataStr)
}
export const getLocalStorage = (key:string)=>{
    const dataStr = localStorage.getItem(key)
    if(!dataStr || dataStr === 'undefined'){
        return undefined
    }
    const storageValue:IstorageValue = JSON.parse(dataStr)
    if(storageValue?.delTimeStamp){
        const timeStamp = new Date().getTime()
        if(storageValue.delTimeStamp <= timeStamp){
            removeLocalStorage(key)
            return undefined
        }
    }
    return storageValue.data
}
export const removeLocalStorage = (key:string)=>{
    localStorage.removeItem(key)
}
export const addSessionStorage = (key:string,data:any,expirationDate?:number)=>{
    const dateTimeStamp = new Date().getTime()
    const storageValue:IstorageValue = {
        data:data
    }
    if(expirationDate){
        storageValue.delTimeStamp = dateTimeStamp + expirationDate
    }
    const dataStr = JSON.stringify(storageValue)
    sessionStorage.setItem(key,dataStr)
}
export const getSessionStorage = (key:string)=>{
    const dataStr = sessionStorage.getItem(key)
    if(!dataStr || dataStr === 'undefined'){
        return undefined
    }
    const storageValue:IstorageValue = JSON.parse(dataStr)
    if(storageValue?.delTimeStamp){
        const timeStamp = new Date().getTime()
        if(storageValue.delTimeStamp <= timeStamp){
            removeSessionStorage(key)
            return undefined
        }
    }
    return storageValue.data
}
export const removeSessionStorage = (key:string)=>{
    sessionStorage.removeItem(key)
}
