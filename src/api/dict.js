import request from '../utils/request.js'

// 根据字典类型查询字典数据信息
export async function getDicts(dictType){
    const res = await request.get('/system/dict/data/type/' + dictType)
    if(res?.code === 200){
        return res?.data
    }
    return Promise.reject(new Error(res?.msg));
}
