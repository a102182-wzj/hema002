import Taro from '@tarojs/taro'
import { View, Form, CoverView } from '@tarojs/components'
import { AtList, AtListItem, AtModal, AtButton } from 'taro-ui'
import request from '../../utils/request'
import './index.less'
export default class QuickAnswer extends Taro.Component {
    state = {
        quickModal: false,
        quickList: [],
        textAreaValue: ''
    }
    componentWillMount = () => {
        Taro.setNavigationBarTitle({
            title: ''
        })

    }
    componentDidMount() {
        this.props.setshowTextareaFalse();
    }
    textAreaGetValue = (val) => {
        let textVal = this.state.textAreaValue
        textVal += val
        this.setState({
            textAreaValue: textVal,
            quickModal: false
        })
    }
    getAnswer = () => {
        let params = {
            url: 'doctor/quick_reply',
            data: '',
            method: 'get'
        }
        request(params, true).then(res => {
            console.log('quickRes', res)
            this.setState({
                quickList: res,
                quickModal: true
            })

        }).catch(err => {
            console.log('err', err)
        })
    }
    setShowAnswerQuickFalse() {
        console.log('return ')
        this.props.showAnswerQuickFalse()
        this.props.setshowTextareaTrue();
    }
    setTextareaVal(e) {
        console.log('return end')
        console.log('val', e.detail.value)
        this.setState({
            textAreaValue: e.detail.value
        })
        this.props.setTextareaVal(e.detail.value)
    }
    render() {
        return (
            <View style='height:100vh;width:100vw;position:absolute;top:0;background-color:white;z-index:888'>
                <AtModal isOpened={this.state.quickModal}>
                    <AtModalHeader>快捷回复</AtModalHeader>
                    <AtModalContent sytle='text-align:center'>
                        <AtList>
                            {this.state.quickList.map((item, index) => {
                                return <AtListItem title={item.title} onClick={this.textAreaGetValue.bind(this, item.content)} />
                            })}
                        </AtList>
                    </AtModalContent>
                </AtModal>
                    <View style='overflow:hidden;height:80%'><Textarea name='message' onInput={this.setTextareaVal.bind(this)} value={this.state.textAreaValue} placeholder='输入回复信息' adjust-position={false} maxlength={-1} style=' background:#black;width:100%;min-height:50rpx;max-height:100%;padding:0 30rpx;' autoHeight autoFocus={true} /></View>
                    <View style='width:100vw;height:15.5%;border-top:1px solid gray;display:flex; align-items:center;position:fixed;bottom:0;flex-wrap:wrap;z-iondex:889;background-color:white'>
                        <View style='color:blue;margin-left:20rpx;width:100vw;height:100rpx;display:flex; align-items:center' onClick={this.getAnswer.bind(this)}><View>快捷回复</View></View>
                        <View style='width:100vw;display:flex; justify-content:space-between'>
                            <View style='width:49%'><AtButton onClick={this.setShowAnswerQuickFalse.bind(this)} type='primary'>取消</AtButton></View>
                            <View style='width:49%'><AtButton type='secondary' formType='submit'>发送</AtButton></View>
                        </View>
                    </View>
            </View>
        )
    }
}
