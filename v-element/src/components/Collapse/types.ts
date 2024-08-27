import type { Ref, InjectionKey } from 'vue'
// 定义NameType类型，可以是字符串或数字
export type NameType = string | number

// 定义Collapse组件的属性接口
export interface CollapseProps {
  modelValue: NameType[];
  accordion?: boolean;
}
// 定义CollapseItem组件的属性接口
export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

// 定义Collapse组件的上下文接口
export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}

// 定义Collapse组件的事件接口
export interface CollapseEmits {
  (e:'update:modelValue', values: NameType[]) : void;
  (e:'change', values: NameType[]) : void;
}
// 定义Collapse组件上下文的注入键
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')