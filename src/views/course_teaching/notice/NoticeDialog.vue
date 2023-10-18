<template>

  <div class="dialog" style="width: 60vw;">

    <el-dialog v-model="dialogFormVisible" title="添加公告" width="60vw">
      <hr class="hr1">
      <el-form :model="form" class="form">

        <el-form-item label="公告标题" :hide-required-asterisk="false" required class="form_1">
          <el-input
              v-model="form.name"
              maxlength="75"
              placeholder="Please input"
              show-word-limit
              type="text"
          />
        </el-form-item>
        <!--2. 富文本编辑-->
        <div style="border: 1px solid #ccc">
          <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
          />
          <Editor
              style="height: 100px; overflow-y: hidden;"
              v-model="valueHtml"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
          />
        </div>
        <!--     3.   -->
        <div>
          <div style="margin-top: 10px">
            <el-row :gutter="5">
              <span>活动类型标签</span>
              <el-input
                  style="width:15vw;margin-left: 20px"
                  class="w-30 m-5"
                  v-model="form.name"
                  maxlength="10"
                  show-word-limit
                  type="text"
              />
              <div style="margin-left: 40px">
                <span>知识共享协议</span>
                <el-select v-model="value" class="m-2" placeholder="Select" style="width:15px;margin-left: 20px">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </div>
            </el-row>
          </div>
          <div style="margin-top: 10px">
            <el-row :gutter="5">
              <span>应用环节</span>
              <el-select v-model="value" class="m-2" placeholder="请选择" style="margin-left: 20px">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
              <div style="margin-left: 40px">
                <span>所属章节</span>
                <el-select v-model="value" class="m-2" placeholder="请选择" style="width:15px;margin-left: 20px">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </div>
            </el-row>
          </div>
          <div>
            <el-switch v-model="isPublish"/>
            是否立即发布
          </div>

        </div>


      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <hr style="width: 60vw;margin-left: -20px;">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script  lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, onMounted, reactive, ref, shallowRef} from "vue";
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
const dialogFormVisible = ref(false);
const props = defineProps({
  msg:String,
})
dialogFormVisible.value = props.msg;

console.log("dialogFormVisible",dialogFormVisible)
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})


// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})

const toolbarConfig = {}
const editorConfig = {placeholder: '请输入内容...'}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
//下拉框
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: '不使用',
  },
  {
    value: 'Option2',
    label: '使用',
  }
]
const isPublish = ref(true)
</script>

<style scoped>

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 20vw;
}

.el-input {
  width: 20vw;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.hr1 {
  position: absolute;
  left: 0px;
  top: 44px;
  width: 60vw;
}

.el-dialog {
  border-radius: 10px;
  text-align: left
}
</style>
