<template>
<div
  class="vk-tooltip"
  ref="popperContainerNode"
  v-on="outerEvents"
>
  <div
    class="vk-tooltip__trigger"
    ref="triggerNode"
    v-on="events"
  >
    <slot />
  </div>
  <Transition :name="transition">
    <div
      v-if="isOpen"
      class="vk-tooltip__popper"
      ref="popperNode"
    >
      <slot name="content">
        {{content}}
      </slot>
      <div id="arrow" data-popper-arrow></div>
    </div>
  </Transition>
</div>
</template>
<script setup lang="ts">
import { ref, watch, reactive, onUnmounted, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import { debounce } from 'lodash-es'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import useClickOutside from '../../hooks/useClickOutside'
defineOptions({
  name: 'VkTooltip'
})
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: null | Instance = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
let openTimes = 0
let closeTimes = 0
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      }
    ],
    ...props.popperOptions
  }
})

// 打开工具提示的方法
const open = () => {
  openTimes++
  console.log('open times', openTimes)
  isOpen.value = true
  emits('visible-change', true)

}
// 关闭工具提示的方法
const close = () => {
  closeTimes++
  console.log('close times', closeTimes)
  isOpen.value = false
  emits('visible-change', false)
}
// 防抖处理的打开方法
const openDebounce = debounce(open, props.openDelay)
// 防抖处理的关闭方法
const closeDebounce = debounce(close, props.closeDelay)

// 最终的打开方法，取消关闭防抖并调用打开防抖
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
// 最终的关闭方法，取消打开防抖并调用关闭防抖
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

// 切换工具提示显示状态的方法
const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}
// 使用点击外部区域关闭工具提示的钩子
useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
  if (isOpen.value) {
    emits('click-outside', true)
  }
})
// 绑定事件的方法
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
if (!props.manual) {    
  attachEvents()
}
// 监听manual属性的变化，决定是否绑定事件
watch(() => props.manual, (isManual) => {
  if (isManual) {
    events = {}
    outerEvents = {}    
  } else {
    attachEvents()
  }
})
// 监听trigger属性的变化，重新绑定事件
watch(() => props.trigger, (newTrigger, oldTrigger) => {
  if (newTrigger !== oldTrigger) {
    // clear the events
    events = {}
    outerEvents = {}
    attachEvents()
  }
})
// 监听isOpen的变化，决定是否创建或销毁Popper实例
watch(isOpen, (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    } else {
      popperInstance?.destroy()
    }
  }
}, { flush: 'post'})

// 组件卸载时销毁Popper实例
onUnmounted(() => {
  popperInstance?.destroy()
})
// 暴露组件的方法
defineExpose<TooltipInstance>({
  'show': openFinal,
  'hide': closeFinal
})
</script>