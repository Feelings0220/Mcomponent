<template>
  <div
    class="vk-collapse"
  >
    <slot/>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'
// 定义组件名称
defineOptions({
  name: 'VkCollapse'
})
// 定义组件接收的props
const props = defineProps<CollapseProps>()
// 定义组件触发的emit
const emits = defineEmits<CollapseEmits>()
// 定义一个响应式的activeNames
const activeNames = ref<NameType[]>(props.modelValue)

// 监听props.modelValue的变化
watch(() => props.modelValue, () => {
  activeNames.value = props.modelValue
})

// 如果props.accordion为true，则警告
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one acitve item')
}
// 定义一个处理item点击的方法
const handleItemClick = (item: NameType) => {
  let _activeNames = [...activeNames.value ]
  // 如果props.accordion为true，则只允许一个item为active
  if (props.accordion) {
    _activeNames = [ activeNames.value[0] === item ? '' : item ]
    activeNames.value = _activeNames
  } else {
    // 否则，判断item是否存在于activeNames中
    const index = _activeNames.indexOf(item)
    // 如果存在，则删除数组对应的一项
    if (index > -1) {
      _activeNames.splice(index, 1)
    } else {
      // 如果不存在，则插入对应的name
      _activeNames.push(item)
    }
    activeNames.value = _activeNames
  }
  // 触发update:modelValue和change事件
  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
}
// 提供collapseContextKey
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>
