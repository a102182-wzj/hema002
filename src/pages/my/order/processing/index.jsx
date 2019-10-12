import Taro from '@tarojs/taro'
import { View, Image, OpenData } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import request from '../../../../utils/request'
import * as check from '../../../../utils/check'
import './index.less'
import Isloggin from '../../../../components/LoginAuthor/index'
export default class Processing extends Taro.Component {
    
    state = {
        current: 0,
        questionlList: []
    }
    onService(item){
        console.log(item.order)
        Taro.navigateTo({
            url: '/pages/my/order/doctorReply/index?no='+item.order+'&item='+JSON.stringify(item)
          })
    }
    componentWillMount = () => {
        check.checkToken();
        const token=Taro.getStorageSync('doctor-online-token')
        let params = {
            url: 'doctor/order/new',
            data: '',
            method: 'get'
        }
         request(params, true).then(
            res=>{
                console.log('proRes',res)
                this.setState({
                    questionlList:res 
                })
            }
        )
       
    }
    render() {
       const list=this.state.questionlList
       const listItems=list.map((item,index)=>{
           return <AtListItem title={item.baby.name+" "+item.baby.gender+item.baby.age} note={item.content}  taroKey={index} arrow='right' onClick={()=>{this.onService(item)}} />
       })
        return (
            <View>
                <Isloggin></Isloggin>
                <AtList>
                   {listItems}
                </AtList>
            </View>
        )
    }
}
