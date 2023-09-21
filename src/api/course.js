import request from '../utils/request.js'

export async function getAllCourse() {
    const res = await request.get('/classroom/course/list')
    if(res?.code === 200){
        return res?.rows
    }
    return Promise.reject(new Error(res?.msg));
}

export async function getOneCourse(id) {
    const res = await request.get('/classroom/course/byId/'+id)
    if(res?.code === 200){
        return res?.data
    }
    return Promise.reject(new Error(res?.msg));
}
