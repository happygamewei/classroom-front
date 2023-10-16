import request from "../utils/request.js";

export async function addComment(comment,id) {
    const res = await request.post('/classroom/comment?id='+id,comment)
    if(res.code === 200){
        return res?.msg
    }
    return Promise.reject(new Error(res.msg));
}

export async function getComment(id) {
    const res = await request.get('/classroom/comment/list',id)
    if(res.code === 200){
        return res.data
    }
    return Promise.reject(new Error(res.msg));
}
export async function getCommentListTotal(data) {
    const res = await request.get('/classroom/comment/totalcount/'+data)
    if(res.code === 200){
        return res.data
    }
    return Promise.reject(new Error(res.msg));

}
export async function deleteCommentNotice(data){
    const res = await request.delete('/classroom/comment/delete/'+data)
    if(res.code === 200){
        return res?.data
    }
    return Promise.reject(new Error(res.msg))
}
