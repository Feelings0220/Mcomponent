import type { PropType } from 'vue'
// 定义按钮类型，包括主要、成功、警告、危险和信息
export type ButtonType = 'primary'| 'success'| 'warning'| 'danger'| 'info'
// 定义按钮尺寸，包括大和小
export type ButtonSize = 'large' | 'small'
// 定义原生按钮类型，包括按钮、提交和重置
export type NativeType = 'button' | 'submit' | 'reset'

// 定义按钮属性的接口
export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  autofocus?: boolean;
  icon?: string;
  loading?: boolean;
}
// 定义按钮实例的接口
export interface ButtonInstance {
  ref: HTMLButtonElement
}
// 定义按钮属性的对象
export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>
  },
  size: {
    type: String as PropType<ButtonSize>,
  },
  plain: {
    type: Boolean
  },
  round: {
    type: Boolean
  },
  circle: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
}