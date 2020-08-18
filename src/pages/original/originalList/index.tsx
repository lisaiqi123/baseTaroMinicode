import Taro, { Component } from '@tarojs/taro'
import { View, Input, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { addTodos, delTodos } from '../../../module/actions/todos'

import './index.scss'

export class Index extends Component<any,any> {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor (props) {
    super (props)
    this.state = {
      newTodo: '',
      bannerData:[]
    }
  }

  componentWillMount () { }

  componentDidMount () {
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  saveNewTodo (e: { detail: { value: any } }) {
    let { newTodo } = this.state
    if (!e.detail.value || e.detail.value === newTodo) return

    this.setState({
      newTodo: e.detail.value
    })
  }

  add () {
    let { newTodo } = this.state
    let { addTodos } = this.props
    
    if (!newTodo) {return;}

    addTodos(newTodo)
    
    this.setState({
      newTodo: ''
    })
  }

  del (id: any) {
    let { delTodos } = this.props
    delTodos(id)
  }

  render () {
    let { newTodo } = this.state
    let { todos } = this.props  
    // 获取未经处理的todos并展示
    const todosJsx = todos.map((todo,index) => {
      return (
        <View className='todos_item fl-row-justy' key={index}><Text>{todo.text}</Text><View className='delTodos' onClick={this.del.bind(this, todo.id)}>-</View></View>
      )
    })
    return (
      <View>
        <View className='index todos'>
          <View className='add_wrap'>
            <Input placeholder="填写新的todo" onBlur={this.saveNewTodo.bind(this)} value={newTodo} />
            <View className='Btn' onClick={this.add.bind(this)}>+</View>
          </View>
          <View>{ todosJsx }</View>  
        </View>
      </View>
    )
  }
}


export default connect (
  (state) => ({
    todos: state.todos.todos,
    user: state.user
  }), 
  (dispatch) => ({
    addTodos (data:any) {
      dispatch(addTodos(data))
    },
    delTodos (id:any) {
      dispatch(delTodos(id))
    }
  })
)(Index)