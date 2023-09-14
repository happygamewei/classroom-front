import request from '../utils/request.js'

export async function getChapterByCourse(courseId) {
    const res = await request.get('/classroom/chapter/byCourseId/'+courseId)
    console.log(res)
    if(res.code === 200){
        return res.rows
    }
    return Promise.reject(new Error(res.msg));
}
