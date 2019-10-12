import Taro from '@tarojs/taro'
import { View, Image, OpenData } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import request from '../../../utils/request'
import './index.less'
import Processing from './processing/index'
export default class Order extends Taro.Component {
    state = {
        current: 0
    }
    config = {
        navigationBarTitleText: '我的订单',
        backgroundColor: '#F8F8F8',
    }

    componentWillMount = () => {
    }
    handleClick (value) {
        this.setState({
          current: value
        })
      }
    render() {
        const tabList = [{ title: '进行中' }, { title: '已结束' }]
        return (
          <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0} >
              <Processing></Processing>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
            </AtTabsPane>
          </AtTabs>
        )
    }
}
