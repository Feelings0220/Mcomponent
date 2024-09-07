import type { Placement, Options } from '@popperjs/core'
export interface TooltipProps {
  // 提示框的内容
  content? : string;
  // 触发方式，默认为 hover
  trigger?: 'hover' | 'click';
  // 位置
  placement?: Placement;
  // 是否手动控制
  manual?: boolean;
  // popperjs 的选项
  popperOptions?: Partial<Options>;
  // 动画名称
  transition?: string;
  // 打开延迟，单位毫秒
  openDelay?: number;
  // 关闭延迟，单位毫秒
  closeDelay?: number;
}

export interface TooltipEmits {
  // 显示隐藏变化
  (e: 'visible-change', value: boolean) : void;
  // 点击外部区域
  (e: 'click-outside', value: boolean) : void;
}

export interface TooltipInstance {
  // 显示
  show: () => void;
  // 隐藏
  hide: () => void;
}