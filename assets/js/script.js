// პირველადი მონაცემები

function Team (id, name, games, goalScored, missedGoal, points){
    this.id = id;
    this.name = name;
    this.games = games;
    this.goalScored = goalScored;
    this.missedGoal = missedGoal; 
    this.goalDifference = function(){return this.goalScored - this.missedGoal};
    this.points = points;    
}

function goalDifference(team) {
    return team.goalScored - team.missedGoal;
}

let arrTeam = JSON.parse(localStorage.getItem("arrTeam"));

if(arrTeam === null) {
    arrTeam = [
        new Team(1, 'Real Madrid', 0, 0, 0, 0),
        new Team(2, 'Barcelona', 0, 0, 0, 0),
        new Team(3, 'Real Betis', 0, 0, 0, 0),
        new Team(4, 'Sevilia', 0, 0, 0, 0),
        new Team(5, 'Real Sosiedad', 0, 0, 0, 0),
        new Team(6, 'Valencia', 0, 0, 0, 0)
    ];
    localStorage.setItem('arrTeam', JSON.stringify(arrTeam));   
}


// let notes = JSON.parse(localStorage.getItem("notes")) ?? [];
// გამოთვლები

const tBadi = document.getElementById('tbody');
const selectTeam1 = document.getElementById('team1');
const selectTeam2 = document.getElementById('team2');
const buttonSend = document.getElementById('send');
const teamGoalScored1 = document.getElementById('goalScored-1');
const teamGoalScored2 = document.getElementById('goalScored-2');

addTeam();
function addTeam (){
    tBadi.innerHTML = ""; //tBadi არსებული მონაცემები გავანულეთ
    for(let i=0; i<arrTeam.length; i++){
        let newTeam = document.createElement('tr');
        let newNumber = document.createElement('td')
        let newName = document.createElement('td'); 
        let newGames = document.createElement('td'); 
        let newGoalDifference = document.createElement('td'); 
        let newPoints = document.createElement('td'); 
        tBadi.appendChild(newTeam);
        newTeam.appendChild(newNumber);
        newTeam.appendChild(newName);
        newTeam.appendChild(newGames);
        newTeam.appendChild(newGoalDifference);
        newTeam.appendChild(newPoints);
        newNumber.textContent= i + 1;
        newName.textContent = arrTeam[i].name;
        newGames.textContent = + arrTeam[i].games;
        newGoalDifference.textContent = goalDifference(arrTeam[i]); //გამოვიძახეთ ფუნქია, თავიდან რომ გამოთვალოს
        newPoints.textContent = + arrTeam[i].points;           
    }    
}

optionsTeam ()
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
    if (teamGoalScored1.value!=='' && teamGoalScored2.value!=='' && selectTeam1.value !== selectTeam2.value){ 
        let i = +selectTeam1.value;          
        let j = +selectTeam2.value;
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