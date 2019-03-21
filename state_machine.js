class StateMachine {
    constructor() {
        this.NumberOfStates = 0;
        this.States = [];
        this.NextState = 0;
    }
    Enqueue(state) {
        this.States.push(state);
        this.NumberOfStates++;
        return this;
    }
    RunOnce () {
        try {
            this.States[this.NextState].Run(this); 
        } catch (e) {
            console.log('Error! No State ' + this.NextState + '!');
            this.NextState = this.NumberOfStates;
        }
        this.NextState++;
        return this;
    }
    Start() {
        this.NextState = 0;
        while (this.NextState < this.NumberOfStates) {
            this.RunOnce();
        }
        return this;
    }
}

class State {
    constructor(type, data) {
        this.Type = type;
        this.Data = data;
    }
    Run () {
        const bodyDiv = document.getElementById('bod');
        switch (this.Type) {
        case 'picture':
            bodyDiv.innerHTML += '<img class="text img" src="' + this.Data.picture + '" style="width:'+this.Data.width+';height:'+this.Data.height+';">';
            break;
        case 'p':
        case 'text':
            for (let i = 0; i < this.Data.length; ++i) {
                bodyDiv.innerHTML += '<span class="text">' + this.Data[i] + '</span>';
            }
            if (this.Type == 'p') {
                bodyDiv.innerHTML += '<br>';
            }
            break;
        case 'error':
            for (let i = 0; i < this.Data.length; ++i) {
                bodyDiv.innerHTML += '<span class="text error">' + this.Data[i] + '</span>';
            }
            break;
        case 'replace':
            for (let i = 0; i < this.Data.length; ++i) {
                bodyDiv.innerHTML += '<span class="text replace">' + this.Data[i] + '</span>';
            }
            break;
        case 'br':
            bodyDiv.innerHTML += '<br style="margin: '+this.Data+';"/>';
            break;
        case 'script':
            this.Data.call();
            break;
        default:
            throw 'State Type Error!'
        }
        return this;
    }
}

