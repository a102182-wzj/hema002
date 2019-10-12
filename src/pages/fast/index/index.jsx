import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui';
import './index.less'
import ico1 from '../../../image/fast/ico1.png';
import ico2 from '../../../image/fast/ico2.png';
import ico3 from '../../../image/fast/ico3.png';
import ico4 from '../../../image/fast/ico4.png';
import ico5 from '../../../image/fast/ico5.png';
import ico from '../../../image/ico/ico1.png'
import talk2 from '../../../image/ico/ico2.png'
import talk3 from '../../../image/ico/ico3.png'
import talk4 from '../../../image/ico/ico4.png'
import talk5 from '../../../image/ico/ico5.png'
import talkd from '../../../image/ico/icod.png'

import PayActionSheet from '../../../components/PayActionSheet'
import request from '../../../utils/request';

export default class Fast extends Taro.Component {
    state = {
        pay: false,
        fastinfo: {
            explain: [
                '本快问产品是由河马儿科健康管理师进行咨询服务;',
                '疾病方面可以给您出一个初步指导和建议;',
                '婴幼儿日常养护、生长发育、疾病基础护理;',
                '小儿奶粉、转奶、基础辅食添加时间、维生素补充等问题;',
                '如婴幼儿情况复杂,将建议您到店进行面诊治疗;',
                '婴幼儿的睡眠时间及环境的护理;',
                '睡眠的常见问题的指导;',
                '婴幼儿确诊后的用药指导或服用药物的剂量及次数指导(非处方药);',
                '婴幼儿日常营养补剂用量等。'
            ]
        },
        doctor: {
            name: "河马快问",
            heaimg: "",
            price: 7.9
        },
        price: {
            amount: 7.9,
            desc: 5,
            type: 1,
            name: "河马快问"
        },
        items: [{
            title: '喂养指导',
            img: ico1
        }, {
            title: '生长发育',
            img: ico2
        }, {
            title: '疾病护理',
            img: ico3
        }, {
            title: '睡眠咨询',
            img: ico4
        }, {
            title: '用药咨询',
            img: ico5
        },],

        //案例数据
        alldata: [
            [{
                name: '问诊家长',
                type: 'text',
                myself: 1,
                path: '<div>您好。我家宝宝5个月，常常放屁崩出屎，该不会是括弧肌有问题吧？</div>',
                headimg: talk2
            },
            {
                name: '河马医生',
                type: 'text',
                myself: 0,
                path: '<div>家长您好。小一点的宝宝放屁的时候，大便随着一起飞出来，多数是正常的，不用过分担心。尤其是吃母乳的宝宝，大便通畅、较稀，放屁的时候经常会一起排除少量大便。不代表孩子腹泻，也不代表孩子括弧肌有问题。一个屁放出来，对宝宝来说，整个世界都畅快了呢！</div>',
                headimg: talkd
            }
            ],
            [{
                name: '问诊家长',
                type: 'text',
                myself: 1,
                path: '<div>孩子老把咳不出去得痰咽回去，会不会生病啊？</div>',
                headimg: talk3
            },
            {
                name: '河马医生',
                type: 'text',
                myself: 0,
                path: '<div>家长您好，被咳到嗓子眼的痰液又被孩子咽回去的过程虽然有点恶心，但多数不会给孩子的健康带来什么问题。痰液中可能含有致病微生物是可以被孩子的胃酸杀死的，如果家长实在觉得担心，就要不断地教孩子往外吐而不是咽回去。</div>',
                headimg: talkd
            }
            ],
            [{
                name: '问诊家长',
                type: 'text',
                myself: 1,
                path: '<div>擦生姜可以给宝宝生发吗？头发实在太少了！</div>',
                headimg: talk4
            }, {
                name: '河马医生',
                type: 'text',
                myself: 0,
                path: '<div>千万不要！擦生姜的说法根本没有理论依据，本条问题看起来就很“刺激”，孩子得多辣脑袋啊！宝宝头皮娇嫩，擦生姜有造成皮炎的危险。孩子在12个月左右进入换发期，最晚不超过24个月就会换发，稀疏发黄的头发会越来越多的，家长不要太着急。</div>',
                headimg: talkd
            },],
            [{
                name: '问诊家长',
                type: 'text',
                myself: 1,
                path: '<div>您好，刚满月的孩子眼屎多，时长睁一半眼睛，家里老人说用母乳滴眼睛就好了?这个办法靠谱吗？</div>',
                headimg: talk5
            }, {
                name: '河马医生',
                type: 'text',
                myself: 0,
                path: '<div>家长您好，母乳没有消炎或愈合的作用，相反，母乳蛋白质含量较高，眼球粘膜受不了高浓度蛋白的刺激，还可能引发炎症或过敏。</div>',
                headimg: talkd
            }]
        ]
    }

