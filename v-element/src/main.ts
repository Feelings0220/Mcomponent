import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import MyPlugin from './vuePlugins/MyPlugin'
import App from './App.vue'

library.add(fas)
import './styles/index.css'
console.log(App.render?.toString())

createApp(App)
.use(MyPlugin)
.mount('#app')
