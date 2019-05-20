import { ORDER_SUCCESS, RESPONSE_SUCCESS } from './types'

export function sendOrder(order) {
  return {
    type: ORDER_SUCCESS,
    payload: order,
  }
}

export function sendResponse(response) {
  return {
    type: RESPONSE_SUCCESS,
    payload: response,
  }
}
