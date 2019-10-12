import Taro from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { AtIcon, AtCard, AtInput, AtList, AtListItem } from 'taro-ui'
import request from '../../../../utils/request'
import './index.less'
export default class Card extends Taro.Component {
    state = {
        tickList: []
    }
    componentWillMount = () => {
        let params = {
            url: 'coupon/list',
            data: '',
            method: 'get'
        }
        request(params, true).then(res => {
            console.log('res', res)
            this.setState({
                tickList: res
            }, () => {
                console.log('tickList', this.state.tickList)
            })
        })
    }
    config = {
        navigationBarTitleText: '优惠卷',
        backgroundColor: '#F8F8F8'
    }
    render() {
        let couponList = this.state.tickList.map((item, index) => {
            return <View style='margin-top:20rpx'>
                <View class='View1'>
                    <View style='font-size:30rpx;width:100%;margin-top:30rpx'>{item.type}券</View>
                    <View style='font-size:40rpx;width:100%'>{item.amount == 0 ? '全额' : '￥' + item.amount / 100}</View>
                </View>
                <View class='View2'>
                    <View style='margin-left:20rpx'>{item.name}</View>
                </View>
            </View>
        })
        return (
            <View >
                {couponList}
            </View>
        )
    }
}
