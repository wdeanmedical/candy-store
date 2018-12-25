import {
  PROVIDER_RESPONSE_SUCCESS,
  AMBI_RESPONSE_SUCCESS,
} from '../actions/types'

const INITIAL_STATE = {
  providerResponse: null,
  ambiResponse: null,
}

export default function(state = INITIAL_STATE, action) {
  console.log('App reducer action.type', action.type)

  switch (action.type) {
    case PROVIDER_RESPONSE_SUCCESS:
      console.log('state.providerResponse', action.payload)
      return { ...state, providerResponse: action.payload }
    case AMBI_RESPONSE_SUCCESS:
      console.log('state.ambiResponse', action.payload)
      return { ...state, ambiResponse: action.payload }
    default:
      return state
  }
}
