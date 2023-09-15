import {createPinia, defineStore} from "pinia";

export const userCourseId = defineStore('courseId', {
    state: () => {
        courseId: null
    },
    actions: {
        getCourseId() {
            return this.courseId
        },
        setCourseId(id) {
            this.courseId = id
        }
    }
})
