import { FETCH_DATA } from '../actions/types'

export default function(state = {}, action) {
  console.log('App reducer action.type', action.type)

  switch (action.type) {
    case FETCH_DATA:
      return { ...state.simpleData, data: 'A0B3HCJ' }
    default:
      return state
  }
}
