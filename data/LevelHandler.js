var LevelEngineClearBody = function () {
    document.getElementById("bod").innerHTML = "";
}

var Texts;
var CurrentTextIndex = 0;
var TypingMachine;
var Typing = false;

function KeyPush(e) {
    if (e.key.toLowerCase() === Texts[CurrentTextIndex].innerText.toLowerCase() ||
        Texts[CurrentTextIndex].innerText.toLowerCase() === '') {
        try {
            KeyPushSuccess.call();
        } catch (e) {
            document.removeEventListener('keydown', KeyPush);
            Typing = false;
        }
    }
}

var KeyPushSuccess = {
    error: false,
    errorSpans: [],
    call: function () {
        if (CurrentTextIndex >= Texts.length) {
            throw "Out of range";
        }
        try {
            if (!Texts[CurrentTextIndex + 5].classList.contains('replace') ||
                !Texts[CurrentTextIndex + 5].classList.contains('img')) {
                Texts[CurrentTextIndex + 5].classList.remove('hidden');
            }
        } catch (e) { }

        if (Texts[CurrentTextIndex].classList.contains('error')) {
            Texts[CurrentTextIndex].classList.add('shaking');
        }
        Texts[CurrentTextIndex].classList.remove('active');
        Texts[CurrentTextIndex].classList.add('completed');

        CurrentTextIndex++;
        this.error = Texts[CurrentTextIndex].classList.contains('error');
        if (this.error === true) {
            this.errorSpans.push(Texts[CurrentTextIndex]);
        }
        else if (this.errorSpans.length !== 0) {
            for (let i = 0; i < this.errorSpans.length; i++) {
                this.errorSpans[i].classList.add('hidden');
                this.errorSpans[i].classList.remove('shaking');
            }
            let nextTextIndex = CurrentTextIndex;
            while (Texts[nextTextIndex].classList.contains('replace')) {
                Texts[nextTextIndex].classList.remove('hidden');
                nextTextIndex++;
            }
            this.errorSpans = [];
            while (!confirm("I can't say that..."));
        }
        if (Texts[CurrentTextIndex].classList.contains('img')) {
            Texts[CurrentTextIndex].classList.remove('hidden');
            Texts[CurrentTextIndex + 5].classList.remove('hidden');
            CurrentTextIndex++;
        }
        Texts[CurrentTextIndex].classList.remove('ghost');
        Texts[CurrentTextIndex].classList.add('active');
    }
};

function StartTyping() {
    TypingMachine = new StateMachine()
        .Enqueue(new State('script',
            {
                call: function () {
                    Texts = document.getElementsByClassName('text');
                    for (let i = 0; i < Texts.length; i++) {
                        const currentText = Texts[i];
                        currentText.classList.add('ghost');
                        currentText.classList.add('hidden');
                    }
                }
            }))
        .Enqueue(new State('script',
            {
                call: function () {
                    document.addEventListener('keydown', KeyPush);
                }
            }))
        .Enqueue(new State('script',
            {
                call: function () {

                    for (let i = 1; i < 5; i++) {
                        Texts[i].classList.remove('hidden');
                    }
                    Texts[0].classList.remove('hidden');
                    Texts[0].classList.remove('ghost');
                    Texts[0].classList.add('active');
                }
            }))
        .Enqueue(new State('script',
            {
                call: function () {
                    Typing = true;
                }
            }))
        .Start();
}

var LevelEngine = new StateMachine()
    .Enqueue(new State("script",
        {
            call: function () {
                Letter1Factory.Start();
                Letter1Setup.Start();
                StartTyping();
                Sleep(1000);
                while (Typing);
                Letter1TakeDown.Start();
            }
        }));
