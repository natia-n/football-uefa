// პირველადი მონაცემები

const tBadi = document.getElementById('tbody');
const selectTeam1 = document.getElementById('team1');
const selectTeam2 = document.getElementById('team2');
const buttonSend = document.getElementById('send');
const teamGoalScored1 = document.getElementById('goalScored-1');
const teamGoalScored2 = document.getElementById('goalScored-2');
const buttonNawTournament = document.getElementById('nawTournament');
const divStart = document.getElementById('start');
const buttonStart = document.getElementById('buttonStart');
const ulTeams = document.getElementById('teams');
const saveTournament = document.querySelector(".saveTurnament");
const nameTournamnt = document.getElementById('nameTournament');
const saveAddTournament = document.getElementById('saveAddTournament');
let teamAdd = document.getElementById('teamAdd');
let tournamentName = localStorage.getItem("tour-name");

function Team (id, image, name, games = 0, goalScored = 0, missedGoal = 0, points = 0){
    this.id = id;
    this.image = image;
    this.name = name;
    this.games = games;
    this.goalScored = goalScored;
    this.missedGoal = missedGoal; 
    this.goalDifference = function(){return this.goalScored - this.missedGoal};
    this.points = points;
}

//ფუნქცია არ წაიღო ლოცალ სტორიჯმა და მასივის ობიექტიდან ცალკე გამოვიტანე
function goalDifference(team) { 
    return team.goalScored - team.missedGoal;
}

let arrTeam = JSON.parse(localStorage.getItem("arrTeam"));

if(arrTeam === null) {
    arrTeam = [];  
} else {
    saveTournament.classList.remove("hide");
    buttonNawTournament.classList.add("hide");
    addTeam();
    optionsTeam();
}

// გამოთვლები

function addTeam (){
    tBadi.innerHTML = ""; //tBadi არსებული მონაცემები გავანულეთ
    for(let i=0; i<arrTeam.length; i++){
        let newTeam = document.createElement('tr');
        let newNumber = document.createElement('td')
        let newImage = document.createElement('td');
        let newName = document.createElement('td'); 
        let newGames = document.createElement('td'); 
        let newGoalDifference = document.createElement('td'); 
        let newPoints = document.createElement('td');
        let image = document.createElement('img'); 
        tBadi.appendChild(newTeam);
        newTeam.appendChild(newNumber);
        newTeam.appendChild(newImage);        
        newTeam.appendChild(newName);
        newTeam.appendChild(newGames);
        newTeam.appendChild(newGoalDifference);
        newTeam.appendChild(newPoints);
        newImage.appendChild(image);
        image.setAttribute('src', arrTeam[i].image);        
        newNumber.textContent= i + 1;        
        newName.textContent = arrTeam[i].name;
        newGames.textContent = + arrTeam[i].games;
        newGoalDifference.textContent = goalDifference(arrTeam[i]); //გამოვიძახეთ ფუნქია, თავიდან რომ გამოთვალოს
        newPoints.textContent = + arrTeam[i].points;           
    }    
}

function optionsTeam (){
    for(let i=0; i<arrTeam.length; i++){
        const optionsTeam1 = document.createElement('option'); 
        const optionsTeam2 = document.createElement('option');      
        selectTeam1.appendChild(optionsTeam1);
        selectTeam2.appendChild(optionsTeam2);
        optionsTeam1.textContent = arrTeam[i].name;
        optionsTeam2.textContent = arrTeam[i].name;  
        optionsTeam1.value = arrTeam[i].id;
        optionsTeam2.value = arrTeam[i].id;
    }    
}

buttonSend.addEventListener('click', () => {
    gamesReport()
});

function gamesReport() {
    if (teamGoalScored1.value >= 0  && teamGoalScored2.value >= 0 && selectTeam1.value !== selectTeam2.value){ 
        let i = +selectTeam1.value;          
        let j = +selectTeam2.value;
        teamGoalScored1.classList.add("hidden");
        teamGoalScored2.classList.add("hidden");
        buttonSend.classList.add("hidden");
        selectTeam1.value = "";
        selectTeam2.value = "";        
        game(i, j, +teamGoalScored1.value, +teamGoalScored2.value);       
    }
} 

