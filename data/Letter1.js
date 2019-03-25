var Letter1Factory = new StateMachine()
    .Enqueue(new State("p", "Day 1"))
    .Enqueue(new State("p", "Hey Honey,"))
    .Enqueue(new State("p",
        "I was finally able to read through all of your letters. Tell Tony that I am proud of his test scores. I am glad that you are all doing alright. I miss being able to go home after a long day and be with you."))
    .Enqueue(new State("p",
        "I am on the train to France. The training was toughm but I endured. We got up early and went to sleep late. We had three meals a day, and half an hour to eat each. Every day for breakfast I had some toast and eggsm just like the ones you made, except with fresher eggs and French bread. It, however, could never match the breakfasts that you made. The other meals were combinations of things like cheese, bread, vegetables, and potatoes."))
    .Enqueue(new State("text",
        "Even after all of this, it is still astonishing to think I was with you but a small while ago. "))
    .Enqueue(new State("blocked",
        "It feels like the training has gone rather fast, but I heard rumors that my company is basically set up to do chores for the higher ups."))
    .Enqueue(new State("br"))
    .Enqueue(new State("p",
        "Anyways, the train is coming to a stop soon, so I have to go. I love you so much, I'll sned more letters when I can."));
var Letter1Audio;
var Letter1Setup = new StateMachine()
    .Enqueue(new State('script',
        {
            audioLocation: 'assets\\audio\\InsideTrain.wav',
            call: function() {
                Letter1Audio = new Audio(this.audioLocation);
                Letter1Audio.volume = 0.55;
                Letter1Audio.play();
                Letter1Audio.loop = true;
            }
        }))
    .Enqueue(new State('script',
        {
			backgroundLocation: 'assets\\graphics\\backgrounds\\OldTrainInside.jpg',
            call: function() {
                document.getElementById('background-pic').src = this.backgroundLocation;
            }
        }));
var Letter1TakeDown = new StateMachine()
    .Enqueue(new State('script',
        {
			call: function() {
				Letter1Audio.loop = false;
                Letter1Audio.stop();
            }
        }));