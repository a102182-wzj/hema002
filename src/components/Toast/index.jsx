import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import request from '../../../utils/request'
import './index.less'
export default class Modal extends Taro.Component {
    state = {
        
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
            <AtModal isOpened>
                <AtModalHeader>标题</AtModalHeader>
                <AtModalContent>
                    这里是正文内容，欢迎加入京东凹凸实验室
                    这里是正文内容，欢迎加入京东凹凸实验室
                    这里是正文内容，欢迎加入京东凹凸实验室
  </AtModalContent>
                <AtModalAction> <Button>取消</Button> <Button>确定</Button> </AtModalAction>
            </AtModal>
        )
    }
}
