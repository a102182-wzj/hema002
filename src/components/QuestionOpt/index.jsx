import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtModal, AtModalContent, AtIcon } from "taro-ui"
import PayActionSheet from '../PayActionSheet/index'
import request from '../../utils/request'
import './index.scss'
import imgText from '../../image/imgtext.jpg'
import imgTel from '../../image/tel.jpg'

export default class QuestionOpt extends Taro.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: this.props.opt
        }
    }

    componentWillMount() {
        console.log("props", this.props)
    }

    componentWillReceiveProps = (props) => {
        this.setState({ show: props.opt })
    }

    render() {
        const props = this.props
        return (
            <View>
                {this.state.show ?
                    <AtModal {...props}>
                        <AtModalContent>
                            {
                                this.props.listPrice !== undefined ?
                                    // props.listPrice.map(x => {
                                    //     return (
                                    //         <View onClick={
                                    //             () => {
                                    //                 this.props.priceOpt(x.no)
                                    //             }
                                    //         }>价格：{x.amount},追问：{x.desc}</View>
                                    //     )
                                    // }) :
                                    <View className='pay-type-area'>
                                        <View className='area-top'>
                                            <AtIcon value='close-circle' size='25' color='#F7726F' onClick={() => { this.setState({ show: false }) }} />
                                        </View>
                                        <View className='area-title'>请选择提问方式</View>
                                        <View className='area-choose'>
                                            {props.listPrice.map(item => {
                                                return (
                                                    <View className='area-choose-item' onClick={() => this.props.priceOpt(item.no)}>
                                                        <Image className='choose-img' src={item.type == 1 ? imgText : imgTel} mode='widthFix' />
                                                        <View className='choose-title'>{item.name}</View>
                                                        <View className='choose-price'>{'¥' + item.amount}{item.type == 1 ? '/' + (item.desc - 1) + '条追问' : '/' + item.desc + '分钟'}</View>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                    :
                                    null
                            }
                        </AtModalContent>
                    </AtModal>
                    : null}
            </View>
        )
    }
}