
const container=document.querySelector(".container");
let cards=[];
let firstCard,secondCard;
lockBoard= false;
let score=0;


    
fetch("./api/fruits.json")
.then((response)=>{return response.json()})
.then((data)=>{
     cards=[...data,...data];
     shuffleCards(); // Assign the returned function to the global variable
    
     generatecards();
})

function shuffleCards()
{
    
    

    let temp;
    let currentIndex=cards.length;
    
    let randomIndex;
    
while(currentIndex!==0){
    currentIndex-=1;
    randomIndex=Math.floor(Math.random()*currentIndex);
    temp=cards[currentIndex];
    cards[currentIndex]=cards[randomIndex];
    cards[randomIndex]=temp;
}



console.log(cards);

}





function generatecards(){

    cards.forEach(card => {
        const cardElement=document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name",card.name);
        // cardElement.textContent=card.name;
        cardElement.innerHTML=`
        <div class="front">
        <img class="param" src="${card.image}">
        </div>
        <div class="back"></div>       
        `
        container.append(cardElement);
        cardElement.addEventListener("click",flipCard)

    });
    

}

function flipCard(){
    // if(lockBoard) return;
    if(this===firstCard) return;
    this.classList.add("flipped")
    
    if(!firstCard){
        firstCard=this;
        return;
        
    }
    secondCard=this;
    lockBoard=true;
    checkForMatch();

}

function checkForMatch(){
    const isMatch=firstCard.dataset.name===secondCard.dataset.name;
    isMatch? disableCards() : unflipCards();
}

function disableCards(){
    
    score++;
    document.querySelector(".scrore").textContent=score;

    resetboard();
}

function unflipCards(){
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetboard();
      }, 1000);
    }
function resetboard(){
    firstCard=null;
    secondCard=null;
    // lockBoard=false;
}

function restart(){
    resetboard();
    shuffleCards();
    score=0;
    document.querySelector(".scrore").textContent=score;
    container.innerHTML="";
    generatecards();
}

