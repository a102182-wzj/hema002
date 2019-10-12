import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import './index.less'


import onlineDoctor5 from '../../../image/online-doctor/online-doctor(5).png'
import onlineDoctor6 from '../../../image/online-doctor/online-doctor(6).png'
import onlineDoctor7 from '../../../image/online-doctor/online-doctor(7).png'
import onlineDoctor8 from '../../../image/online-doctor/online-doctor(8).png'
import onlineDoctor9 from '../../../image/online-doctor/online-doctor(9).png'
import onlineDoctor10 from '../../../image/online-doctor/online-doctor(10).png'
import msgImg from '../../../image/online-doctor/msg-img.png'
import msgDown from '../../../image/online-doctor/msg-down.png'



export default class Family extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatars: [{
                src: 'http://img.hippokidcare.com/doctor/linyexin.png',
                name: '林业鑫'
            },
            {
                src: 'http://img.hippokidcare.com/doctor/wudi.png',
                name: '吴迪'
            },
            {
                src: 'http://img.hippokidcare.com/doctor/kedongyue.png',
                name: '柯东月'
            },
            {
                src: 'http://img.hippokidcare.com/doctor/caiyanhua.png',
                name: '蔡艳华'
            }, {
                src: 'http://img.hippokidcare.com/doctor/liuyongliang.png',
                name: '柳永亮'
            }
            ],
            //表格第一列数据
            content: [{
                title: '健康咨询',
                subtitle: '健康管理师'
            }, {
                title: '电话问诊',
                subtitle: '儿科医生'
            },],
            //表格第二列数据
            detail: ['不限次数\n周一至周五(工作日)\n9:00-17:00', '每月3次\n(120分钟以内电话回复)'],
            //表格第三列数据
            service: [{
                title: '1.为您保留每次咨询记录;',
                color: '#77B0EB',
            },
            {
                title: '2.小病由健康管理师或医生指导自己在家护理，避免到大医院交叉感染与过度用药。',
                color: '#87C5D4',
            }
            ],
            //签约流程处数据
            signing: [{
                title: '1.线上签约',
                line1: '试用结束后',
                line2: '签约家庭医生',
                margin: Taro.pxTransform(250),
                line: Taro.pxTransform(60)
            }, {
                title: '2.签约成功',
                line1: '下单付款',
                line2: '签约河马医疗团队',
                margin: Taro.pxTransform(150),
                line: Taro.pxTransform(150)
            }, {
                title: '3.体验套餐服务',
                line1: '医生团队为您提供',
                line2: '精准健康医疗服务',
                margin: Taro.pxTransform(150),
                line: Taro.pxTransform(50)
            }
            ],

            //案例数据
            alldata: [
                [{
                    name: '问诊家长',
                    type: 'text',
                    myself: 1,
                    path: '健康管理师您好，可可这几天屁股很红，是不是我吃的过咸了？现在该怎么办呀？',
                    headimg: onlineDoctor5
                },
                {
                    name: '问诊家长',
                    type: 'image',
                    myself: 1,
                    path: msgImg,
                    headimg: onlineDoctor5
                }, {
                    name: '河马医生',
                    type: 'text',
                    myself: 0,
                    path: '可可妈妈您好，您先别着急，孩子红屁股首先要注意及时更换尿布或纸尿裤保持干燥。将小屁股清水洗干净后涂抹氧化锌软膏，多通风晾晒，勤换尿布，不要过度清洗和治疗，小心护理即可。可可现在2个月10天，主要也是母乳喂养，您这两天注意不要吃刺激辛辣的食物，多吃清淡多喝水，然后看可可的情况是否有好转。',
                    headimg: onlineDoctor6
                }
                ],
                [{
                    name: '问诊家长',
                    type: 'text',
                    myself: 1,
                    path: '健康管理师您好，叮叮发烧了，刚才量了一下37.8度，咳嗽、流鼻涕，该给孩子吃什么退烧药呀？',
                    headimg: onlineDoctor7
                },
                {
                    name: '河马医生',
                    type: 'text',
                    myself: 0,
                    path: '叮叮妈妈您先别着急，叮叮发烧度数低于38.5度，暂时不使用退烧药。多给叮叮喝水，观察孩子的精神状况，如果孩子精神状况不错，并且喝水之后有降温的趋势，不用到医院，每天增加5-8次喂水，每次20ml左右。体温每隔1小时测量一次，观察孩子的温度变化。每天给孩子吃一些新鲜水果，最重要是时刻注意孩子的精神状态。按照这样护理，1-2天症状应该就会减轻至消失，如果有其他问题您也可以随时联系我。',
                    headimg: onlineDoctor6
                }
                ],
                [{
                    name: '问诊家长',
                    type: 'text',
                    myself: 1,
                    path: '健康管理师您好，豆豆这个月就七个月了，可是我不知道该给孩子做什么辅食？',
                    headimg: onlineDoctor8
                }, {
                    name: '河马健康管理师',
                    type: 'text',
                    myself: 0,
                    path: '豆豆妈您好，河马线上家庭医生有您专属的营养师，由营养师针对宝宝的年龄段和基本情况来制订辅食食谱建议，能确保豆豆的每日饮食能够科学、营养，并在吸收范围内达到添加辅食的目的。营养师稍后会跟您详细询问豆豆的情况，并提供食谱建议。',
                    headimg: onlineDoctor6
                },
                {
                    name: '河马营养师',
                    type: 'text',
                    myself: 0,
                    path: '家长您好，我是您的专属营养师，这是为豆豆制订的食谱建议方案，请查收。',
                    headimg: onlineDoctor6
                },
                {
                    name: '河马营养师',
                    type: 'image',
                    myself: 0,
                    path: msgDown,
                    headimg: onlineDoctor6,
                    down: true
                }
                ],
                [{
                    name: '问诊家长',
                    type: 'text',
                    myself: 1,
                    path: '问：健康管理师，我家小帅突然发烧到39.8，孩子爷爷这两天也感冒了，是不是被传染了吗？现在该怎么办呀？',
                    headimg: onlineDoctor9
                }, {
                    name: '河马医生',
                    type: 'text',
                    myself: 0,
                    path: '答：小帅妈妈您先别着急，孩子现在高烧，您先给孩子服用美林，让温度先降下来，小帅现在12个月，体重21斤，每次给小帅喝4ml的美林，同时观察孩子的精神状况。如果孩子的精神状况不好，我马上和宝宝家庭医生联系，由宝宝的家庭医生柯医生给您详细指导解答吧。您目前是否方便，我这边可以帮您转接，您可以选择图文咨询或者是电话咨询。给孩子购药时最好购买婴幼儿版美林，下图是药品图片，请参考该图进行购买。',
                    headimg: onlineDoctor6
                }, {
                    name: '河马医生',
                    type: 'image',
                    myself: 0,
                    path: onlineDoctor10,
                    headimg: onlineDoctor6
                }],
            ],
            reserve: false,
            doctordetail: '',
            showPay: false,
        }
    }

    config = {
        navigationBarTitleText: '家庭医生套餐介绍',
        navigationBarBackgroundColor: '#A2BBE1',
        navigationBarTextStyle: 'white'
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }






    render() {
        return (
            <View className='index'>
                <Pay showPayComponent={this.state.showPay} />
                <View className='pages' >
                    <Image className='title-img' src={require('../../../image/online-doctor/online-doctor(4).png')}></Image>
                    <View className='title'>
                        <View className='main-title'>河马儿科线上家庭医生包月套餐</View>
                        <View className='sub-title'>您专属的健康服务团队(包月版)</View>
                    </View>
                    <Text className='money'>价格:259元(3次医生电话服务)</Text>
                    <View className='doctor'>
                        <View className='doctor-title'>家庭医生</View>
                        <View className='doctor-subtitle'>您身边的医大儿科团队</View>
                        <View className='doctor-avator'>
                            {this.state.avatars.map(item => {
                                return (
                                    <View className='doctor-avatar-box'>
                                        <AtAvatar circle image={item.src} style='border:1px solid #ABBCD7'></AtAvatar>
                                        <View className='doctor-name' style={{ marginTop: '10px ' }}>{item.name}</View>
                                        <View className='doctor-name'>(主诊医师)</View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                    <View className='table-head'>
                        <View className='line'></View>
                        定制内容
    <View className='line'></View>
                    </View>
                    <View className='table-body'>
                        <View className='table-body-col' style='background-color:#ECF0F9;'>
                            <View className='table-body-col-head' style='border-left:0;border-right:0'>定制内容</View>
                            {this.state.content.map((item, index) => {
                                return (
                                    <View className='table-body-col-cell' style={{ borderRight: 0, borderLeft: 0 }}>
                                        <View>{item.title}</View>
                                        {index + 1 == content.length ? <View>{item.title2}</View> : null}
                                        <View>({item.subtitle})</View>
                                    </View>
                                )
                            })}
                        </View>
                        <View className='table-body-col'>
                            <View className='table-body-col-head' style={{ borderRight: 0 }}>服务详情</View>
                            {this.state.detail.map(item => {
                                return (
                                    <View className='table-body-col-cell'>
                                        <Text className='table-body-col-cell-text'>{item}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View className='table-body-col' style={{ borderRight: 0 }}>
                            <View className='table-body-col-head' style={{ borderBottom: '1px solid #b4c6e1', borderRight: 0 }}>服务优势</View>
                            <View style={{ height: '40px' }}></View>
                            {this.state.service.map(item => {
                                return (
                                    <View className='no-border-table-body-col-cell'>
                                        <View style={{ color: item.color }}>{item.title}</View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                    <wux-white-space size='large' />
                    <View className='table-head'>
                        <View className='line'></View>
                        签约流程
    <View className='line'></View>
                    </View>
                    <View className='signing'>
                        <Image className='signing-background-image1' src={require('../../../image/online-doctor/online-doctor(12).png')} mode='widthFix'></Image>
                        <Image className='signing-background-image2' src={require('../../../image/online-doctor/online-doctor(3).png')} mode='widthFix'></Image>
                        <Image className='signing-background-hippo' src={require('../../../image/online-doctor/online-doctor(11).png')} mode='widthFix'></Image>
                        {this.state.signing.map(item => {
                            return (
                                <View className='signing-top' style={{ marginLeft: item.margin }}>
                                    <View className='titleandline'>
                                        <View className='signing-title'>{item.title}</View>
                                        <View className='title-line' style={{ width: item.line }}></View>
                                    </View>
                                    <View className='signing-line'>{item.line1}</View>
                                    <View className='signing-line'>{item.line2}</View>
                                </View>
                            )
                        })}

                    </View>

                    <wux-white-space size='large' />
                    <View className='table-head'>
                        <View className='line'></View>
                        已签约注意事项
    <View className='line'></View>
                    </View>
                    <View className='tips'>
                        <View>1.包月用户可在服务时段不限次数咨询健康管理师，健康管理师将根据详细情况来判断是否为您接转医生电话问诊；</View>
                        <View>2.签约时要与用户签订合约条款。</View>
                    </View>

                    <wux-white-space size='large' />
                    <View className='table-head'>
                        <View className='line'></View>
                        服务案例
    <View className='line'></View>
                    </View>
                    <View className='example'>
                        {this.state.alldata.map((detail, index) => {
                            return (
                                <View className='example-box'>
                                    {detail.map(item => {
                                        return (
                                            <View className='dataItem' style={item.myself == 1 ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}>
                                                {item.myself == 0 ? <View className='headimg'>
                                                    <Image src={item.headimg}></Image>
                                                </View> : null}

                                                <View className='chating'>
                                                    <View className='name' style={item.myself == 0 ? 'text-align: left;' : 'text-align: right;'}>{item.name}</View>
                                                    <View className='reply-box'>
                                                        {item.myself == 0 ? <View className='helfblock-left'></View> : null}
                                                        {item.type == 'text' ? <View style={{ backgroundColor: item.myself == 1 ? '#CEDBEB' : '#fff', boxShadow: item.myself == 1 ? '' : '10px 10px 0 2px #cedbeb;', border: item.myself == 1 ? '' : Taro.pxTransform(5) + ' solid #96add5' }} className='reply'>{item.path}</View> : null}
                                                        {item.type == 'image' && item.down != true ? <Image className='defaultImg' mode='widthFix' src={item.path} data-path={item.path} bindtap='preView' style={{ backgroundColor: item.myself == 1 ? '#CEDBEB' : '#fff', boxShadow: item.myself == 1 ? '' : '10px 10px 0 2px #cedbeb;' }}></Image> : null}
                                                        {item.type == 'image' && item.down == true ? <Image className='down' mode='widthFix' src={item.path} data-path={item.path} bindtap='preView' style={{ backgroundColor: item.myself == 1 ? '#CEDBEB' : '#fff', boxShadow: item.myself == 1 ? '' : '10px 10px 0 2px #cedbeb;' }}></Image> : null}
                                                        {item.myself == 1 ? <View style={{ backgroundColor: item.type == 'text' ? '#CEDBEB' : '#fff', borderRight: item.type == 'text' ? '' : '5px solid #96add5', borderTop: item.type == 'text' ? '' : Taro.pxTransform(5) + ' solid #96add5' }} className='helfblock-right'></View> : null}
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
                        })}
                        <Button className='buttom'>立即签约</Button>
                    </View>
                </View>
            </View>
        )
    }
}