import {Opponent} from '../../scoreboard/types';

export type SOCKET_EVENTS =
  'init-connection' |
  'state-change' |
  'player-scored';

export const SOCKET_EVENT = 'SOCKET_EVENT';
export const SOCKET_CONNECT = 'SOCKET_CONNECT';

export interface SocketPlayerPayload {
  player: {
    id: string,
    username: string,
    currentScore: number
  }
}

export interface SocketStateChangePayload {
  opponents: {
    byId: {[k: string]: Opponent},
    ids: string[]
  },
  grid: {
    maze: number[][],
    rows: number,
    columns: number,
    starting: [number, number],
    ending: [number, number],
  },
  currentState: 'waiting' | 'playing'
}

interface SocketEventAction {
  type: typeof SOCKET_EVENT;
  event: SOCKET_EVENTS,
  payload: SocketPlayerPayload & SocketStateChangePayload
}

export interface SocketConnectAction {
  type: typeof SOCKET_CONNECT
}

export type SocketActionTypes = SocketEventAction;
