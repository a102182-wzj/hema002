import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, Textarea, Input, RichText, Text } from '@tarojs/components'
import { AtTextarea } from 'taro-ui'
import './index.scss'
import Img from '../../../../image/ico/img.png'
import Voice from '../../../../image/ico/voice.png'
import Emoji from '../../../../image/ico/emoji.png'
import EmojiS from '../../../../image/ico/emojiselect.png'
// import Full from '../../image/ico/full.png'
import records from '../../../../image/record/record.png'
import recordPlay from '../../../../image/record/record_play.png'
import recordStop from '../../../../image/record/record_stop.png'
import recordPause from '../../../../image/record/record_pause.png'

const record = Taro.getRecorderManager()
const innerAudio = Taro.createInnerAudioContext()
var timer = ''
var recordTimer = ''
var recordPlayTimer = ''

class Index extends Component {

    constructor(props) {
        this.state = {
            authorize: false,   //权限
            recordStatus: false, //录音状态
            startRecord: false,//开始录音？
            time: 0, //录音时长
            playtime: 0,//   播放时长
            changeLineHeight: true,//改变输入框行高
            textarea: '',//文字
            recordcontroller: records,   //录音按钮状态
            recordPath: '', //录音路径
            recordTime: '00:00',  //录音显示时间
            recordPlayTime: '00:00', //录音播放显示时间
            showPlayTime: false,//  展示播放时间?
            showtextarea: false,
            keyheight: 0,
            showEmoji: false,
            current: 0,
            bots: new Array(2),
            cursor: ''
        }
    }

    componentWillMount() {
        this.setState({
            emojis1: ['😊', '😅', '😲', '😭', '😂', '😄', '😩', '😞', '😵', '😒', '😍',
                '😤', '😜', '😝', '😋', '😘', '😚', '😷', '😳', '😃', '😆', '😁', '😢', '😨',
                '😠', '😣', '😌', '😖',],
            emojis2: ['😔', '😰', '😱', '😪', '😏', '😓', '🍎', '👿', '🐎', '🐴', '🙏']
        })

        Taro.getSetting({
            success: res => {
                if (res.authSetting['scope.record'] == true) {
                    this.setState({
                        authorize: true
                    })
                }
            }
        })
    }

    componentDidMount() {
        this.getHeight()
    }

    componentWillUnmount() { }

    componentWillReceiveProps() { }

    getHeight = () => {
        Taro.createSelectorQuery().in(this.$scope).select('.bottom')
            .boundingClientRect(rect => {
                console.log(rect)
                Taro.eventCenter.trigger('getHeight', rect.height)
            })
            .exec()
    }

    //录音开始
    startRecord = () => {
        innerAudio.stop()
        Taro.eventCenter.trigger('changeVoiceStatus')
        if (this.state.authorize) {
            record.start()
            Taro.showLoading({
                title: '正在录音'
            })
            this.setState({
                startRecord: true,
                time: 1,
                recordcontroller: recordStop
            })
            timer = setInterval(() => {
                let time = this.state.time
                this.setState({
                    time: time + 1
                })
            }, 1000)
            recordTimer = setInterval(() => {
                let time = this.state.time
                let recordTime = (Math.floor(time / 60) < 1 ? '00' : '0' + Math.floor(time / 60)) + ':' + (time % 60 < 10 ? '0' + time % 60 : time % 60)
                this.setState({
                    recordTime
                })
            }, 1000)
        } else {
            Taro.authorize({
                scope: 'scope.record',
                success: res => {
                    this.setState({
                        authorize: true
                    })
                },
                fail: err => {
                    console.log(err)
                }
            })
        }
    }

    endRecord = () => {
        if (this.state.startRecord) {
            record.stop()
            record.onStop((e) => {
                clearInterval(timer)
                clearInterval(recordTimer)
                Taro.hideLoading()
                let time = this.state.time
                let path = e.tempFilePath
                this.setState({
                    startRecord: false,
                    recordcontroller: recordPlay,
                    recordPath: path
                })
                // Taro.eventCenter.trigger('pushAudio', path, time)
            })
        }
    }

