<template>
  <div
    class="vk-dropdown"
  >
  <Tooltip 
    :trigger="trigger" 
    :placement="placement"
    :popper-options="popperOptions"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :manual="manual"
    @visible-change="visibleChange"
    ref="tooltipRef"
  >
    <slot />
    <template #content>
      <ul class="vk-dropdown__menu">
        <template v-for="item in menuOptions" :key="item.key">
          <li     
            v-if="item.divided"
            role="separator"
            class="divided-placeholder"
          />
          <li
            class="vk-dropdown__item"
            @click="itemClick(item)"
            :class="{'is-disabled': item.disabled, 'is-divided': item.divided }"
            :id="`dropdown-item-${item.key}`"
          >
            <RenderVnode :vNode="item.label"/>
          </li>
        </template>
      </ul>
    </template>
  </Tooltip>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { DropdownProps, DropdownInstance, DropdownEmits, MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import RenderVnode from '../Common/RenderVnode'
import type { TooltipInstance } from '../Tooltip/types'

// 定义组件名称
defineOptions({
  name: 'VkDropdown'
})

// 定义组件的属性和默认值
const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })

// 定义组件的事件
const emits = defineEmits<DropdownEmits>()

// 引用Tooltip组件实例
const tooltipRef = ref<TooltipInstance | null>(null)

// 处理Tooltip可见性变化事件
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}

// 处理菜单项点击事件
const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return
  }
  emits('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}

// 暴露组件的方法
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>