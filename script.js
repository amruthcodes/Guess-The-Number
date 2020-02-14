let btn = document.getElementById('circle');
const instruction = document.getElementById('instruction');
const userInput = document.getElementsByTagName('form')[0];


 
const stage = instruction.firstElementChild;
const status = instruction.lastElementChild;

//Set the level at the start of the game
let num,level,counter,inc;

//Get the URL and parameters;
let url = new URL(location);
let search_params = new URLSearchParams(url.search);

//Set Level and counter
if (search_params.get('level')) {
    level = search_params.get('level');
    counter = 20 + parseInt(search_params.get('inc'));
} else {
    level = 1;
    counter = 60;
} 

inc = counter;

stage.innerHTML = `LEVEL: ${level}`;
let levelBound = level * 100;
status.innerHTML = `GUESS THE NUMBER BETWEEN 1-${levelBound}`

//Get random number
const randomNum = getRandomNum();


// Load the game
loadTheGame();



console.log(randomNum);







//Define loadTheGame
function loadTheGame(){

    //Start the game
    btn.addEventListener('click', () => {

        //Display the instruction and user input block
        stage.style.display = '';
        status.style.display = '';
        userInput.style.display = '';
        
        //Remove p-tag from btn
        btn.removeChild(btn.firstElementChild);

        //Remove event Listener
        btn.removeEventListener('click',onclick);

        //Remove hover effect from btn
        btn.style.pointerEvents = 'none';

        //Add count down 
        displayTimer();



    });

    

    userInput.addEventListener('submit', (e) => {        

        e.preventDefault();

        num = parseInt(userInput.lastElementChild.value);
        userInput.reset();
        
        let timer = parseInt(btn.lastElementChild.innerHTML);
        
        if(timer === 0)
        {
           timeLost();

        } else {

            if (num >= 1 && num <= levelBound) {
            
                checkForNum(num);
                
            } else {
    
                const p = document.createElement('p');
                p.innerHTML = 'INVALID';
                userInput.replaceChild(p, userInput.firstElementChild);
    
                if (userInput.getElementsByTagName('img')[0]){
                    userInput.removeChild(userInput.lastElementChild.previousElementSibling);                
                }
    
            }        
        }

       

    })
    
}




//Counter
function displayTimer() {

    btn.firstElementChild.innerHTML = `${counter}`
    btn.firstElementChild.style.display = '';


    //Run every second
    var interval = setInterval(() =>{
        
        counter-- ;

        if(counter >= 0){
            btn.firstElementChild.innerHTML = `${counter}`
        }else{
            clearInterval(interval);
        }
        if(counter===0){
            timeLost();
        }        
        
    }, 1000);

    
}




function checkForNum(num) {
    
    const img = document.createElement('img');
    img.setAttribute('alt','correct')
    img.setAttribute('src','');     
    img.style.height = '40px';
    img.style.marginBottom = '20px';

    const p = document.createElement('p');

   
        
    if(num === randomNum){

        
        counter = -1;

        btn.firstElementChild.innerHTML = 'CONGRATULATIONS' ;
        btn.firstElementChild.style.fontSize = '20px';

        p.innerHTML = 'YOU WIN';
        
        if (userInput.getElementsByTagName('img')[0]) {

            
            userInput.replaceChild(p, userInput.firstElementChild);
        

            img.setAttribute('src','img/checked.svg'); 
            img.style.marginBottom = '0px';

            
            p.insertAdjacentElement('beforebegin', img);

            userInput.removeChild(userInput.lastElementChild);
            userInput.removeChild(userInput.lastElementChild);

            
        } else {

            userInput.replaceChild(p, userInput.firstElementChild);
        

            img.setAttribute('src','img/checked.svg'); 
            img.style.marginBottom = '0px';

            
            p.insertAdjacentElement('beforebegin', img);

            userInput.removeChild(userInput.lastElementChild);
            
            
        }
        
        //nextLevel
        setTimeout(()=>{

            let old_url = location.href;
            let new_url = old_url.substring(0, old_url.indexOf('?'));
            level++;
                        
            window.location.href = `${new_url}?level=${level}&inc=${inc}`;

        },3000)
        
    

    } else if(num > randomNum){

            if (userInput.getElementsByTagName('img')[0]) {
            //change text when there is image
            p.innerHTML = 'GO LOWER';
            userInput.replaceChild(p, userInput.firstElementChild);

        } else {

            p.innerHTML = 'GO LOWER';
            userInput.replaceChild(p, userInput.firstElementChild);

            img.setAttribute('src','img/cancel.svg');     

            p.insertAdjacentElement('afterend', img);
            
        }

    } else {
        if (userInput.getElementsByTagName('img')[0]) {
            //change text when there is image
            p.innerHTML = 'GO HIGHER';
            userInput.replaceChild(p, userInput.firstElementChild);

        } else {

            p.innerHTML = 'GO HIGHER';
            userInput.replaceChild(p, userInput.firstElementChild);

            img.setAttribute('src','img/cancel.svg');     

            p.insertAdjacentElement('afterend', img);
            
        }

    }
        
    
        
}



function getRandomNum() {
    return Math.floor(Math.random() * levelBound) + 1;
}


function timeLost(){
    const p = document.createElement('p');
    p.innerHTML = 'YOU LOST ON TIME';
    userInput.replaceChild(p, userInput.firstElementChild);
    userInput.removeChild(userInput.lastElementChild);
    setTimeout(()=>{
        window.location.href = location.href.substring(0,location.href.indexOf('?'));
    },2000)
}