<template>
  <div>
    <span>
      <ordered-list-outlined style="color: blue" />
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent style="color: blue">
          排序
        </a>
        <template #overlay>
          <a-menu v-model="option">
            <a-menu-item @click="handleItem(1)">
              <a value="1" href="javascript:;">按添加时间升序</a>
            </a-menu-item>
            <a-menu-item @click="handleItem(2)">
              <a value="2" href="javascript:;">按添加时间降序</a>
            </a-menu-item>
            <a-menu-item @click="handleItem(3)">
              <a value="3" href="javascript:;">按名称升序</a>
            </a-menu-item>
            <a-menu-item @click="handleItem(4)">
              <a value="4" href="javascript:;">按名称降序</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </span>
    <a-button class="btn2">批量操作</a-button>

    <span class="btn1">
      <a-switch @change="handleSwitchChange" v-model:checked="checked" />
      是否允许学生话题讨论
    </span>
    <span>
      <a class="download" style="color: blue">话题下载</a>
    </span>
    <span class="topLeft">
      <a><pie-chart-outlined /> 统计</a>
    </span>
    <a-button class="btn3" type="primary" @click="handleAdd"
      >+添加话题</a-button
    >
  </div>
</template>

<script>
import { Button, Modal, Switch } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { userCourseId } from "/src/store/index.js";
import { OrderedListOutlined, PieChartOutlined } from "@ant-design/icons-vue";
import { topicCount } from "../../api/topic.js";
import { inject } from "vue";
import mitter from "../../main.js";
export default {
  components: {
    OrderedListOutlined,
    PieChartOutlined,
    "a-modal": Modal,
    "a-button": Button,
    "a-switch": Switch,
  },
  setup() {
    const toCourseId = userCourseId();
    const courseId = ref();
    const count = ref(0);
    const total = 0;
    const reply = 0;
    const value = "";
    const content = "";
    const checked = ref(true);
    const showMode = ref(true);
    const option = ref();
    onMounted(() => {
      courseId.value = toCourseId.getCourseId();
      getTopicCount(courseId);
      handleClick();
    });

    const getTopicCount = (courseId) => {
      topicCount(courseId.value)
        .then((res) => {
          count.value = res;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const handleClick = () => {
      mitter.emit("checked", checked.value);
    };
    const handleSwitchChange = (value) => {
      checked.value = value;
      handleClick();
    };
    const handleAdd = () => {
      mitter.emit("showMode", showMode.value);
    };
    const handleItem = (optionselect) => {
      console.log("option：" + optionselect);
      mitter.emit("option-selected", optionselect);
    };
    return {
      courseId,
      count,
      reply,
      total,
      content,
      value,
      checked,
      handleSwitchChange,
      handleAdd,
      option,
      handleItem,
    };
  },
};
</script>

<style>
.middleRight {
  margin-right: 50vh;
  float: left;
}
.middleLeft {
  margin-left: 10vh;
}
.ant-dropdown-link {
  margin-right: 5vh;
}
.topLeft {
  position: relative;
  right: -3vh;
  color: blue;
}
.btn1 {
  margin-left: 3vh;
}
.btn2 {
  margin-left: -2vh;
}
.download {
  margin-left: 3vh;
}
.btn3 {
  margin-left: 105vh;
  bottom: 4vh;
}
</style>
