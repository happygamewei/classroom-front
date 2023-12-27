import request from '../utils/request.js'

//获得所有测试
export async function getAllTest(){
    const res = await request.get("/classroom/test/list")

    if(res.code === 200){
        return res.rows
    }
    return Promise.reject(new Error(res.msg));
}

//获得未交人数
export async function GetNotCorrected(testid){

    const res = await request.get("/classroom/test/GetNotCorrected"+testid)

    if(res.code === 200){
        return res.rows
    }
    return Promise.reject(new Error(res.msg));

}

//添加测试
export async function AddTest(data){

    return request({
        url: '/classroom/test/AddTest',
        method: 'post',
        data: data
      })

}

//修改测试
export async function EditTest(data){

    return request({
        url: '/classroom/test/EditTest',
        method: 'post',
        data: data
      })

}

//删除测试
export async function DeleteTest(id){
    return request({
        url:'/classroom/test/deleteTest/'+id,
        method:'delete',
        data: id
    })
}

//查询测试
export async function SelectTest(id){

    const res = await request.get('/classroom/test/selectTest/'+id)
    if(res.code === 200){
        return res.data
    }

    return Promise.reject(new Error(res.msg))
    // return request({
    //     url:'/classroom/test/selectTest/'+id,
    //     method:'post',
    //     data: id
    // })
}

//获得所有章节
export async function getAllChapters(){
    const res = await request.get("/classroom/chapter/list")

    if(res.code === 200){
        return res.rows
    }
    return Promise.reject(new Error(res.msg));
}

//查询用户身份
export async function CheckRole(id){
    const res = await request.post("/classroom/test/CheckRole"+id)

    if(res.code === 200){
        return res.rows
    }
    return Promise.reject(new Error(res.msg));
}
/**
 * 查找这个课程所有的章节
 */
export async function getAllChapterById(courseId){
    const res=await request.get('classroom/topic/byCourseId/'+courseId)
    console.log("章节信息："+res)
    if(res.code==200)
    return res.data
  return Promise.reject(new Error(res.Error));
  }

