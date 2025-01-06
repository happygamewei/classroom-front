<template>
  <div>
    <TopicsComponent1></TopicsComponent1>
    <TopicsComponent4></TopicsComponent4>
    <TopicsComponent2 :key="key"></TopicsComponent2>
  </div>
</template>
<script>
import { ref, provide } from "vue";
import TopicsComponent1 from "/src/components/Topics/component1.vue";
import TopicsComponent2 from "/src/components/Topics/component2.vue";
import TopicsComponent4 from "/src/components/Topics/component4.vue";
import mitter from "../../../main.js";
export default {
  components: {
    TopicsComponent1,
    TopicsComponent2,
    TopicsComponent4,
  },
  setup() {
    const key = ref(0);

    mitter.on("refresh", (data) => {
      console.log("更新前：" + key.value);
      key.value += 1;
      console.log("更新后：" + key.value);
    });
    return {
      key,
    };
  },
};
</script>
