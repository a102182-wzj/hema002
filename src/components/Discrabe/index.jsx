import Taro, { Component } from '@tarojs/taro'
import { AtInput, AtForm } from 'taro-ui'
import { ScrollView } from '@tarojs/components'
import request from '../../utils/request'
export default class PageView extends Component {

    componentWillMount(){
        
        let params={
            url:'',
            data:'',
            method:''
        }
        setInterval(()=>{

        },5000)
    }

  render() {
    return (
            <View style='100vw'>

            </View>
    )
  }
}