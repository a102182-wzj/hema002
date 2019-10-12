import Taro from '@tarojs/taro'
import { View, ScrollView, RichText } from '@tarojs/components';
import Replays from '../component/replays'
import ChatInput from '../component/input/index'
import ChatMessage from '../component/message/index'
import Describe from '../component/describe/index'

import request from '../../../utils/request'
import './index.less'


export default class ChatIndex extends Taro.Component {
    state = {
        scrollHeight: 0,
        play: false,
        height: '',  //页面高度
        componentHeight: '',    //组件高度
        linecount: 0,
        Pureheight: '',  //组件原始高度
        scrollTips: 0,   //滚动位置
        message: '',    //提示信息
        showMessage: true,   //展示提示信息
        time: '',
        paddingBottom: 0,   //底部边距
        datalist: '',
        doctor: ''
    }

    componentWillMount() {

        request.get("doctor/order/service/2428").then(res => {
            console.log(res)
            this.setState({
                datalist: res.data,
                user: res.user
            })
            for (let i in res.doctor) {
                if (res.doctor[i].no == res.data[0].doctor) {
                    this.setState({
                        doctor: res.doctor[i]
                    })
                }
            }
        })

        let systemInfo = Taro.getSystemInfoSync();
        console.log("systemInfo", systemInfo)
        let scrollHeight = systemInfo.windowHeight - 200

        this.setState({
            scrollHeight,
            height: systemInfo.windowHeight
        })

        //获取组件高度
        Taro.eventCenter.on('getHeight', (height) => {
            if (this.state.componentHeight === '') {
                this.setState({
                    Pureheight: height
                })
            }
            this.setState({
                componentHeight: height
            })
        })

        //发送文字
        Taro.eventCenter.on('submit', (textarea) => {
            let datalist = this.state.datalist
            datalist.push({
                content_type: 1,
                my: true,
                content: textarea
            })
            this.setState({
                datalist,
            })
            this.scrollToBottom()
        })
    }

    //滚动到最下
    scrollToBottom = () => {
        let datalist = this.state.datalist
        setTimeout(() => {
            this.setState({
                scrollTips: (datalist.length + 1) * 600
            })
        }, 100)
    }

    render() {
        return (
            <View className='index' >
                {this.state.datalist == '' ? null :
                    <View>
                        <ScrollView className='scroll' scrollY scrollTop={this.state.scrollTips} style={{ height: (this.state.height - this.state.componentHeight) + 'Px' }}>
                            {/* <ChatMessage /> */}
                            {this.state.datalist.map((item, index) => {
                                return (
                                    <Describe descData={item} play={this.state.play} index={index} userData={this.state.user} doctorData={this.state.doctor} />
                                )
                            })}
                        </ScrollView>

                        {/* <View><ChatInput onclick /></View> */}
                        <View className='replays' style={{ height: this.state.componentHeight + 'Px' }}>
                            <Replays />
                        </View>
                    </View>}

            </View>
        )
    }
}