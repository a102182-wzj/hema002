import Taro from '@tarojs/taro'
import { View, Button, Form } from '@tarojs/components'
import { AtMessage, AtButton, AtNavBar, AtTextarea } from 'taro-ui'
import request from '../../utils/request'
import './index.less'
import picture from '../../image/ico/newchat/image.png'
import sound from '../../image/ico/newchat/sound.png'
import full from '../../image/ico/full.png'
import trick from '../../image/ico/ticker.png'
import question from '../../image/ico/question(1).png'
import requestion from '../../image/ico/requestion.png'
import history from '../../image/ico/history.png'
import record from '../../image/record/record.png'
import QuickAnswer from '../../components/quickAnswer/index'
import * as $global from '../../globalSetting/global'
import * as sendM from '../../utils/sendMessage'
import cosUtils from '../../utils/cos_Utils'
import * as splite from '../../utils/splitImg'
import config from '../../utils/config'
export default class FullTextarea extends Taro.Component {
    state = {
        second: 0,
        minute: 0,
        isShowRecord: false,
        textheight: 0,
        tempFilePath: '',
        message: '',
        showAnswerQuick: false,
        textareaVal: '',
        showTextarea: true,
        item1: '',
        timeid: ''
    }
    formSubmit(data) {
        console.log('执行了submit')
        console.log('item333', $global.getGlobalData('item'))
        console.log('data',data)
        if (data.detail.value.message == null || data.detail.value.message == '') {

            return
        }
        let item = $global.getGlobalData('item')
        let message = item.data[item.data.length - 1]
        sendM.sendMessage(data.detail.value, 1, message.doctor, message.no, message.order, 11, this.props.setItem)
        console.log('item444', item.data[item.data.length - 1].order)
        let data1 = {
            order: item.data[0].order,
            doctor: item.data[0].doctor,
            content: data.detail.value,
            superior: item.data[0].no,
            attach: []
        }
        let params = {
            url: 'doctor/order/service',
            data: data1,
            method: 'post'
        }
        let orderId = ''
        let chatId = ''
        request(params, true).then(res => {
            console.log('res', res)
            orderId = res.order
            chatId = res.no
            this.props.setOrderIdChatId(orderId, chatId)
        }).catch(err => {
            console.log(err)
        })

    }
    showRecordTrue(e) {
        e.stopPropagation()
        this.setState({
            isShowRecord: true
        })
    }
    showRecordFalse() {
        this.setState({
            isShowRecord: false
        })
    }
    startRecord() {
        let that = this
        this.setState({
            tId: 0
        })
        let i = 0
        let timeid = setInterval(() => {
            this.setState({
                second: i += 1
            })
        }, 1000)
        console.log(timeid)
        this.setState({
            tId: timeid
        })
        Taro.startRecord({
            success(res) {
                console.log('videoRes', res)
                that.setState({
                    tempFilePath: res.tempFilePath
                })
            }
        })
        setTimeout(function () {
            Taro.stopRecord() // 结束录音
        }, 50000)
    }
    endRecord() {
        console.log('stop')
        console.log('second', this.state.second)
        console.log('minute', this.state.minute)
        clearInterval(this.state.tId)
        Taro.stopRecord()
        Taro.playVoice({
            filePath: this.state.tempFilePath,
            success() {
                console.log('end')
            }
        })
    }
    sendVideo(data) {
        let id=data.detail.formId
        let item = $global.getGlobalData('item')
        let data1 = item.data[item.data.length - 1]
        const filePaths = this.state.tempFilePath
        if(filePaths==''||filePaths==null){
            return 
        }
        console.log('videoPath', filePaths)
        let file = splite.split(filePaths,'audio')
        file = 'audio/' + file.toString()
        console.log('myFile',file)
        new cosUtils().requestUploadAudiosClouds(filePaths).then(res => {
           console.log('上传云成功')
            sendM.sendMessage(video, 1, data1.doctor, data1.no, data1.order, 11, that.props.setItem)
        }).catch(err => {
            console.log('上传云失败')
        })
        let video = {
            isPlay: false,
            path: file,
            timePath: '',
            time: this.state.second
        }
        let data2 = {
            order: data1.order,
            doctor: data1.doctor,
            phone: '',
            content: video,
            superior: data1.no,
            attach: [],
            msgtype: 'audio',
            form_id: id
        }
        let params = {
            url: 'doctor/order/service',
            data: data2,
            method: 'post'
        }
        request(params, true).then(res => {
            console.log('提交录音的res', res)
            this.props.setOrderIdChatId(res.order, res.no)
        }).catch(err => {
            console.log('提交录音出错')
            console.log(err)
        })
    }
    chooseImg = (data) => {
        let that = this
        let id = data.detail.formId
        console.log('item', $global.getGlobalData('item'))
        let item = $global.getGlobalData('item')
        let data1 = item.data[item.data.length - 1]
        Taro.chooseImage(
            {
                success(res) {
                    const tempFilePaths = res.tempFilePaths
                    console.log('files', tempFilePaths)
                    new cosUtils().requestUploadClouds(tempFilePaths).then(res => {
                        console.log('上传云成功')
                        sendM.sendMessage(images, 2, data1.doctor, data1.no, data1.order, 2, that.props.setItem)
                        console.log(images)
                    }).catch(err => {
                        console.log('上传云失败')
                    })
                    let images = splite.split(tempFilePaths,'image')
                    images = 'image/' + images.toString()

                    let data2 = {
                        order: data1.order,
                        doctor: data1.doctor,
                        phone: '',
                        content: images.toString(),
                        superior: data1.no,
                        attach: [],
                        msgtype: 'image',
                        form_id: id
                    }
                    // let data = {
                    //     order: data1.order,
                    //     content: images.toString(),
                    //     superior: data1.no,
                    //     msgtype:'',
                    //     form_id: id
                    // }
                    let params = {
                        url: 'doctor/order/service',
                        data: data2,
                        method: 'post'
                    }
                    request(params, true).then(res => {
                        console.log('提交图片的res', res)
                        this.props.setOrderIdChatId(res.order, res.no)
                    }).catch(err => {
                        console.log('提交图片出错')
                        console.log(err)
                    })
                }
            }
        ).then(
            console.log('选择成功')
        )
    }
    getQuickAnswer = (data) => {
        this.setState({
            message: data
        })
    }
    setQuickAnswer = () => {
        console.log('走了快捷回复')
        this.setState({
            showAnswerQuick: true
        })
    }
    showAnswerQuickFalse = () => {
        this.setState({
            showAnswerQuick: false
        })
    }
    setTextareaVal = (val) => {
        console.log('start')
        console.log('val', val)
        this.setState({
            textareaVal: val
        })
    }
    setshowTextareaFalse() {
        console.log('setFalse')
        this.setState({
            showTextarea: false
        })
    }
    setshowTextareaTrue() {
        console.log('setTrue')
        this.setState({
            showTextarea: true
        })
    }
    isShowQuestionnaireTrue() {
        console.log('Questionnaire')
        this.props.isShowQuestionnaireTrue();
    }


