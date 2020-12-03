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
    document.getElementById("btnLogin").addEventListener("click", async function() { await doRegister(); });
    document.getElementById("novo_jogo").addEventListener("click", async function() { await join(); });
    document.getElementById("btnLogout").addEventListener("click", async function() { await doLogout(); });


    await setRanking();
}

const setRanking = async function(){
    const key = 'ranking';
    var req = await sendPOST(key, '{}');
    var resultado = req[0];
    var tabela = document.getElementById(key);
    var tbody = tabela.getElementsByTagName("tbody")[0];
    var index = 0;
    for(var i = 0; i < resultado.length; i++){
        var pr = new Ranking(resultado[i]);
        if(pr != null && pr != undefined){
            tbody.appendChild(buildRankTable(index + 1, pr));
        }

        index++;
    }
}

const buildRankTable = function(index, ranking){
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

const doRegister = async function(){
    var nick = getUsername();
    var password = getPassword();
    var body = {
        nick: nick,
        pass: password
    }

    var json = JSON.stringify(body);
    var req = await sendPOST("register", json);
    if(req == null){
        document.getElementById("login_result").innerText = "Erro a fazer login";
        return;
    }else{
        document.getElementById("nome_util").innerText = nick;
        document.getElementById("authenticated").style.display = "block";
        document.getElementById("normal_login").style.display = "none";
        utilizador = new User(nick, password);
    }

}

const doLogout = async function(){
    utilizador = null;
    document.getElementById("nome_util").innerText = "";
    document.getElementById("authenticated").style.display = "none";
    document.getElementById("normal_login").style.display = "block";
    document.getElementById("login_result").innerText = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

const join = async function(){
    var arr = {
        group: GRUPO,
        nick: utilizador.getNickname(),
        pass: utilizador.getPassword(),
    };

    var res = await sendPOST("join", JSON.stringify(arr));
    if(res == null){
        console.error("Erro a juntar a jogo");
        return;
    }

    var id = res[0];
    var color = res[1];
    var event = setupEvent("update", "game=" + id + "&nick=" + utilizador.getNickname(), function(e) { updateGameEvent(e); });

    currentGame = new Game(id, color, event);
}

const getUsername = function(){
    var username = document.getElementById("username");
    return username.value;
}

const getPassword = function(){
    var password = document.getElementById("password");
    return password.value;
}
