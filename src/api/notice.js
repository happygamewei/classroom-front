import request from '../utils/request.js'

export async function getAllNotice() {
    const res = await request.get('/classroom/notice/list')
    if(res.code === 200){
        return res.rows
    }
    return Promise.reject(new Error(res.msg));
}

export async function getOneNotice(id) {
    const res = await request.get('/classroom/notice/byId/'+id)
    if(res.code === 200){
        return res.data
    }
    return Promise.reject(new Error(res.msg));
}
export async function addNotice(data){
 const res = await request.post('/classroom/notice/add',data)
    if(res.code === 200){
        return res?.data
    }
    return Promise.reject(new Error(res.msg));
}

export async function deleteNotice(data){
    const res = await request.delete('/classroom/notice/delete/'+data)
    if(res.code === 200){
        return res?.data
    }
    return Promise.reject(new Error(res.msg));
}

export async function getAllComment(data){
    const res = await request.get('/classroom/notice/commentInNotice/'+data)
    if(res.code === 200){
        return res.data
    }
    return Promise.reject(new Error(res.msg));
}

export async function update(data){
    const res = await request.post('/classroom/notice/edit',data)
    if(res.code === 200){
        return res.data
    }
    return Promise.reject(new Error(res.msg));
}


