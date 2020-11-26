// Paineis do menu do lado direito e o div correspondente com o conteudo
const MENU_PANELS = [
    ["menu_1", "instructions"],
    ["menu_2", "configuracao"],
    ["menu_3", "identificacao"],
    ["menu_4", "estado"],
    ["menu_5", "classicacoes"],
    ["menu_6", "mensagens"],
];

// Inicializar o menu e o jogo apos a pagina carregar
window.onload = function() {
    addListeners();
    loadClient();
    startGame();
}

// Muda o painel correspondente ao menu clicado
const menuSwitch = function(id) {
    for (let i = 0; i < MENU_PANELS.length; i++) {
        var element = document.getElementById(MENU_PANELS[i][1]);
        if(element != null){
            element.style.display = "none";
        }
    }

    for (let i = 0; i < MENU_PANELS.length; i++) {
        if(MENU_PANELS[i][0] == id){
            var element = document.getElementById(MENU_PANELS[i][1]);
            if(element != null){
                element.style.display = "block";
                break;
            }
        }
    }
}

// Cria click listeners para cada menu
const addListeners = function(){
    for (let i = 0; i < MENU_PANELS.length; i++) {
        var menuId = MENU_PANELS[i][0];
        var element = document.getElementById(menuId);
        if(element != null){
            element.addEventListener("click", function(){ menuSwitch(this.id); });
        }
    }
}

class Ranking {
    constructor(nick, victories, games){
        this.nick = nick;
        this.victories = victories;
        this.games = games;
    }

    getNick(){
        return this.nick;
    }

    getVictories(){
        return this.victories;
    }

    getGames(){
        return this.games;
    }

    static from(json){
        return Object.assign(new Ranking(), json);
    }

}

const SERVER_URL = "http://twserver.alunos.dcc.fc.up.pt:8008/";
const loadClient = function(){
    /**btnLogin.addEventListener("click", e => {

    });*/
    getRanking();
}

const getRanking = function(){
    const key = "ranking";
    fetch(SERVER_URL + key, 
        {
            method: 'POST',
            headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: '{}'
        }
    ).then(response => { 
        response.json().then(json => {
            var arr = Object.values(json)[0];
            var tabela = document.getElementById(key);
            var tbody = tabela.getElementsByTagName("tbody")[0];
            for(var i in arr){
                var pr = Ranking.from(arr[i]);
                console.log(pr);
                if(pr != null && pr != undefined){
                    tbody.appendChild(buildTableRank(parseInt(i) + 1, pr));
                }
            }
        }) 
    });
}

const buildTableRank = function(index, ranking){
    var row = document.createElement("tr");
    var rowIndex = document.createElement("th");
    var val_nick = document.createElement("td");
    var val_games = document.createElement("td");
    var val_vict = document.createElement("td");

    rowIndex.innerText = index;
    val_nick.innerText = ranking.getNick();
    val_games.innerText = ranking.getGames();
    val_vict.innerText = ranking.getVictories();

    row.appendChild(rowIndex);
    row.appendChild(val_nick);
    row.appendChild(val_vict);
    row.appendChild(val_games);

    return row;
}

const getUsername = function(){
    var username = document.getElementById("username");
    var valorUser = username.value;
    return valorUser;
}

const getPassword = function(){
    var password = document.getElementById("password");
    var valorPass = password.value;
    return valorPass;
}