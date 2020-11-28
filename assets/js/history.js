let arrTournaments = JSON.parse(localStorage.getItem("arrTournaments"));

if(arrTournaments === null){
    arrTournaments = [];
}

function goalDifference(team) { 
    return team.goalScored - team.missedGoal;
}

function theadAdd(table){
    const thead = document.createElement('thead');
    const trTeam = document.createElement('tr');
    const thNumber = document.createElement('th');
    const thLogo = document.createElement('th');
    const thTeam = document.createElement('th');
    const thGames = document.createElement('th');
    const thGoalDiffer = document.createElement('th');
    const thPoints = document.createElement('th');
    table.appendChild(thead);
    thead.appendChild(trTeam);
    trTeam.appendChild(thNumber);
    trTeam.appendChild(thLogo);
    trTeam.appendChild(thTeam);
    trTeam.appendChild(thGames);
    trTeam.appendChild(thGoalDiffer);
    trTeam.appendChild(thPoints);  
    thNumber.textContent = '#';  
    thLogo.textContent = 'Logo';
    thTeam.textContent = 'Team';
    thGames.textContent = 'Games';
    thGoalDiffer.textContent = 'Goal difference';
    thPoints.textContent = 'Points';  
    thNumber.classList.add('number');
    thLogo.classList.add('logo');
    thTeam.classList.add('tim');
    thGames.classList.add('header');
    thGoalDiffer.classList.add('header');
    thPoints.classList.add('header');   
}

for(let i=0; i<arrTournaments.length; i++){
    let nameTournamnt = document.createElement('h2'); 
    document.body.appendChild(nameTournamnt);
    nameTournamnt.textContent = arrTournaments[i].name;
    addTeam(arrTournaments[i].arr);       
}

function addTeam (teams){
    let table = document.createElement('table');
    table.classList.add('table');
    theadAdd(table)
    let tBadi = document.createElement('tbody');    
    for(let i=0; i<teams.length; i++){
        let newTeam = document.createElement('tr');
        let newNumber = document.createElement('td')
        let newImage = document.createElement('td');
        let newName = document.createElement('td'); 
        let newGames = document.createElement('td'); 
        let newGoalDifference = document.createElement('td'); 
        let newPoints = document.createElement('td');
        let image = document.createElement('img'); 
        table.appendChild(tBadi);
        tBadi.appendChild(newTeam);
        newTeam.appendChild(newNumber);
        newTeam.appendChild(newImage);        
        newTeam.appendChild(newName);
        newTeam.appendChild(newGames);
        newTeam.appendChild(newGoalDifference);
        newTeam.appendChild(newPoints);
        newImage.appendChild(image);
        image.setAttribute('src', teams[i].image);        
        newNumber.textContent= i + 1;        
        newName.textContent = teams[i].name;
        newGames.textContent = + teams[i].games;
        newGoalDifference.textContent = goalDifference(teams[i]); //გამოვიძახეთ ფუნქია, თავიდან რომ გამოთვალოს
        newPoints.textContent = + teams[i].points;           
    }    
    document.body.appendChild(table);
}