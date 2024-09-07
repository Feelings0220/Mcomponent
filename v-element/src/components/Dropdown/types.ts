import type { VNode } from 'vue'
import type { TooltipProps } from '../Tooltip/types'

// 定义Dropdown组件的属性接口，继承自TooltipProps，并添加menuOptions和hideAfterClick属性
export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[];
  hideAfterClick?: boolean;
}

// 定义菜单选项的接口，包括标签、键、是否禁用和是否分隔的属性
export interface MenuOption {
  label: string | VNode;
  key: string | number;
  disabled?: boolean;
  divided?: boolean;
}

// 定义Dropdown组件触发的事件接口，包括visible-change和select事件
export interface DropdownEmits {
  (e:'visible-change', value: boolean) : void;
  (e:'select', value: MenuOption) : void;
}

// 定义Dropdown组件实例的接口，包括show和hide方法
export interface DropdownInstance {
  show: () => void;
  hide: () => void;
}