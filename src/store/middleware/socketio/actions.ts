import { SOCKET_EVENT, SOCKET_EVENTS, SOCKET_CONNECT } from './types';

export function socketEvent(event: SOCKET_EVENTS, payload: Object) {
  return {
    type: SOCKET_EVENT,
    event,
    payload
  }
}

export function socketConnect() {
  return {
    type: SOCKET_CONNECT
  }
}