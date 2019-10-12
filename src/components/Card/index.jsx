import Taro from '@tarojs/taro'
import { View ,Input} from '@tarojs/components'
import { AtIcon, AtCard, AtInput,AtList, AtListItem } from 'taro-ui'
import request from '../../../utils/request'
import './index.less'
export default class Card extends Taro.Component {
    state = {
        item: {}
    }
    componentWillMount = () => {
        this.setState({
            item: JSON.parse(this.props.order)
        })
    }
    render() {
        return (
            <View style='margin-top:20px;width:100%' className='cardWzj'>
                <View syle='width:85vw' >
                    <AtInput
                        title='姓名'
                        type='text'
                        value={this.state.item.baby.name}
                        disabled={true}
                    />
                    <AtInput
                        title='性别'
                        type='text'
                        value={this.state.item.baby.gender}
                        disabled={true}
                    />
                    <AtInput
                        title='年龄'
                        type='text'
                        value={this.state.item.baby.age}
                        disabled={true}
                    />
                    <AtInput
                        title='药物过敏'
                        type='text'
                        value={this.state.item.baby.drug_allergy}
                        disabled={true}
                    />
                </View>

            </View>
        )
    }
}
