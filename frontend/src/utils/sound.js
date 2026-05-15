import { Howl } from 'howler';

const sounds = {
  hover: new Howl({ src: ['https://assets.codepen.io/21542/hover.mp3'], volume: 0.1 }),
  click: new Howl({ src: ['https://assets.codepen.io/21542/click.mp3'], volume: 0.2 }),
  success: new Howl({ src: ['https://assets.codepen.io/21542/success.mp3'], volume: 0.2 }),
};

let muted = true;

export const playSound = (type) => {
  if (muted || !sounds[type]) return;
  sounds[type].play();
};

export const toggleMute = () => {
  muted = !muted;
  return muted; // true = muted
};

export const isMuted = () => muted;