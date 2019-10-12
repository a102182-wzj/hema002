import Taro, { Component } from '@tarojs/taro'
import { View, Image, OpenData, Text, Button } from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtList, AtListItem } from 'taro-ui'
import request from '../../../../utils/request'
import * as $global from '../../../../globalSetting/global'
import './index.less'
import '../../../../static/css/animate.css'
import Card from '../../../../components/Card'
import messagePng from './message.png'
import Chat from '../../../../components/Chat/index'
import QuickAnswer from '../../../../components/quickAnswer/index'
import FullTextarea from '../../../../components/FullTextarea/index'
import * as check from '../../../../utils/check'
import Islogin from '../../../../components/LoginAuthor/index'
export default class DoctorReply extends Component {
  state = {
    orderList: {},
    item: {
      white: false
    },
    modalIsOpenRemove: false,
    modalIsOpenRefund: false,
    modal: {
      title: '123',
      content: '123',
      type: ''
    },
    remark: '',
    orderId: '',
    chatId: '',
    interValId: '',
    isShowQuestionnaire: false,

  }

  config = {
    navigationBarTitleText: '',
    backgroundColor: '#F8F8F8',
    // navigationStyle: "custom"
  }
  modalIsOpenTrue = (type) => {
    if (type == 'remove') {
      this.setState({
        modalIsOpenRemove: true
      })
    } else if (type == 'refund') {
      this.setState({
        modalIsOpenRefund: true
      })
    }
  }
  modalIsOpenFalse = (num) => {
    switch (num) {
      case 0:
        this.setState({
          modalIsOpenRemove: false
        })
        break;
      case 1:
        this.setState({
          modalIsOpenRefund: false
        })
    }

  }
  addWhiteList = () => {
    let dataUser = {
      user: this.state.item.user.no
    }
    let params = {
      url: "doctor/white_list",
      data: dataUser,
      method: 'post'
    }
    request(params, true).then(res => {
      let item1 = this.state.item
      item1.white = true
      this.setState({
        item: item1
      })
    })
  }
  removeWhiteList = (num) => {
    let dataUser = {
      user: this.state.item.user.no
    }
    let params = {
      url: 'doctor/white_list',
      data: dataUser,
      method: 'post'
    }
    request(params, true).then(res => {
      let item1 = this.state.item
      item1.white = false
      this.setState({
        item: item1
      })
      this.modalIsOpenFalse(num)
    }).catch(err => {
      console.log(err)
    })
  }
  refund = (num, remark) => {

    this.modalIsOpenFalse(num)
    let params = {
      url: 'doctor/order/refund',
      data: {
        remark: this.state.remark,
        order: this.state.item.user.no
      },
      method: 'post'
    }
    request(params, true).then(
      res => {
        console.log('res', res)
        console.log('退款成功')
      }
    ).catch(err => {
      console.log(err)
    })
  }
  handleChange(value) {
    this.setState({
      remark: value
    })
  }
  isShowQuestionnaireFalse() {
    this.setState({
      isShowQuestionnaire: false
    })
  }
  isShowQuestionnaireTrue() {
    console.log('QuestionnaireTrue')
    this.setState({
      isShowQuestionnaire: true
    })
  }
  componentWillMount = () => {
    check.checkToken()
    Taro.setNavigationBarTitle({ title: Taro.getStorageSync('user').userInfo.nickName })
    console.log('user', Taro.getStorageSync('user'))
    let order = this.$router.params
    console.log('order',order)
    this.setState({
      orderList: JSON.parse(order.item)
    })
    let params = {
      url: 'doctor/order/service/' + order.no,
      data: '',
      method: 'get'
    }
    request(params, true).then(res => {
      $global.setGlobalData('item', res)
      console.log('res2222', res)
      this.setState({
        item: res
      }, () => {
        console.log('item', this.state.item)
      })
    })
    let intervalId = setInterval(() => {
      let orderid = this.state.item.data[this.state.item.data.length - 1].order
      let chatid = this.state.item.data[this.state.item.data.length - 1].no
      if (orderid == null || chatid == null) {
        orderid = this.state.orderId;
        chatid = this.state.chatId;
      }
      let param = {
        url: 'doctor/service/' + orderid + '/' + chatid,
        data: '',
        method: 'get'
      }
      request(param).then(res => {
        console.log('返回res', res)
        if (res.data.length > 0) {
          let item1 = this.state.item
          item1.data.push(res.data[0])
          item1.count = res.count
          item1.free_count = res.free_count
          item1.white = res.white
          item1.withdraw = res.withdrawf
          $global.setGlobalData('item',item1)
          this.setState({
            item: item1
          })
        }
      }).then(res => {
        $global.setGlobalData('item', this.state.item)
      })

    }, 5000)
    this.setState({
      interValId: intervalId
    })
  }
  componentWillUnmount(){
    clearInterval(this.state.interValId)
  }
  setOrderIdChatId(orderId1, chatId1) {
    this.setState({
      orderId: orderId1,
      chatId: chatId1
    }, () => {
      console.log('orderId', this.state.orderId)
      console.log('chatId', this.state.chatId)
    })
  }
  setItem(data){
    console.log('我在setItem')
    let item1=this.state.item
    item1.data.push(data)
    $global.setGlobalData('item',item1)
    this.setState({
      item:item1
    })
  }
  render() {
    let isWhite = null
    if (this.state.item.white) {
      isWhite = <AtButton type='primary' size='normal' onClick={this.modalIsOpenTrue.bind(this, 'remove')} >移除白名单</AtButton>
    } else {
      isWhite = <AtButton type='primary' size='normal' onClick={this.addWhiteList.bind(this)} >添加白名单</AtButton>
    }
    const scrollStyle = {
      height: '84vh'
    }
    const scrollTop = 0
    const Threshold = 20
    let flag = $global.getGlobalData('quickAnswerShow')
    console.log('重新渲染')
    return (
      <View>
        <Islogin></Islogin>
        <AtModal isOpened={this.state.modalIsOpenRemove}>
          <AtModalHeader>移除白名单</AtModalHeader>
          <AtModalContent sytle='text-align:center'>
            是否将用户移除白名单
                    </AtModalContent>
          <AtModalAction>
            <Button onClick={this.modalIsOpenFalse.bind(this, 0)} >取消</Button >
            {/* true  */}
            <Button onClick={this.removeWhiteList.bind(this, 0)} >确定</Button ></AtModalAction>
        </AtModal>
        <AtForm onSubmit={this.refund.bind(this, 1)}>
          <AtModal isOpened={this.state.modalIsOpenRefund}>
            <AtModalHeader>确定退款？</AtModalHeader>
            <AtModalContent sytle='text-align:center'>
              <AtInput name='remark' value={this.state.remark} placeholder='请输入退款理由' onChange={this.handleChange.bind(this)}></AtInput>
            </AtModalContent>
            <AtModalAction>
              <Button onClick={this.modalIsOpenFalse.bind(this, 1)} >取消</Button >
              <Button
                forType='submit' >确定</Button ></AtModalAction>
          </AtModal>
        </AtForm>
        <AtModal isOpened={this.state.isShowQuestionnaire}>
          <AtModalHeader>发送问卷</AtModalHeader>
          <AtModalContent sytle='text-align:center'>
            <AtList>
              <AtListItem title='调查问卷' onClick={this.handleClick} />
            </AtList>
          </AtModalContent>
        </AtModal>
        {/* <NavBar></NavBar> */}
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={scrollTop}
          style={scrollStyle}
        >
          <View>
            <View className='messageWZJ animated slideInDown'>
              <View className='view'>{this.state.item.order[0].pay_type.name + '支付' + '        ' + '实付金额:' + this.state.item.order[0].pay_type.actual + '元'}</View>
              {this.state.item.white ? '' : <View className='view'>{'当前患者还可免费追问' + this.state.item.free_count + '次'} </View>}
            </View>
          </View>
          {/* <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={scrollTop}
          style={scrollStyle}
        > */}
          <View style='margin-top:20px'>
            <View className='topViewWzj'>
              <View style='line-height:50px'>
                <Image
                  style='width: 50px;background: #fff;'
                  src={messagePng}
                  mode="widthFix"
                />
                <Text style='font-size:15px'>基本信息</Text></View>
              <View className='topViewWzj'>
                <View style='margin-right:20px'> <AtButton type='primary' size='normal' onClick={this.modalIsOpenTrue.bind(this, 'refund')} >退款</AtButton></View>
                <View > {isWhite}</View>
              </View>
            </View>
          </View>
          <Card order={this.$router.params.item}></Card>

          <Chat user={this.state.orderList.baby} item={this.state.item}></Chat>
        </ScrollView>
        <FullTextarea  setItem={this.setItem.bind(this)} setOrderIdChatId={this.setOrderIdChatId.bind(this)} isShowQuestionnaireTrue={this.isShowQuestionnaireTrue.bind(this)}></FullTextarea>
      </View>
    )
  }
}
