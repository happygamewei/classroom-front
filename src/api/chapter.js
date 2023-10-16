import request from '../utils/request.js'

export async function getChapterByCourse(courseId) {
    const res = await request.get('/classroom/chapter/byCourseId/'+courseId)
    if(res.code === 200){
        return res.data
    }
    return Promise.reject(new Error(res.msg));
}

export async function getCourseContentInfo(courseId) {
    const res = await request.get('/classroom/course/courseContentById/'+courseId)
    if(res.code === 200){
        return res.data
    }
    return Promise.reject(new Error(res.msg));
}

export async function addChapterInfo(data) {
    const res = await request.post('/classroom/chapter', data)
    if(res.code === 200){
        return res?.msg
    }
    return Promise.reject(new Error(res.msg));
}

export async function updateChapterInfo(data) {
    const res = await request.put('/classroom/chapter', data)
    if(res.code === 200){
        return res?.msg
    }
    return Promise.reject(new Error(res.msg));
}


