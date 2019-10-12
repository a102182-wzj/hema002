import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import request from '../../../utils/request'
import QuestionOpt from '../../../components/QuestionOpt/index'
import PayActionSheet from '../../../components/PayActionSheet/index'

import LoginAuthor from '../../../components/LoginAuthor/index'

import './index.less'

import fast1 from '../../../image/fast/1.png'
import fast2 from '../../../image/fast/2.png'
import fast3 from '../../../image/fast/3.png'

export default class DoctorList extends Taro.Component {
    state = {
        display: true,
        opt: false,
        pay: false,
        listPrice: [],
        price: {},
        doctorListData: []
    }

    componentWillMount() {
        request.get('doctor/list').then(res => {
            console.log('res', res)
            this.setState({
                doctorListData: res
            })

            Taro.hideLoading()
        })
    }

    payResult(rel) {
        console.log("rel", rel)
    }

    priceOpt(data) {
        console.log("data", data)
        const listPrice = this.state.listPrice
        for (let i in listPrice) {
            if (listPrice[i].no == data) {
                this.setState({
                    price: this.state.listPrice[i],
                    pay: true,
                    opt: false
                })
                return
            }
        }
    }

    config = {
        navigationBarTitleText: '问医生',
        backgroundColor: '#F8F8F8'
    }

    render() {
        const { doctorListData } = this.state
        const doctorList = doctorListData.map((value, index, arr) => {
            return (
                <View className='doctor'>
                    <View className='doctorBox'>
                        <View className='doctorNames'>
                            <View className='headimgBox'>
                                <Image className='headimg' src={value.headimg} />
                            </View>
                            <View className='names'>
                                <View>
                                    <View className='name'>{value.name}</View>
                                </View>
                                <View className='reserve1'>{value.reserve1 === undefined ? "河马儿科" : value.reserve1}</View>
                            </View>
                            <View className='count'>{value.count}次咨询</View>
                        </View>
                        <View className='content'>
                            擅长:{value.good_at}
                        </View>
                        <View className='price'>
                            <View className='money'>¥{value.price}</View>
                            <View>
                                <AtButton className='Btn' onClick={() => {
                                    request.get("doctor/detail/" + value.doctor).then(res => {
                                        // 如果提问的价格只有一种，直接弹出付款对话框，不需要用户选择
                                        if (res.price.length == 1) {
                                            this.setState({
                                                pay: true,
                                                opt: false,
                                                price: res.price[0],
                                                doctor: value
                                            })
                                        }
                                        else {
                                            this.setState({
                                                pay: false,
                                                opt: true,
                                                listPrice: res.price,
                                                doctor: value
                                            })
                                        }
                                    })
                                }} type='primary' size='small'>立即提问
                                </AtButton>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })
        return (
            <View>
                <LoginAuthor />
                <View className='banner'>
                    <View className='topButton'>
                        <Image className='topButton-rocket' src={fast2} mode='widthFix' />
                        <Image className='topButton-star1' src={fast1} mode='widthFix' />
                        <Image className='topButton-star2' src={fast1} mode='widthFix' />
                        <Image className='topButton-star3' src={fast1} mode='widthFix' />
                        <Image className='topButton-cloud1' src={fast3} mode='widthFix' />
                        <Image className='topButton-cloud2' src={fast3} mode='widthFix' />
                        <Image className='topButton-cloud3' src={fast3} mode='widthFix' />
                        <View className='topButton-out'>
                            <View className='topButton-mid'>
                                <View className='topButton-inside' onClick={() => {
                                    Taro.switchTab({
                                        url: '/pages/fast/index/index'
                                    })
                                }}>7.9元快问</View>
                            </View>
                        </View>
                        <View className='bannerText'><Text style='color:#959595;'>30分钟解决问题，200000+妈妈的选择。</Text></View>
                    </View>
                </View>
                <View>{this.state.opt ? <QuestionOpt pay_type={1} priceOpt={this.priceOpt.bind(this)} isOpened listPrice={this.state.listPrice} opt={this.state.opt} /> : null}</View>
                <View>{this.state.pay ? <PayActionSheet type='doctor' payResult={this.payResult.bind(this)} pay_type={1} isOpened doctor={this.state.doctor} price={this.state.price} pay={this.state.pay} /> : null}</View>
                <View>
                    {doctorList}
                </View>
            </View>
        )
    }
}
