export class GameLoop {
    constructor(update, render) {
        
        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000 / 60; // 60 frames per second
        
        this.update = update;
        this.render = render;

        this.rafId = null;
        this.isRunning = false;
    }

    mainLoop = (timestamp) => {
        if(!this.isRunning) return;

        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        //  Accumulate all the time sinnce the last frame.
        this.accumulatedTime += deltaTime;

        // Fixed time step updates.
        // If there's enough accumulated time to run or more fixed update
        while(this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep); // Here, we pass the fixed time step
            this.accumulatedTime -= this.timeStep;
        }

        // Render
        this.render();

        this.rafId = requestAnimationFrame(this.mainLoop);
    }
}