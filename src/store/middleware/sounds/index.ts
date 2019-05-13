import { PLAYER_MOVED } from './../../player/types';
import { Middleware } from "redux";
import _sample from 'lodash.sample';

const sounds = [261.6, 440, 830.6];

function playSound(context: AudioContext, frequency: number) {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = 'sine';
  osc.connect(gain);
  osc.frequency.value = frequency;
  gain.connect(context.destination);
  osc.start(0);
  gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
}

export const Sounds: Middleware = store => {
  const context = new AudioContext();

  return next => {
    return action => {
      if (action.type === PLAYER_MOVED) {
        playSound(context, _sample(sounds));
      }

      return next(action);
    }
  }
};

export default Sounds;
