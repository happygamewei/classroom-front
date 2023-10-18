<template>
  <div style="border: 1px solid #ccc; height: 30vh">
    <Toolbar
        :editor="editorRef"
        :default-config="toolbarConfig"
        mode="default"
    />
    <Editor
        v-model="modelValue"
        :default-config="editorConfig"
        mode="default"
        @on-change="handleChange"
        @on-created="handleCreated"
    />
  </div>
</template>
<script setup>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import {ref, shallowRef} from "vue";
const props = defineProps({
  modelValue: {
    type: [String],
    default: ""
  },
});
const modelValue = ref("")
const emit = defineEmits(["updateValue"]);
const editorRef = shallowRef();
const toolbarConfig = ref({});
const editorConfig = ref({
  placeholder: "请输入..."
});
const handleCreated = (editor) => {
  editorRef.value = editor;
};
function handleChange(editor) {
  modelValue.value = editor.getHtml();
  emit("updateValue", modelValue.value)
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>

