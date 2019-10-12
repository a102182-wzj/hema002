import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem, AtButton, AtIcon } from "taro-ui"
import request from '../../utils/request'
const util = require('../../utils/md5')
import './index.scss'


export default class PayActionSheet extends Taro.Component {
    constructor(props) {
        super(props)
        this.state = {
            agreement: true,    //同意协议？
            showPay: this.props.pay
        }
    }

    componentWillReceiveProps = (props) => {
        this.setState({ showPay: props.pay })
    }

    wxpay(prepay_id) {
        console.log("action props", this.props)
        if (prepay_id === undefined || prepay_id === "") {
            return
        }
        let nonce_str = Math.random().toString(36).substr(2, 15)
        let time = String((new Date()).valueOf())
        let strings = "appId=wx9de214323f3978e1&nonceStr=" + nonce_str + "&package=prepay_id=" + prepay_id + "&signType=MD5&timeStamp=" + time
        strings = strings + "&key=Wo8rHPsOqy2viTyHq8fAiAuyDYgGsasJ"
        let paySign = util.hexMD5(strings).toUpperCase()

        Taro.requestPayment({
            timeStamp: time,
            nonceStr: nonce_str,
            package: "prepay_id=" + prepay_id,
            signType: 'MD5',
            paySign: paySign,
            success(rel) {
                this.props.payResult(rel)
            },
            fail(err) {
                this.props.payResult(err)
            }
        })
    }

    postOrder = () => {
        let props = this.props
        let data = {
            doctor: props.doctor.doctor,
            pay_type: props.pay_type,
            price: props.price.no
        }
        console.log("data", data)
        request.post("buy/" + props.type, data).then(res => {
            if (!res.service) {
                Taro.showModal({
                    title: "当前非服务时间",
                    content: '下一个工作日回复您！是否继续？'
                })
                    .then(c => {
                        if (c.confirm) {
                            request.post("buy/" + props.type, {
                                doctor: props.doctor.doctor,
                                pay_type: props.pay_type,
                                price: props.price.no,
                                confirm: 'ok'
                            }).then(res => {
                                this.wxpay(res.prepay_id)
                            })
                        }
                    })
            } else {
                this.wxpay(res.prepay_id)
            }
        })
    }

    //点击是否同意协议
    changeAgreement = () => {
        let agreement = this.state.agreement
        this.setState({
            agreement: agreement == true ? false : true
        })
    }


    render() {
        const props = this.props
        console.log("props", props)
        return (
            <View>
                {this.state.showPay ?
                    <AtActionSheet {...props}>
                        <View className='pay-area'>
                            <View className='area-top'>
                                <AtIcon value='close-circle' size='25' color='#F7726F' onClick={() => { this.setState({ showPay: false }) }} />
                            </View>
                            <View className='pay-content'>
                                <Image className='headimg' src={this.props.doctor.headimg} mode='widthFix' />
                                <View className='detail'>
                                    <View className='name'>{this.props.doctor.name} {this.props.price.name}</View>
                                    <View className='price'>价格：<Text style={{ color: '#EE857F' }}>¥{this.props.price.amount}
                                        {this.props.price.type == 30 ? null :
                                            <Text>/{this.props.price.desc}{this.props.price.type == 1 ? '条' : '分钟'}</Text>
                                        }
                                    </Text></View>
                                </View>
                            </View>
                            <View class="quick">
                                {this.props.price.type == 1 ?
                                    <View>
                                        <View>1、咨询有效期内可多次追问，图片不计入追问次数；</View>
                                        <View>2、追问次数宝贵，追问时请尽可能多的描述宝宝情况。</View>
                                    </View>
                                    :
                                    this.props.price.type == 30 ?
                                        <View>
                                            <View>1、家庭医生服务期内，不限制咨询次数。</View>
                                            <View>2、服务期内可转接3次医生电话咨询。</View>
                                        </View>
                                        :
                                        <View>
                                            <View>1、电话咨询仅限通话一次；</View>
                                            <View>2、医生将通过固定电话号码给您回电，请注意接听；</View>
                                            <View>3、如因患者原因并医生多次尝试导致无法接通。则不予退款。</View>
                                        </View>
                                }
                            </View>
                            <View class="Agreement">
                                {this.state.agreement ?
                                    <Icon size='25' type='success' onClick={() => this.changeAgreement()} />
                                    :
                                    <View class="unagree" onClick={() => this.changeAgreement()}></View>
                                }
                                <Text style={{ marginLeft: '10Px', textDecoration: 'underline' }}>购买即表示同意{this.props.price.type == 30 ? '《家庭医生服务条款》' : '《服务条款》'}</Text>
                            </View>
                            <Button class="confirm" disabled={this.state.agreement ? false : true} onClick={() => this.postOrder()}>
                                <Text>
                                    立即支付 (¥
                        {this.props.price.amount}
                                    {this.props.price.type == 30 ? null :
                                        <Text>/{this.props.price.desc}{this.props.price.type == 1 ? '条' : '分钟'}</Text>
                                    }
                                    )
                                </Text>
                            </Button>
                        </View>
                        {/* <View>
                        {props.price.name}
                    </View>
                    <View>
                        ￥{props.price.amount}/{props.price.desc}条追问
                    </View>
                    <View>
                        第一行
                    </View>
                    <View>
                        第一行
                    </View>
                    <AtButton type='primary' full={true} onClick={() => this.postOrder()}>支付(￥{this.props.price.amount}/{props.price.desc}{props.price.type == 1 ? "条追问" : "分钟"})</AtButton> */}
                    </AtActionSheet>
                    : null
                }

            </View>
        )
    }
}
