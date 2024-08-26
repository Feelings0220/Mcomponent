<template>
  <button
    ref="_ref"
    class="vk-button"

    :class="{
      //键值对对象
      //key键代表css选择器，value值代表布尔值，如果传入该Prop则为真，则添加该类名
      [`vk-button--${type}`]: type,//[]里写动态的属性名（key键名）
      [`vk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading" />
    <Icon :icon="icon" v-if="icon" />
    <span>
      <slot ></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
// 导入 Vue 的 ref 函数用于创建响应式引用
import { ref } from 'vue'
// 导入 Button 组件的属性类型定义
import type { ButtonProps } from './types'
// 导入 Icon 组件
import Icon from '../Icon/Icon.vue'
// 定义组件的选项，设置组件名称为 'VkButton'
defineOptions({
  name: 'VkButton'
})

// 使用 withDefaults 函数为 ButtonProps 类型的属性设置默认值
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

// 创建一个对 HTMLButtonElement 的响应式引用
const _ref = ref<HTMLButtonElement>()

// 暴露 ref 给父组件
defineExpose({
  ref: _ref
})
</script>

<!-- 添加 "scoped" 属性以限制 CSS 仅作用于此组件 -->
<style scoped>

</style>