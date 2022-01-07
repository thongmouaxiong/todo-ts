import API from './api'

export const postAPI =async (url:string, post:object, token?:string) => {
    const res = await API.post(`/${url}`, post
    // , 
    // {
    //     headers: {
    //         Authorization: token
    //     }
    // }
    )
    return res
}

export const getOneAPI =async (url:string, keyword:string) => {
    const res = await API.get(`/${url}/${keyword}`)
    return res
}

export const updateAPI =async (url:string, update:object) => {
    const res = await API.put(`/${url}`, update)
    return res
}

export const deleteAPI =async (url:string, keyword:object) => {
    const res = await API.delete(`/${url}`, {data:keyword})
    return res
}
