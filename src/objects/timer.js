export default class Timer {
    /**
     * Creates a Timer instance.
     * @param {Phaser.Scene} scene - The scene where the timer will run.
     * @param {number} duration - Timer duration in seconds.
   */
    constructor(scene, duration) {
        this.scene = scene; 
        this.duration = duration;
        this.remainingTime = this.duration;
        this.timerEvent = null;
    }

    start() {
        if (this.timerEvent) return; // Prevent multiple starts
    
        this.timerEvent = this.scene.time.addEvent({
            delay: 1000, // 1 second interval
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
        });
    }

    stop() {
        if (this.timerEvent) {
            this.timerEvent.remove();
            this.timerEvent = null;
        }
    }

    updateTimer() {
        if (this.remainingTime > 0) {
            this.remainingTime--;  
            // Update UI text
        } else {
            this.stop();
            // Emit Time Up event
        }
    }
  
}