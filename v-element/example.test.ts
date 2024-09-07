import { test, describe, vi, expect, Mocked } from 'vitest'
import { testFn, request } from './utils'
import axios from 'axios'

// 自动模拟 axios 模块
vi.mock('axios')
// 将 axios 模块断言为 Mocked 类型，以便在测试中使用模拟的方法和属性
const mockedAxios = axios as Mocked<typeof axios>

// 描述测试套件
describe('functions', () => {
  // 测试创建一个 mock 函数
  test('create a mock function', () => {
    // 创建一个 mock 函数
    const callback = vi.fn()
    // 调用被测试函数，传入 mock 函数作为回调
    testFn(12, callback)
    // 断言 mock 函数被调用
    expect(callback).toHaveBeenCalled()
    // 断言 mock 函数被调用时传入了参数 12
    expect(callback).toHaveBeenCalledWith(12)
  })

  // 测试监视方法
  test('spy on method', () => {
    // 创建一个对象，包含一个方法
    const obj = {
      getName: () => 1
    }
    // 监视 obj 对象的 getName 方法
    const spy = vi.spyOn(obj, 'getName')
    // 调用 getName 方法
    obj.getName()
    // 断言 getName 方法被调用了一次
    expect(spy).toHaveBeenCalled()
    // 再次调用 getName 方法
    obj.getName()
    // 断言 getName 方法被调用了两次
    expect(spy).toHaveBeenCalledTimes(2)
  })

  // 测试 mock 第三方模块
  test('mock third party module', async () => {
    // 模拟 axios.get 方法，返回一个 resolved 的 Promise，值为 { data: 123 }
    mockedAxios.get.mockResolvedValue({ data: 123 })
    // 调用被测试的 request 函数
    const result = await request()
    // 断言 request 函数返回的结果为 123
    expect(result).toBe(123)
  })
})







// import {  test, describe, vi, expect, Mocked } from 'vitest'
// import { testFn, request } from './utils'
// import axios from 'axios'
// vi.mock('axios')
// const mockedAxios = axios as Mocked<typeof axios>
// // callback test
// // mock 
// describe('functions', () => {
//   // 测试创建一个mock函数
//   test('create a mock function', () => {
//     const callback = vi.fn()
//     testFn(12, callback)
//     expect(callback).toHaveBeenCalled()
//     expect(callback).toHaveBeenCalledWith(12)
//   })
//   // 测试监视方法
//   test('spy on method', () => {
//     const obj = {
//       getName: () => 1
//     }
//     const spy = vi.spyOn(obj, 'getName')
//     obj.getName()
//     expect(spy).toHaveBeenCalled()
//     obj.getName()
//     expect(spy).toHaveBeenCalledTimes(2)
//   })
//   // 测试mock第三方模块
//   test('mock third party module', async () => {
//     // mockedAxios.get.mockImplementation(() => Promise.resolve({ data: 123 }))
//     mockedAxios.get.mockResolvedValue({ data: 123 })
//     const result = await request()
//     expect(result).toBe(123)
//   })
// })