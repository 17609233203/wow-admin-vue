const getUrlParam = (name:string)=>{
    const url = new URLSearchParams(location.href)
    return url.get(name)
}