import Taro, { Component, Events } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './index.scss'
import play from '../../../../image/chat/sound_play.gif'
import stop from '../../../../image/chat/sound.png'

const app = getApp()


class Index extends Component {
    static defaultProps = {
        play: false
    }

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.descData,
            playing: this.props.play,
            heights: [],
            user: this.props.userData,
            doctor: this.props.doctorData,
            isImage: false
        }
    }

    componentWillMount() {
        if (typeof this.state.data.content == 'object') {
            this.setState({
                isImage: true
            })
        }
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentWillReceiveProps() {
        //控制所有组件的播放显示状态
        this.setState({
            playing: this.props.play
        })
    }

    voiceController = (path) => {
        //未切换音频 控制暂停播放
        if (app.globalData.no == this.props.index) {
            app.innerAudio.paused ? app.innerAudio.play() : app.innerAudio.pause()
            app.innerAudio.onPause(() => {
                this.setState({
                    playing: false
                })
            })
            app.innerAudio.onEnded(() => {
                this.setState({
                    playing: false
                })
            })
        }
        //切换音频
        else {
            app.globalData.no = this.props.index
            Taro.eventCenter.trigger('changeVoiceStatus', path)
            app.innerAudio.play()
            app.innerAudio.onPlay(() => {
                this.setState({
                    playing: true
                })
            })
            app.innerAudio.onEnded(() => {
                this.setState({
                    playing: false
                })
            })
        }
    }

    //图片预览
    previewImage = (item) => {
        Taro.previewImage({
            urls: [item]
        })
    }

    //图片加载 用于判断宽高比
    imageOnLoad = (e, index) => {
        let heights = this.state.heights
        if (e.detail.height > e.detail.width) {
            heights.push(index)
            this.setState({
                heights
            })
        }
    }

    toCoupon = () => {
        Taro.navigateTo({
            url: '../my/coupon/list/index'
        })
    }

    render() {
        let data = this.state.data
        let heights = this.state.heights
        let user = this.state.user
        //每个-no-myself为应在左侧的内容
        return (
            <View className='describe'>
                <View className='describe-time'>{data.create}</View>
                <View className={data.my ? 'describe-content' : 'describe-content-no-myself'}>
                    {!data.my ?
                        <View className='describe-content-headimg'>
                            <Image src={doctor.headimg} className='headimg' />
                        </View>
                        : null}
                    <View className={data.my ? 'describe-content-area' : 'describe-content-area-no-myself'} >
                        <View className={data.my ? 'name' : 'name-no-myself'}>{data.my ? user.name : doctor.name}</View>
                        {data.content_type == 1 && isImage == false ? <View className={data.my ? 'content' : 'content-no-myself'}><Text>{data.content}</Text></View> : null}
                        {data.isAudio == true ?
                            <View className={data.my ? 'voice' : 'voice-no-myself'} style={{ width: Taro.pxTransform(data.time * 15) }} onClick={this.voiceController.bind(this, data.path)}>
                                <Image className={data.my ? 'voice-icon' : 'voice-icon-no-myself'} src={this.state.playing ? play : stop}></Image>
                                <View className={data.my ? 'voice-time' : 'voice-time-no-myself'}>{data.time}"</View>
                            </View>
                            : null}
                        {this.state.isImage == true ?
                            <View className={data.my ? 'images' : 'images-no-myself'}>
                                {data.content.map((item, index) => {
                                    let imagehei = false
                                    //判断图片宽高比例
                                    heights.map((hei) => {
                                        if (hei == index) {
                                            imagehei = true
                                        }
                                    })
                                    return (
                                        <Image src={'https://hippo-doctor-1258520047.cos.ap-beijing.myqcloud.com/' + item} className={imagehei ? 'image-h' : 'image-w'} mode='widthFix' onClick={this.previewImage.bind(this, item)} onLoad={(e) => { this.imageOnLoad(e, index) }} />
                                    )
                                })}
                            </View>
                            : null}
                        {data.type == 'coupon' ?
                            <View className='coupon'>{item.name}给您发送了一张优惠券, <Text className='coupon-text' onClick={() => this.toCoupon()}>点击查看</Text></View>
                            : null}
                    </View>
                    {data.my ?
                        <View className='describe-content-headimg'>
                            <Image src={user.headimg} className='headimg' />
                        </View>
                        : null}
                </View>
            </View>
        )
    }
}


