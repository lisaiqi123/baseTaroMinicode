import { ADD, DELETE, CLEAR_TIME} from '../constants/todos'

export const addTodos = (data: any) => {
  return {
    data,
    type: ADD
  }
}

export const delTodos = (id: any) => {
  return {
    id,
    type: DELETE
  }
}
export const clearTime = (data: any) => {
  return {
    data,
    type: CLEAR_TIME
  }
}