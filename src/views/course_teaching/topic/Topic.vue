<template>
  <div>
    <TopicsComponent1 :value="isPost"></TopicsComponent1>
    <TopicsComponent4></TopicsComponent4>
    <TopicsComponent2></TopicsComponent2>
  </div>
</template>
<script>
import { ref, provide } from "vue";
import TopicsComponent1 from "/src/components/Topics/component1.vue";
import TopicsComponent2 from "/src/components/Topics/component2.vue";
import TopicsComponent4 from "/src/components/Topics/component4.vue";
export default {
  components: {
    TopicsComponent1,
    TopicsComponent2,
    TopicsComponent4,
  },
  setup() {
    const isPost = ref();

    provide("isPost", isPost);

    return {
      isPost,
    };
  },
};
</script>
