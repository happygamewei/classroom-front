import request from '../utils/request.js'

export async function getResource(courseId) {
    const res = await request.get('/classroom/resource/byCourseId/'+courseId)
    if(res.code === 200){
        return res.data
    }
    return Promise.reject(new Error(res.msg));
}

export async function addResourceInfo(data){
    const res = await request.post('/classroom/resource',data)
    if(res.code === 200){
        return res?.msg
    }
    return Promise.reject(new Error(res.msg));
}