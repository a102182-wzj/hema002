import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage, AtButton, AtNavBar } from 'taro-ui'
import request from '../../../utils/request'
import './index.less'
export default class NavBar extends Taro.Component {
    state = {
        user: {
            userInfo: {
                nickName: '123'
            }
        }
    }
    componentWillMount = () => {
        let userInfo = Taro.getStorageSync('user')
        this.setState({
            user: userInfo
        })
    }
    goBack() {
        Taro.navigateBack();
      }
    render() {
        return (
            <View style='display:flex;justify-content:center; align-items:center;height:80rpx;border:1rpx solid black'>
                <View style='display:flex;justify-content:center; align-items:center;height:80rpx;border:1rpx solid black'> <AtNavBar
                    onClickLeftIcon={this.goBack}
                    color='#000'
                    title={this.state.user.userInfo.nickName}
                    leftIconType='chevron-left'
                    fixed={true}
                /></View>
            </View>
        )
    }
}
