var StateMachine = /** @class */ (function () {
    function StateMachine() {
        this.numberOfStates = 0;
        this.states = [];
        this.nextState = 0;
    }
    StateMachine.prototype.enqueue = function (state) {
        this.states.push(state);
        this.numberOfStates++;
        return this;
    };
    StateMachine.prototype.runOnce = function () {
        try {
            this.states[this.nextState]();
        }
        catch (e) {
            console.log("Error! No State " + this.nextState + "!");
            this.nextState = this.numberOfStates;
        }
        this.nextState++;
        return this;
    };
    StateMachine.prototype.start = function () {
        this.nextState = 0;
        while (this.nextState < this.numberOfStates) {
            this.runOnce();
        }
        return this;
    };
    return StateMachine;
}());
//# sourceMappingURL=StateMachine.js.map