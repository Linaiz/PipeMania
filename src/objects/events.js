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

export const QUEUE_EVENTS = {
    POP_QUEUE: 'POP_QUEUE',
    QUEUE_POPPED: 'QUEUE_POPPED',
};
export const queueEmitter = new Phaser.Events.EventEmitter();

export const WATER_EVENTS = {
    WATER_START: 'WATER_START',
    WATER_PROGRESS: 'WATER_PROGRESS',
    FILL_CELL: 'FILL_CELL',
    WATER_STOP: 'WATER_STOP',
}
export const waterEmitter = new Phaser.Events.EventEmitter();

export const SCORE_EVENTS = {
    SCORE_REACHED: 'SCORE_REACHED',
    SCORE_NOT_REACHED: 'SCORE_NOT_REACHED',
    SCORE_READY: 'SCORE_READY',
    UPDATE_SCORE: 'UPDATE_SCORE',
}
export const scoreEmitter = new Phaser.Events.EventEmitter();