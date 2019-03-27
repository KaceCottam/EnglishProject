function containsClass(element: HTMLElement, text: string) : boolean {
    return element.classList.contains(text);
}
class TypingMachine {
    texts: HTMLCollection;
    currentIndex: number;
    endFunc : Function;
    constructor(parentDiv: HTMLDivElement, endFunc:Function) {
        this.texts = parentDiv.children;
        this.endFunc = endFunc;
    }

    typing = false;
    wordStart = -1;

    hasClass(index: number, text: string) {
        return this.texts[index].classList.contains(text);
    }

    completeText(from: number, to: number = from) {
        for (let i = from; i < to; i++) {
            this.texts[i].classList.add("completed");
            this.texts[i].classList.remove("active");
        }
    }

    activateText(from: number, to: number = from) {
        for (let i = from; i < to; i++) {
            this.texts[i].classList.add("active");
        }
    }

    getNextOfCharacter(start: number, character: string) : number {
        let index = start+1;
        while (this.texts[index++].innerHTML !== character);
        return index;
    }

    checkText(e: string,comp: string = this.texts[this.currentIndex].innerHTML) {
        return e === comp;
    }

    moveCursor(num: number) {
        this.texts[this.currentIndex].classList.remove("cursor");
        this.currentIndex += num;
        this.texts[this.currentIndex].classList.add("cursor");
    }

    verifySpan() {
        while (!this.texts[this.currentIndex].classList.contains("text")) {
            this.moveCursor(1);
        }
    }

    startTyping() {
        this.typing = true;
        this.currentIndex = 0;
        this.activateText(this.currentIndex, this.getNextOfCharacter(this.currentIndex, " "));
        this.wordStart = this.currentIndex;
        this.moveCursor(0);
        var listener = (e: KeyboardEvent) => {
            try {
                if (this.checkText(e.key)) {
                    if (this.checkText(e.key, " ") && this.wordStart !== -1) {
                        this.completeText(this.wordStart,this.currentIndex);
                        this.wordStart = -1;
                    } 
                    if (this.checkText(e.key, " ") && this.wordStart === -1) {
                        this.wordStart = this.currentIndex;
                        this.activateText(this.currentIndex, this.getNextOfCharacter(this.currentIndex, " "));
                    }
                    this.moveCursor(1);
                    this.verifySpan();
                }
            } catch (e) {
                // Error has to be out of index range.
                this.typing = false;
                document.removeEventListener("keydown", listener);
                this.endFunc();
            }
            return !(e.keyCode == 32);
        };
        document.addEventListener("keydown", listener);
    }
}