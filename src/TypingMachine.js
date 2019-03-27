function containsClass(element, text) {
    return element.classList.contains(text);
}
var TypingMachine = /** @class */ (function () {
    function TypingMachine(parentDiv, endFunc) {
        this.typing = false;
        this.wordStart = -1;
        this.texts = parentDiv.children;
        this.endFunc = endFunc;
    }
    TypingMachine.prototype.hasClass = function (index, text) {
        return this.texts[index].classList.contains(text);
    };
    TypingMachine.prototype.completeText = function (from, to) {
        if (to === void 0) { to = from; }
        for (var i = from; i < to; i++) {
            this.texts[i].classList.add("completed");
            this.texts[i].classList.remove("active");
        }
    };
    TypingMachine.prototype.activateText = function (from, to) {
        if (to === void 0) { to = from; }
        for (var i = from; i < to; i++) {
            this.texts[i].classList.add("active");
        }
    };
    TypingMachine.prototype.getNextOfCharacter = function (start, character) {
        var index = start + 1;
        while (this.texts[index++].innerHTML !== character)
            ;
        return index;
    };
    TypingMachine.prototype.checkText = function (e, comp) {
        if (comp === void 0) { comp = this.texts[this.currentIndex].innerHTML; }
        return e === comp;
    };
    TypingMachine.prototype.moveCursor = function (num) {
        this.texts[this.currentIndex].classList.remove("cursor");
        this.currentIndex += num;
        this.texts[this.currentIndex].classList.add("cursor");
    };
    TypingMachine.prototype.verifySpan = function () {
        while (!this.texts[this.currentIndex].classList.contains("text")) {
            this.moveCursor(1);
        }
    };
    TypingMachine.prototype.startTyping = function () {
        var _this = this;
        this.typing = true;
        this.currentIndex = 0;
        this.activateText(this.currentIndex, this.getNextOfCharacter(this.currentIndex, " "));
        this.wordStart = this.currentIndex;
        this.moveCursor(0);
        var listener = function (e) {
            try {
                if (_this.checkText(e.key)) {
                    if (_this.checkText(e.key, " ") && _this.wordStart !== -1) {
                        _this.completeText(_this.wordStart, _this.currentIndex);
                        _this.wordStart = -1;
                    }
                    if (_this.checkText(e.key, " ") && _this.wordStart === -1) {
                        _this.wordStart = _this.currentIndex;
                        _this.activateText(_this.currentIndex, _this.getNextOfCharacter(_this.currentIndex, " "));
                    }
                    _this.moveCursor(1);
                    _this.verifySpan();
                }
            }
            catch (e) {
                // Error has to be out of index range.
                _this.typing = false;
                document.removeEventListener("keydown", listener);
                _this.endFunc();
            }
            return !(e.keyCode == 32);
        };
        document.addEventListener("keydown", listener);
    };
    return TypingMachine;
}());
//# sourceMappingURL=TypingMachine.js.map