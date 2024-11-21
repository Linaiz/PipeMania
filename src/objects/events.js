export const TIMER_EVENTS = {
    TIME_START: 'TIME_START',
    UPDATE_TIMER: 'UPDATE_TIMER',
    TIME_UP: 'TIME_UP',
};
export const timerEmitter = new Phaser.Events.EventEmitter();

export const PIPE_EVENTS = {
    FILL_PIPE: 'FILL_PIPE',
    PLACE_PIPE: 'PLACE_PIPE',
    PIPE_UPDATED: 'PIPE_UPDATED',
};
export const pipeEmitter = new Phaser.Events.EventEmitter();

export const WATER_EVENTS = {
    WATER_START: 'WATER_START',
    WATER_PROGRESS: 'WATER_PROGRESS',
    WATER_STOP: 'WATER_STOP',
}
export const waterEmitter = new Phaser.Events.EventEmitter();