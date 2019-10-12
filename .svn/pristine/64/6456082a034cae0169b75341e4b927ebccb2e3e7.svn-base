import Taro from '@tarojs/taro'
import { View, Button, Textarea, Icon } from '@tarojs/components';

import { AtTextarea } from 'taro-ui'

// import styles from './index.less'
import './index.less'

export default class ChatInput extends Taro.Component {
    render() {
        return (
            <View className='input-panel'>
                <View style={{ width: '80%', float: 'left' }}>
                    <AtTextarea
                    count={false}
                    showConfirmBar={false}
                    className='input-input' autoHeight />
                </View>
                <View style={{ width: '19%', float: 'right' }}>
                    <Button className='input-send'>发送</Button>
                </View>
                <View style={{clear:"both", height:'50px'}} className='input-tools'>
                    <Icon type='success' />
                </View>
            </View>
        )
    }
}