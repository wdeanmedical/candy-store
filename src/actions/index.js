import { PROVIDER_RESPONSE_SUCCESS, AMBI_RESPONSE_SUCCESS } from './types'

export function sendProviderResponse(response) {
  return {
    type: PROVIDER_RESPONSE_SUCCESS,
    payload: response,
  }
}

export function sendAmbiResponse(response) {
  console.log(`action - response: ${response}`)
  return {
    type: AMBI_RESPONSE_SUCCESS,
    payload: response,
  }
}
