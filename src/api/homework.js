import request from '../utils/request.js'

export async function fetchHomeworkData() {
    const res = await request.get('/classroom/homework/list');
    console.log(res)
    if(res?.code === 200){
        return res?.rows
    }
    return Promise.reject(new Error(res?.msg));
}
export async function addHomeworkT(data) {
    return request({
        url: '/classroom/homework/AddHomework',
        method: 'post',
        data: data
    })
}