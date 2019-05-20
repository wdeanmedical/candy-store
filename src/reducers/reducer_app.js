import { ORDER_SUCCESS, RESPONSE_SUCCESS } from '../actions/types'

const INITIAL_STATE = {
  order: null,
  response: null,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ORDER_SUCCESS:
      return { ...state, order: action.payload }
    case RESPONSE_SUCCESS:
      return { ...state, response: action.payload }
    default:
      return state
  }
}
