import Taro, { Component } from '@tarojs/taro'
import { ScrollView, Text, Image } from '@tarojs/components'
import request from '../../utils/request'
import { AtTag, AtActionSheetItem } from 'taro-ui'
import './index.less'
import config from '../../utils/config'
export default class Chat extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatId: '',
      orderId: '',
      data1: [],
      user1: []
    }
  }

  componentWillMount() {
    console.log('userChat', this.props.user)
  }
  render() {
    console.log('重新渲染chat')
    let data = this.props.item.data;

    let doctor = '';
    for (let temO in this.props.item.doctor) {
      console.log('tem0', temO)
      if (this.props.item.doctor[temO].no == this.props.item.order[0].doctor) {
        doctor = this.props.item.doctor[temO]
      }
    }
    // let doctor=this.props.item.doctor
    console.log('doctor', doctor)
    let user = this.props.user;
    console.log('data1', this.state.data1)
    let chatView = data.map((item, index) => {
      return <View style='margin-top:10rpx'>
        <View style='width:90vw;text-align:center;height:21rpx' >{item.create}</View>
        {item.is_doctor ? <View className='leftChat'>
          <View className='leftImg'><Image src={doctor.headimg} style='width:80rpx' mode='widthFix'></Image></View>
          <View style='height:90rpx'>
            <View className='leftText'><Text>{doctor.name}</Text></View>
            {/* <View style='width:200rpx;margin-top:5rpx;color:white' className='sendLeft'> */}
            {
              {
                1: <View style='width:200rpx;margin-top:5rpx;color:white' className='sendLeft'> {item.content.message}</View>,
                2: <Image src={config.qcloud_cos + item.content} style='width:100rpx' mode='widthFix'></Image>
              }[item.content_type] /** loadingStatus 是 `loading`、`fail`、`no-more`  其中一种状态 **/
            }
            {/* </View> */}
          </View>
        </View> : <View className='rightChat'>
            <View >
              <View className='rightText'><Text>{user.name}</Text></View>
              <View style='width:200rpx;margin-top:5rpx;color:white' className='sendRight'>
                {item.content}
              </View>
            </View>
            <View className='rightImg'><Image src={user.headimg} style='width:80rpx' mode='widthFix'></Image></View>
          </View>}
      </View>
    })
    return (
      <View style='min-height:400rpx;width:100vw;display:flex;justify-content:center'>
        <View style='width:90vw'>
          {chatView}

        </View>
      </View>
    )
  }
}