import {Opponent} from '../../scoreboard/types';

export type SOCKET_EVENTS =
  'init-connection' |
  'state-change' ;

export const SOCKET_EVENT = 'SOCKET_EVENT';
export const SOCKET_CONNECT = 'SOCKET_CONNECT';

interface SocketEventAction {
  type: typeof SOCKET_EVENT;
  event: SOCKET_EVENTS,
  payload: {
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
}

export interface SocketConnectAction {
  type: typeof SOCKET_CONNECT
}

export type SocketActionTypes = SocketEventAction;
