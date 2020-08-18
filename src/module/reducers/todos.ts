import { ADD, DELETE,CLEAR_TIME } from '../constants/todos'

// 定义初始状态
const INITIAL_STATE = {
  todos: [
    {id: 0, text: '第一条todo'}
  ],
  Interval:null,//倒计时
}

export default function todos (state = INITIAL_STATE, action) {
  // 获取当前todos条数，用以id自增
  let todoNum = state.todos.length
  
  switch (action.type) {  
    // 根据指令处理todos
    case ADD:      
      return {
        ...state,
        todos: state.todos.concat({
          id: todoNum,
          text: action.data
        })
      }
    case DELETE:
      let newTodos = state.todos.filter(item => {
        return item.id !== action.id
      })
      
      return {
        ...state,
        todos: newTodos
      }
    case CLEAR_TIME:
      if (action.data == null) {
        clearInterval(state.Interval);
      }
      return {
        ...state,
        Interval: action.data
      }
    default:
      return state
  }
}