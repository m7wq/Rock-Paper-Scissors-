const buttons = document.querySelectorAll(".buttons button");
const userImage = document.querySelector(".user-image");
const opponentImage = document.querySelector(".opponent-image");
let playing = false;

const elements = {
    paper:{
        src: "images/Paper.png",
        defeat: "rock",
        text: "paper"
    },
    rock:{
        src: "images/Rock.png",
        defeat: "scissors",
        text: "rock"
    },
    scissors:{
        src: "images/Scissors.png",
        defeat: "paper",
        text: "scissors"
    }
    
};

buttons.forEach((button) => {
    button.addEventListener('click', () =>{
        
        if(playing)
            return;

        playing = true;

        playClickSound();

        const choose = button.className;

        const element = elements[choose];

        if(element){
            userImage.src = element.src;
        }

        const randomElement = randomChoose();

        setTimeout(() => {
            opponentImage.src = randomElement.src;
        }, 1000);

   

        setTimeout(() => {
            let winner = getWinner(element, randomElement);

            if (winner === "User") {
                playWinSound();
                setTimeout(() => {
                    alert("لقد ربحت 🎉 تهانينا!\nاضغط موافق لكي تجرب مرة أخرى");
                    location.reload();
                }, 500); 
            } else if (winner === "Tie") {
                playLoseSound();
                setTimeout(() => {
                    alert("أوه! كلاكما اخترتما نفس العنصر، إنها تعادل 🤝\nاضغط موافق للعب مرة أخرى");
                    location.reload();
                }, 500);
            } else {
                playLoseSound();
                setTimeout(() => {
                    alert("للأسف لقد خسرت 😢\nحاول مرة أخرى بالضغط على موافق");
                    location.reload();
                }, 500);
            }
        }, 2000);

        
        
        
    });
});

function getWinner(userInput, opponentInput){
    if(userInput.defeat === opponentInput.text){
        return "User";
    }else if(userInput.text === opponentInput.text){
        return "Tie";
    }else {
        return "Computer";
    }
}

function playClickSound(){
    let sound = new Audio("sounds/click.mp3");
    sound.play();
}

function playWinSound(){
    let sound = new Audio("sounds/win.mp3");
    sound.play();
}

function playLoseSound(){
    let sound = new Audio("sounds/lose.mp3");
    sound.play();
}



function randomChoose() {

    const keys = Object.keys(elements);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    return elements[randomKey];
        
        
}