    chooseImage = () => {
        Taro.chooseImage({
            count: 5,
            success: res => {
                let paths = res.tempFilePaths
                Taro.eventCenter.trigger('pushImage', paths)
            }
        })
    }

    chooseEmoji = () => {
        this.setState({
            showEmoji: this.state.showEmoji ? false : true,
            current: this.state.showEmoji ? 0 : this.state.current
        })

    }


    //添加表情
    addEmoji = (item) => {
        this.setState({
            textarea: this.state.cursor === '' ? this.state.textarea.concat(item) : this.state.textarea.slice(0, this.state.cursor) + item + this.state.textarea.slice(this.state.cursor),
        })
    }

    //控制输入框文字居中
    onLinechange = (e) => {
        // Taro.eventCenter.trigger('onLinechange', e.detail.lineCount)
        this.setState({
            changeLineHeight: e.detail.lineCount > 1 ? true : false
        })
    }

    onFocus = (e) => {
        this.setState({
            keyheight: e.detail.height,
            showEmoji: false,
            current: 0
        })
    }

    //输入文字
    changeInput = (e) => {
        this.setState({
            textarea: e.detail.value
        })
    }

    //swiper变化
    changeSwiper = (e) => {
        this.setState({
            current: e.detail.current
        })
    }

    //发送按钮
    submit = () => {
        Taro.eventCenter.trigger('submit', this.state.textarea)
        this.setState({
            textarea: '',
            showFull: false,
            showtextarea: false,
            showEmoji: false,
            current: 0
        })
    }

    pushAudio = () => {
        innerAudio.stop()
        clearInterval(timer)
        clearInterval(recordTimer)
        clearInterval(recordPlayTimer)
        let path = this.state.recordPath
        let time = this.state.time
        Taro.eventCenter.trigger('pushAudio', path, time)
        this.setState({
            recordStatus: false,
            recordcontroller: records,
            recordPath: '',
            time: 0,
            recordTime: '00:00',
            showPlayTime: false,
            recordPlayTime: '00:00',
            playtime: 0
        })
    }

    //准备录音
    readyRecord = () => {
        this.setState({
            recordStatus: true
        })
    }

    //取消录音
    cancelRecord = () => {
        clearInterval(timer)
        clearInterval(recordTimer)
        clearInterval(recordPlayTimer)
        innerAudio.stop()
        record.stop()
        Taro.hideLoading()
        this.setState({
            recordStatus: false,
            recordcontroller: records,
            recordPath: '',
            time: 0,
            recordTime: '00:00',
            showPlayTime: false,
            recordPlayTime: '00:00',
            playtime: 0
        })
    }

    //播放和暂停录音
    controllRecord = () => {
        innerAudio.src = this.state.recordPath
        this.setState({
            showPlayTime: true
        })
        innerAudio.onEnded(() => {
            this.setState({
                recordcontroller: recordPlay,
                playtime: 0,
                recordPlayTime: '00:00',
                showPlayTime: false
            })
            clearInterval(recordPlayTimer)
        })

        if (this.state.recordcontroller == recordPlay) {
            innerAudio.play()
            recordPlayTimer = setInterval(() => {
                let time = this.state.time
                let recordPlayTime = this.state.recordPlayTime
                let playtime = this.state.playtime
                if (playtime < time) {
                    playtime = playtime + 1
                    recordPlayTime = (Math.floor(playtime / 60) < 1 ? '00' : '0' + Math.floor(playtime / 60)) + ':' + (playtime % 60 < 10 ? '0' + playtime % 60 : playtime % 60)
                }
                this.setState({
                    playtime,
                    recordPlayTime
                })
            }, 1000)
        } else {
            innerAudio.pause()
            clearInterval(recordPlayTimer)
        }
        this.setState({
            recordcontroller: this.state.recordcontroller == recordPlay ? recordPause : recordPlay
        })
    }


