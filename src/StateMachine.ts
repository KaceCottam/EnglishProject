class StateMachine {
    numberOfStates: number;
    states: Function[];
    nextState: number;
    constructor() {
        this.numberOfStates = 0;
        this.states = [];
        this.nextState = 0;
    }
    enqueue(state : Function): StateMachine {
        this.states.push(state);
        this.numberOfStates++;
        return this;
    }
    runOnce(): StateMachine {
        try {
            this.states[this.nextState]();
        } catch (e) {
            console.log(`Error! No State ${this.nextState}!`);
            this.nextState = this.numberOfStates;
        }
        this.nextState++;
        return this;
    }
    start(): StateMachine {
        this.nextState = 0;
        while (this.nextState < this.numberOfStates) {
            this.runOnce();
        }
        return this;
    }
}

