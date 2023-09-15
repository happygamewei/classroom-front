import request from '../utils/request.js'

export async function getChapterByCourse(courseId) {
    const res = await request.get('/classroom/chapter/byCourseId/'+courseId)
    if(res.code === 200){
        return res.data
    }
    return Promise.reject(new Error(res.msg));
}
