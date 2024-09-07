import type {App} from 'vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
 
const MyPlugin={   // 只包含install()函数的对象就是一个插件
 install:(app:App)=>{
        // 插件组件
        app.component('m-Dropdown',Dropdown);// 或者直接(Button.name , Button)
    }
}
export default MyPlugin  // 导出插件对象