    changeHeight = (e) => {
        console.log(e)
        this.setState({
            textheight: e.detail.height
        })
    }
    gotoCoupon = () => {
        Taro.navigateTo({
            url: '/pages/my/order/coupon/index'
        })
    }
    componentWillMount() {

    }

    render() {
        return (
            <Form onSubmit={this.formSubmit.bind(this)} reportSubmit='true' onReset={this.formReset} >
                {this.state.showAnswerQuick ? <QuickAnswer  setshowTextareaTrue={this.setshowTextareaTrue.bind(this)} setshowTextareaFalse={this.setshowTextareaFalse.bind(this)} setTextareaVal={this.setTextareaVal.bind(this)} showAnswerQuickFalse={this.showAnswerQuickFalse.bind(this)} submit={this.formSubmit.bind(this)}></QuickAnswer> : ''}
                <View className='FullTextareaView' >
                    <View className='FullTextareaChildView'>{showTextarea ? <Textarea value={this.state.textareaVal} name='message' fixed={true} adjust-position={false} onBlur={() => { this.setState({ textheight: 0 }) }} fixed={false} onFocus={(e) => this.changeHeight(e)} style=' background:#black;width:100%;min-height:50rpx;max-height:100rpx;padding:0 30rpx;' autoHeight autoFocus={true} /> : ''}
                    </View>
                    <View style='width:20%;height:60rpx;margin-bottom:40rpx'> <Button type='primary' size='small' formType='submit'>发送</Button></View>
                    <View style='display:flex;width:90%;flex-wrap:wrap;height:80rpx'>
                        <View style='width:14%;text-align:center'><Image style='width: 60rpx;' onClick={this.showRecordTrue.bind(this)} mode='widthFix' src={sound} /> </View>
                        <Form reportSubmit='true' onSubmit={this.chooseImg.bind(this)}><View style='width:14%;text-align:center'><Button formType='submit' className='btnWZJ' ><Image style='width: 60rpx;' mode='widthFix' src={picture} /></Button> </View></Form>
                        <View style='width:14%;text-align:center'><Image style='width: 60rpx;' onClick={this.setQuickAnswer.bind(this)} mode='widthFix' src={full} /> </View>
                        <View style='width:14%;text-align:center'><Image style='width: 60rpx;' onClick={this.gotoCoupon.bind(this)} mode='widthFix' src={trick} /> </View>
                        <View style='width:14%;text-align:center'><Image style='width: 60rpx;' onClick={this.isShowQuestionnaireTrue.bind(this)} mode='widthFix' src={question} /> </View>
                        <View style='width:14%;text-align:center'><Image style='width: 60rpx;' mode='widthFix' src={requestion} /> </View>
                        <View style='width:14%;text-align:center'><Image style='width: 60rpx;' mode='widthFix' src={history} /> </View>
                    </View>
                    <View style={{ height: this.state.textheight + 'px', width: '100%' }}></View>
                    {this.state.isShowRecord ? <View>
                        <View>
                            <View style='height:300rpx;width:100vw;display:flex;justify-content:center;flex-wrap:wrap'>
                                <View style='height:50%;width:150rpx;text-align:center' onTouchstart={this.startRecord.bind(this)} onTouchend={this.endRecord.bind(this)} className='viewButton'>
                                    <Image style='width:100rpx' mode='widthFix' src={record} />
                                </View>
                                <View style='width:100vw;text-align:center'>{this.state.minute + ':' + this.state.second}</View>
                            </View>
                        </View>
                        <View style='width:100vw;display:flex;height:80rpx'>
                            <View style='width:50%;height:30rpx'><Button onClick={this.showRecordFalse.bind(this)} type='primary'>取消</Button></View>
                           <Form style='width:50%'  reportSubmit='true' onSubmit={this.sendVideo.bind(this)}> <View style='width:100%;height:30rpx'><Button  formType='submit' ref='sendButton'>发送</Button></View></Form>
                        </View>
                    </View> : ''}
                </View>
            </Form>
        )
    }
}
