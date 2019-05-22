import _sample from 'lodash.sample';
import _random from 'lodash.random';
import io from "socket.io-client";
import { socketEvent } from './actions'
import {
  SOCKET_CONNECT,
  SOCKET_EVENTS,
  SocketPlayerPayload,
  SocketStateChangePayload
} from './types';

// TODO
type StateUnionKeyToValue = {
  [K in string]?: Function
};

const colors = ['red', 'blue', 'green', 'yellow'];
const verbs = ['jumping', 'eating', 'dancing'];
const things = ['car', 'plane', 'program', 'computer', 'keyboard'];

function generateUserName() {
  return `${_sample(colors)}-${_sample(verbs)}-${_sample(things)}-${_random(999)}`;
}

function getEventsToSusbscribeTo(dispatch: Function): StateUnionKeyToValue {
  return {
    // server sends this to only one client, when client joins
    'init-connection': (data: SocketStateChangePayload | SocketPlayerPayload) => {
      console.log('alexalex - ++++++++++', 'init-connection', data);
      dispatch(socketEvent('init-connection', data));
    },
    'state-change': (data: SocketStateChangePayload) => {
      console.log('alexalex - ##########', 'state-change', data);
      dispatch(socketEvent('state-change', data));
    },
    'player-scored': (data: SocketPlayerPayload) => {
      dispatch(socketEvent('player-scored', data))
    }
    // 'connect': () => {
    // },
    // 'disconnect': () => {
    //   // dispatch(sessionsActions.connectionStatus('disconnected'));
    // },
    // 'connection': () => {
    // },
    // 'connected': () => {
    //   // debugger
    // },
    // 'fsm-state-change': (data: any) => {
    //   // dispatch(sessionsActions.stateChange(data));
    // },
    // 'players-update': (players: any) => {
    //   // dispatch(playersActions.playersUpdate(players));
    // },
    // 'debug': (message: any) => {
    //   console.log('alexalex - ---------- socket debug message', message);
    // }
  };
}

const socketMiddleware = (store: {dispatch: Function}) => {
  let socket: any;
  let heartbeat = true;

  function _socketConnect (dispatch: Function) {
    if (true) {
      console.log('attempting to connect to socket server...');
      socket = io('http://localhost:3005', {
        query: {
          name: generateUserName()
        },
        autoConnect: false,
      });

      socket.open();

      // socket.on = _overWriteTX();
      const eventsToListenTo = getEventsToSusbscribeTo(dispatch);

      for (let event in eventsToListenTo) {
        socket.on(event, eventsToListenTo[event]);
      }
    } else {
      console.log('running in offline mode, will not attempt to connect to server');
    }
  }

  // function _overWriteTX () {
  //   const oldOn = socket.on;
  //   return function (name: string, callback: Function) {
  //     const _callback = (args: any) => {
  //       console.log('%cRX: ' + name, 'color: green; font-weight: bold', args || '');
  //       if (!heartbeat) {
  //         console.log('ignoring event since heartbeat is off');
  //       } else if (callback) {
  //         callback(args);
  //       }
  //     };
  //     return oldOn.call(this, name, _callback);
  //   };
  // }

  return (next: any) => (action: any) => {
    const result = next(action);
    if (action.type === SOCKET_CONNECT) {
      _socketConnect(store.dispatch);
    // } else if (action.type === SESSION_HEART_BEAT_STATE_CHANGE) {
    //   heartbeat = action.newState;
    } else if (action.socketEvent && socket && socket.emit /* && heartbeat */) {
      const payload = action.socketPayload || {};
      console.log('%cTX: ' + action.socketEvent, 'color: red; font-weight: bold', payload);
      socket.emit(action.socketEvent, payload);
    }

    return result;
  };
};

export default socketMiddleware;
