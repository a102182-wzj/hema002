import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import 'taro-ui/dist/style/index.scss'
import './app.less'
import My from './pages/my/index'
import './static/font_css/iconfont.scss' 
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

	config = {
		pages: [
			"pages/my/index/index",
			'pages/index/index',
			'pages/doctor/list/index',
			"pages/fast/index/index",
			"pages/family/index/index",
			"pages/chat/index/index",
			"pages/my/order/index",
			"pages/my/order/doctorReply/index",
			"pages/my/order/coupon/index"
		],
		window: {
			backgroundTextStyle: 'light',
			navigationBarBackgroundColor: '#fff',
			navigationBarTitleText: '河马儿科',
			navigationBarTextStyle: 'black'
		},
		tabBar: {
			list: [
				{
					pagePath: "pages/doctor/list/index",
					text: "问医生",
					iconPath: "./assets/image/ico/ask_disable.png",
					selectedIconPath: "./assets/image/ico/ask.png"
				},
				{
					pagePath: "pages/fast/index/index",
					text: "快问",
					iconPath: "./assets/image/ico/fast_disable.png",
					selectedIconPath: "./assets/image/ico/fast.png"
				},
				{
					pagePath: "pages/family/index/index",
					text: "家庭医生",
					iconPath: "./assets/image/ico/doctor_disable.png",
					selectedIconPath: "./assets/image/ico/doctor.png"
				},
				{
					pagePath: "pages/my/index/index",
					text: "我的",
					iconPath: "./assets/image/ico/my_disable.png",
					selectedIconPath: "./assets/image/ico/my.png"
				}
			],
			color: '#333',
			selectedColor: '#333',
			backgroundColor: '#fff',
			borderStyle: 'white'
		}
	}

	componentDidMount() { }

	componentDidShow() { }

	componentDidHide() { }

	componentDidCatchError() { }

	// 在 App 类中的 render() 函数没有实际作用
	// 请勿修改此函数
	render() {
		return (
			<Index />
		)
	}
}

Taro.render(<App />, document.getElementById('app'))
