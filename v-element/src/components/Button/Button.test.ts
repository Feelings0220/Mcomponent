import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '../Icon/Icon.vue'

describe('Button.vue', () => { 
  test('basic button', () => {
    // 挂载Button组件，并传递props和slots
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })
    // 打印组件的HTML结构
    console.log(wrapper.html())
    // 断言组件的class包含'vk-button--primary'
    expect(wrapper.classes()).toContain('vk-button--primary')
    // 断言默认slot的内容为'button'
    expect(wrapper.get('button').text()).toBe('button')
    // 触发按钮的点击事件
    wrapper.get('button').trigger('click')
    // 打印触发的事件
    console.log(wrapper.emitted())
    // 断言事件列表中包含'click'事件
    expect(wrapper.emitted()).toHaveProperty('click')
  })
  test('disabled', () => {
    // 挂载Button组件，并传递disabled属性
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }
    })
    // 断言组件的disabled属性被定义
    expect(wrapper.attributes('disabled')).toBeDefined()
    // 断言按钮元素的disabled属性被定义
    expect(wrapper.find('button').element.disabled).toBeDefined()
    // 触发按钮的点击事件
    wrapper.get('button').trigger('click')
    // 断言事件列表中不包含'click'事件
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
  test('icon', () => {
    // 挂载Button组件，并传递icon属性和全局stubs
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    // 查找FontAwesomeIcon组件
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    // 断言组件存在
    expect(iconElement.exists()).toBeTruthy()
    // 断言组件的icon属性为'arrow-up'
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })
  test('loading', () => {
    // 挂载Button组件，并传递loading属性和全局stubs
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['Icon']
      }
    })
    // 打印组件的HTML结构
    console.log(wrapper.html())
    // 查找Icon组件
    const iconElement = wrapper.findComponent(Icon)
    // 断言组件存在
    expect(iconElement.exists()).toBeTruthy()
    // 断言组件的icon属性为'spinner'
    expect(iconElement.attributes('icon')).toBe('spinner')
    // 断言组件的disabled属性被定义
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})