    componentWillMount() {
        request.get("fast").then(res => {
            console.log("fast res:", res)
            this.setState({
                fastinfo: res
            })
        })
        console.log("fastinfo", this.state.fastInfo)
    }

    payResult(rel) {
        console.log("支付回调 rel:", rel)
    }

    config = {
        navigationBarTitleText: '河马婴幼儿健康快问',
        backgroundColor: '#F8F8F8'
    }

    render() {
        return (
            <View>
                <View>
                    <View className='index'>
                        <View className='page'>
                            <View className='banner'>
                                <Image src={require('../../../image/fast/banner01.png')}></Image>
                            </View>
                            <View className='images'>
                                <View className='images-title'>服务内容</View>
                                <View className='images-items'>
                                    {this.state.items.map(item => {
                                        return (<View className='images-item'>
                                            <Image src={item.img} mode='aspectFit'></Image>
                                            <View>{item.title}</View>
                                        </View>)
                                    })}
                                </View>
                            </View>
                            <View className='time'>
                                <View className='time-title'>服务时间:</View>
                                <View className='time-content'>
                                    <Text>周一至周五 9:00-17:00 \n(其他时间可咨询线上医生)</Text>
                                </View>
                            </View>
                            <View className='bar'>
                                <Image src={ico} className='barimage' mode='widthFix'></Image>
                                大家都在问什么？</View>
                            <View className='example'>
                                {this.state.alldata.map((detail, index) => {
                                    return (
                                        <View className='example-box' style={{ borderBottom: index == this.state.alldata.length - 1 ? '' : '5rpx dashed #e4e4e4' }}>
                                            {detail.map(item => {
                                                return (
                                                    <View className='dataItem' style={item.myself == 1 ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}>
                                                        {item.myself == 0 ? <View className='headimg' >
                                                            <Image src={item.headimg}></Image>
                                                        </View> : null}

                                                        <View className='chating'>
                                                            <Text className='name' style={item.myself == 0 ? 'text-align: left;' : 'text-align: right;'}>{item.name}</Text>
                                                            <View className='reply-box'>
                                                                {item.myself == 0 ? <View className='helfblock-left'></View> : null}
                                                                {item.type == 'text' ? <View style={{ backgroundColor: item.myself == 1 ? '#C5D8F6' : '#fff', boxShadow: item.myself == 1 ? '' : '10px 10px 0 2px #C5D8F6;', border: item.myself == 1 ? '' : '5rpx solid #5A94E6;' }} className='reply'>
                                                                    <RichText nodes={item.path}></RichText>
                                                                </View> : null}

                                                                {item.myself == 1 ? <View style={{ backgroundColor: item.type == 'text' ? '#C5D8F6' : '#fff', borderRight: item.type == 'text' ? '' : '5rpx solid #96add5', borderTop: item.type == 'text' ? '' : '5rpx solid #96add5' }} className='helfblock-right'></View> : null}
                                                            </View>
                                                        </View>
                                                        {item.myself == 1 ? <View className='headimg'>
                                                            <Image src={item.headimg}></Image>
                                                        </View> : null}
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    )
                                })
                                }
                            </View>
                            <View class='content'>
                                <View class='images-title'>服务说明</View>
                                <View class='content-items'>
                                    {this.state.fastinfo.explain.map((item, index) => {
                                        return (
                                            <View>{index + 1}.{item}</View>
                                        )
                                    })}
                                </View>
                                <View class='content-items2'>
                                    <text style='width:100%'>若有急重症患者请直接到医院就诊,以免贻误病情;\n支付成功后,非服务时间将会下一工作日第一时间回复您。</text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={{ position: 'fixed', bottom: 0, width: '100%' }}>
                    {/* <AtButton onClick={() => {
                        this.setState({ isOpened: true })
                    }} type='primary' full={true} className='xs'>立即提问</AtButton> */}
                    <Button className='buttom' onClick={() => {
                        this.setState({ pay: true })
                    }} >立即提问</Button>
                    <View>
                        {this.state.pay ?
                            <PayActionSheet
                                type='fast'
                                payResult={this.payResult.bind(this)}
                                pay_type={1}
                                isOpened
                                doctor={this.state.doctor}
                                price={this.state.price}
                                pay={this.state.pay} /> : null}</View>
                </View>
            </View>
        )
    }
}
