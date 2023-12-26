import request from '../utils/request.js'


/** 查询该课程所有的话题管理列表 */
export async function getList(courseId) {
    const res =await request.get('/classroom/topic/list/'+courseId)
    
        if(res.code==200)
          console.log("数据"+res.data)
            return res.data;
        
  };
/**
 * 获取课程话题的数量
 */
export async function topicCount(courseId){
  const res= await request.get('/classroom/topic/allTopicCount/'+courseId)
  if(res.code==200)
  { return res.data}
  return Promise.reject(new Error(res.Error));
}
/**获取这个话题的详细信息 */
export async function getDetail(topicId){
  
  const res=await request.get('/classroom/topic/'+topicId)

  if(res.code==200){
    console.log("取到对象啦！！！！")
    return res.data;
  }
  return Promise.reject(new Error(res.Error));
}
/**
 *获取当前用户的信息
 */
export async function getUserInfo(){
  const res=await request.get('/getInfo')

  if(res.code==200){
    return res.user;
  }
  return Promise.reject(new Error (res.Error));
}
/**
 * 添加话题的评论
 */
export async function postComment(courseId,userId,topicId,comment){
  const res=await request.post('/classroom/topic/addTopicComment/'+courseId+'/'+userId+'/'+topicId+'/'+comment);
  
}
/**
 *添加回复的评论
 */
 export async function replyComment(courseId,userId,topicId,comment,parentId){
  console.log("comment:"+comment)
  const res=await request.post('/classroom/topic/addTopicReplyComment/'+courseId+'/'+userId+'/'+topicId+'/'+comment+'/'+parentId);
  
}
/**
 * 点赞
 */
export async function likeCount(userId,topicId){
 const res=await request.post('/classroom/topic/likeCount/'+userId+'/'+topicId)
  
}
/**
 * 判断是否第一次进入话题
 */
export async function isJoinTopic(userId,topicId){
  const res=await request.post('classroom/topic/isJoinTopic/'+userId+'/'+topicId)
}
/**
 * 获取所有话题的评论
 */
export async function getAllTopicComments(topicId){
  const res=await request.get('classroom/topic/getAllComments/'+topicId)
   
  if(res.code==200){
    console.log(res);
    console.log(res.data);
    return res.data
  }
    
  return Promise.reject(new Error(res.Error))
}
/**
 * 获取话题所有评论的数量
 *
 */
export async function findCommentCounts(topicId){
 
  const res =await request.get('classroom/topic/commentCount/'+topicId)

  if(res.code==200)
  return res.data
return Promise.reject(new Error(res.Error))
}


/**
 * 添加话题
 */
export async function addTopic(courseId,topic,userId){
  console.log(topic)
  const res=await request.post('classroom/topic/'+courseId+'/'+userId,topic,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  )
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
/**
 * 查找话题相关的用户
 * 
 */
export async function findUserByTopicId(topicId){
  const res=await request.get('classroom/topic/findUserByTopicId/'+topicId)
  if(res.code==200)
    return res.data;
  return Promise.reject(new Error(res.Error));

}
/**
 * 请求字典
 */
export async function getDictionaryByType(type){
  console.log("typetyepe:"+type)
  const res=await request.get('classroom/topic/getDictionaryByType/'+type)
  if(res.code==200){
    return res.data;
  }

  return Promise.reject(new Error(res.Error)); 
}
//删除评论
export async function deleteComment(commentVo){
  console.log("评论："+commentVo)
  const res=await request.post('classroom/topic/deleteComment',commentVo)
}
//评论的点赞功能
export async function commentLikes(userId,commentId){
await request.get('classroom/topic/commentLikes/'+userId+'/'+commentId)
}
//判断评论点赞状态
export async function LikeState(userId,commentId){
  const res=await request.get('classroom/topic/likeState/'+userId+'/'+commentId)
  if(res.code==200)
  return res.data;
return Promise.reject(new Error(res.Error));
}
//删除话题
export async function deleteTopicById(topicId){
  const res=await request.delete('classroom/topic/delete/'+topicId)
}
//更新话题
export async function updateTopic(topic){
  const res =await request.put('classroom/topic',topic)

}