    render() {
        let emojis1 = this.state.emojis1
        let emojis2 = this.state.emojis2
        let emojiList1 = emojis1.map(item => {
            return (
                <RichText className='emojiItem' nodes={item} onClick={() => this.addEmoji(item)}></RichText>
            )
        })
        let emojiList2 = emojis2.map(item => {
            return (
                <RichText className='emojiItem' nodes={item} onClick={() => this.addEmoji(item)}></RichText>
            )
        })

        let bots = this.state.bots

        return (
            <View className='pages' >
                <View className='bottom' id='bottom' >
                    {this.state.recordStatus ?
                        <View className='record-area'>
                            <View className='record-area-top'>
                                <View className='record-button'>
                                    {this.state.recordcontroller == recordPlay || this.state.recordcontroller == recordPause ?
                                        <Image src={this.state.recordcontroller} className='record-controller' onClick={() => { this.controllRecord() }} />
                                        :
                                        <Image src={this.state.recordcontroller} className='record-controller' onClick={() => { this.state.recordcontroller == recordStop ? this.endRecord() : this.startRecord() }} />
                                    }
                                </View>
                                <View className='record-time'>{this.state.showPlayTime ? this.state.recordPlayTime : this.state.recordTime}</View>
                            </View>
                            <View className='record-area-bottom'>
                                <Button className='record-area-bottom-button' disabled={this.state.recordPath == '' ? true : false} onClick={() => this.pushAudio()}>发送</Button>
                                <Button className='record-area-bottom-buttonr' onClick={() => this.cancelRecord()}>取消</Button>
                            </View>
                        </View>
                        :
                        <View >
                            <View className='bottom-top'>
                                {this.state.showtextarea ? <Textarea className={this.state.changeLineHeight ? ' textarea-change' : 'textarea'} maxlength={500} adjust-position={false}
                                    onInput={(e) => this.changeInput(e)} value={this.state.textarea} autoHeight={true} fixed={true} autoFocus={true} onBlur={(e) => {
                                        console.log(e)
                                        this.setState({
                                            keyheight: 0,
                                            cursor: e.detail.cursor
                                        })
                                    }}
                                    onFocus={(e) => this.onFocus(e)}
                                    onLineChange={(e) => this.onLinechange(e)} />
                                    :
                                    <View className={this.state.changeLineHeight ? 'textarea-change' : 'textarea'} onClick={() => {
                                        this.setState({ showtextarea: true })
                                    }}>{this.state.textarea}</View>}
                                <Button className='submit' onClick={() => this.submit()} disabled={this.state.textarea == '' ? true : false} >发送</Button>
                            </View>
                            <View className='bottom-bottom' >
                                <Image src={Voice} className='icon' onClick={() => this.readyRecord()} />
                                <Image src={Img} className='icon' onClick={() => this.chooseImage()} />
                                <Image src={this.state.showEmoji ? EmojiS : Emoji} className='icon' onClick={() => this.chooseEmoji()} />
                            </View>
                            <View className='emojiBox' style={{ display: this.state.showEmoji ? '' : 'none' }} >
                                <Swiper className='emoji' onChange={(e) => this.changeSwiper(e)}>
                                    <SwiperItem className='emojiBlock'>{emojiList1}</SwiperItem>
                                    <SwiperItem className='emojiBlock'>{emojiList2}</SwiperItem>
                                </Swiper>
                                <View className='bot'>
                                    {bots.map((item, index) => {
                                        return (
                                            <View className={index == this.state.current ? 'botItem' : 'botItemun'} ></View>
                                        )
                                    })}

                                </View>
                            </View>
                            <View style={{ height: this.state.keyheight + 'px', width: '100%' }}></View>
                        </View>
                    }

                </View>
            </View>
        )
    }
}