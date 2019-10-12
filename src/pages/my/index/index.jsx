import Taro from '@tarojs/taro'
import { View, Image, OpenData } from '@tarojs/components'
import { AtList, AtListItem, AtGrid } from 'taro-ui'
import request from '../../../utils/request'
import './index.less'
import cellme from '../../../image/ico/callme.png'
import ticker1 from '../../../image/ico/ticker1.png'
import contact from '../../../image/ico/contact.png'
import question from '../../../image/ico/question.png'
import Isloggin from '../../../components/LoginAuthor/index'
import * as check from '../../../utils/check'
export default class My extends Taro.Component {
    state = {
        grids: [{
            image: '/image/ico/question.png',
            value: '问诊订单'
        }, {
            image: '/image/ico/Dollar.png',
            value: '收入明细'
        }, {
            image: '/image/ico/message.png',
            value: '快捷回复'
        }, {
            image: '/image/ico/price.png',
            value: '问诊价格'
        }, {
            image: '/image/ico/card.png',
            value: '我的银行卡'
        }, {
            image: '/image/ico/setting.png',
            value: '问诊设置'
        }]
    }
    config = {
        navigationBarTitleText: '我的',
        backgroundColor: '#F8F8F8'
    }

    componentWillMount = () => {
        check.checkToken()
    }
    goTo = (item, index) => {
        switch (index) {
            case 0:
                    Taro.navigateTo({
                        url: '/pages/my/order/index'
                      })
                break
            case 1:
                    Taro.navigateTo({
                        url: ''
                      })
                break
            case 2:
                    Taro.navigateTo({
                        url: ''
                      })
                break
            case 3:
                    Taro.navigateTo({
                        url: ''
                      })
                break
            case 4:
                    Taro.navigateTo({
                        url: ''
                      })
                break
            case 5:
                    Taro.navigateTo({
                        url: ''
                      })
                break

        }
    }
    render() {
        return (

            <View>
                <Isloggin></Isloggin>
                <View className='avatar-box'>
                    <OpenData className='avatar-image' mode='aspectFill' type='userAvatarUrl'></OpenData>
                    <View className='username'>
                        <OpenData type='userNickName'></OpenData>
                    </View>
                </View>
                <View>
                    <AtGrid data={this.state.grids} onClick={this.goTo}></AtGrid>
                </View>
                <View className='space'></View>
                <View>
                    <AtList>
                        <AtListItem title='联系我们' arrow='right' thumb={cellme} />
                    </AtList>
                </View>
                <View className='space'></View>
                <View>
                    <AtList>
                        <AtListItem title='在线反馈' arrow='right' thumb={contact} />
                    </AtList>
                </View>
            </View>
        )
    }
}
