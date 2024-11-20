export const TIMER_EVENTS = {
    TIME_START: 'TIME_START',
    UPDATE_TIMER: 'UPDATE_TIMER',
    TIME_UP: 'TIME_UP',
};
  
export const timerEmitter = new Phaser.Events.EventEmitter();