function game(team1Id, team2Id, team1Goal, team2Goal) {
    let firstTeam = arrTeam.find(team => team.id === team1Id); //გადაყვება სიმრავლეს და პირველივე ნაპოვნ team დააბრუნებს
    let secondTeam = arrTeam.find(team => team.id === team2Id);
    firstTeam.goalScored += team1Goal;   
    secondTeam.goalScored += team2Goal;  
    firstTeam.missedGoal += team2Goal;   
    secondTeam.missedGoal += team1Goal; 
    firstTeam.games++;  
    secondTeam.games++;    
    if(team1Goal > team2Goal){
        firstTeam.points += 3;
    } else {
        if(team1Goal < team2Goal){
            secondTeam.points += 3;
        }else{
            firstTeam.points += 1;
            secondTeam.points += 1;
        }
    }
    teamGoalScored1.value = '';
    teamGoalScored2.value = '';
    insertionSort(arrTeam); 
    localStorage.setItem('arrTeam', JSON.stringify(arrTeam));   
    addTeam();
}

function insertionSort(arrTeam){
    arrTeam.sort( function(a, b){
        if(a.points > b.points){
            return -1;
        }else{
            if(b.points > a.points) {
                return 1;
            } else {
                if (goalDifference(a)>goalDifference(b)){
                    return -1;
                }else{
                    if(goalDifference(a)<goalDifference(b)){
                        return 1;
                    }else{
                        if(a.goalScored>b.goalScored){
                            return -1;
                        }else{
                            return 1;
                        }
                    }                   
                }                
            }
        }
    })
}

selectTeam1.addEventListener("change", () => {
    selectTeam1.classList.remove("disabled");
    teamGoalScored1.classList.remove("hidden");
    if(selectTeam2.value !== ""){
        buttonSend.classList.remove("hidden");
    }
});

selectTeam2.addEventListener("change", () => {
    selectTeam2.classList.remove("disabled");
    teamGoalScored2.classList.remove("hidden");
    if(selectTeam1.value !== ""){
        buttonSend.classList.remove("hidden");
    }
});

//


buttonNawTournament.addEventListener('click', teamsAdd);

function teamsAdd(){
    buttonNawTournament.classList.add('hide');
    divStart.classList.remove('hide');
    nameTournamnt.classList.remove('hide');

    createInput();
}

function createInput(){
    let li = document.createElement('li');
    let input = document.createElement('input');
    ulTeams.appendChild(li);
    li.appendChild(input);    
}

teamAdd.addEventListener('click', createInput);   

buttonStart.addEventListener('click', startTeam);

function startTeam(){
    tournamentName = nameTournamnt.value.trim();
    if(tournamentName === ''){
        alert('please add tournament name');
        return;
    }
    localStorage.setItem('tour-name', tournamentName);
    const inputs = ulTeams.querySelectorAll("input");
    inputs.forEach((el, index) =>{
        let value = el.value.trim();
        if(value){
            arrTeam.push(new Team(index + 1, "./assets/images/real-madrid.png", value));
        }
    });
    if(arrTeam.length<4){
        alert('please enter at least 4 teams');
        arrTeam = [];
        return;
    }
    ulTeams.innerHTML = "";
    nameTournamnt.value = "";
    localStorage.setItem('arrTeam', JSON.stringify(arrTeam));
    addTeam();
    optionsTeam();
    saveTournament.classList.remove('hide');
    divStart.classList.add('hide');
}

// meore tabi

function Tournaments (name, arr){
    this.name = name;
    this.arr = arr;    
}

let arrTournaments = JSON.parse(localStorage.getItem("arrTournaments"));
if(arrTournaments === null){
    arrTournaments = [];
}

localStorage.setItem('arrTournaments', JSON.stringify(arrTournaments));  
saveAddTournament.addEventListener('click', tournamentSave);

function tournamentSave(){
    arrTournaments.push(new Tournaments(tournamentName, arrTeam));
    localStorage.setItem('arrTournaments', JSON.stringify(arrTournaments)); 
    localStorage.removeItem("arrTeam");
    arrTeam = [];
    saveTournament.classList.add("hide");
    buttonNawTournament.classList.remove("hide");
}