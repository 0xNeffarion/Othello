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

const addListeners = function(){
    for (let i = 0; i < MENU_PANELS.length; i++) {
        var menuId = MENU_PANELS[i][0];
        var element = document.getElementById(menuId);
        if(element != null){
            element.addEventListener("click", function(){ menuSwitch(this.id); });
        }
    }
}

const loadClient = async function(){
  //eu coloquei isto porque haverá de ser do btnLogin quando clicado que vem a informação
    /*const btnLogin = document.getElementById("btnLogin");

    btnLogin.addEventListener("click", event =>{})
    btnLogin.addEventListener("click", event =>{
        event.PreventDefault();
    })*/
    await getRanking();
}

const getRanking = async function(){
    const key = 'ranking';
    var req = await sendPOST(key, '{}');
    var tabela = document.getElementById(key);
    var tbody = tabela.getElementsByTagName("tbody")[0];
    var index = 0;
    for(var i of req){
        var pr = new Ranking(i);
        if(pr != null && pr != undefined){
            tbody.appendChild(buildTableRank(index + 1, pr));
        }

        index++;
    }
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

const getRegister = function(){
    const key1 = "register";
    fetch(SERVER_URL + key1,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: '{}'
        }
    ).then(response => response.json())
     .then(json => {
            var arr = Object.values(json);
            //var player = document.getElementById(key1);
            for(var i = 0; i < arr.length; i++){
                var pr = new Register(arr[i]);
                console.log(pr);
            }
      })
    .catch(err => console.log('Falhou', err));
}


const getUsername = function(){
    var username = document.getElementById("username");
    return username.value;
}

const getPassword = function(){
    var password = document.getElementById("password");
    return password.value;
}