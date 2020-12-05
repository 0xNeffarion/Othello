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
    loadCircles();
    loadListeners();
    loadClient();
    updateWinSettings();
}

// Muda o painel correspondente ao menu clicado
const menuSwitch = function(id) {
    var element;

    for (var i = 0; i < MENU_PANELS.length; i++) {
        element = document.getElementById(MENU_PANELS[i][1]);
        if(element !== null){
            element.style.display = "none";
        }
    }

    for (var i = 0; i < MENU_PANELS.length; i++) {
        if(MENU_PANELS[i][0] == id){
            element = document.getElementById(MENU_PANELS[i][1]);
            if(element != null){
                element.style.display = "block";
                break;
            }
        }
    }
}

const loadListeners = function(){
    for (let i = 0; i < MENU_PANELS.length; i++) {
        var menuId = MENU_PANELS[i][0];
        var element = document.getElementById(menuId);
        if(element !== null){
            element.addEventListener("click", function(){ menuSwitch(this.id); });
        }
    }

    var comboOponent = document.getElementById("oponente");
    comboOponent.addEventListener("change", function() {
        var style = "initial";
        if(this.value == "jogador"){
            style = "none";
        }

        document.getElementById("bloco-difficuldade").style.display = style;
        document.getElementById("bloco-cor").style.display = style;
    });

    var btnStart = document.getElementById("novo_jogo");
    btnStart.addEventListener("click", async function(){
        if(utilizador == null){
            window.alert("E preciso fazer login antes de comecar um jogo contra outro jogador!");
            return;
        }

        var opp = document.getElementById("oponente").value;
        if(opp == "pc"){
            var cor = parseInt(document.getElementById("cor").value);
            var diff = parseInt(document.getElementById("dificuldade").value);
            currentGameInfo = null;
            cpuStartGame(diff, cor);
            addMsg("Novo jogo contra o CPU!");
        }else{
            var game = await join();
            document.getElementById("novo_jogo_msg").innerText = "A aguardar pelo outro jogador...";
            currentGameInfo = game;
            toggleLoadOverlay(true);
        }

        menuSwitch("menu_4");
    });

    var popupBtn = document.getElementById("pop_up_close");
    popupBtn.addEventListener("click", function() {
        document.getElementById("pop_up").style.display = "none";
        toggleLoadOverlay(false);
    });
}

const showPopup = function(message){
    document.getElementById("pop_up_content").innerText = message;
    document.getElementById("pop_up").style.display = "initial";
}

const addMsg = function(msg){
    var val = document.getElementById("mensagens_text").value;
    document.getElementById("mensagens_text").value = msg + "\n" + val;
}

const toggleLoadOverlay = function(val){
    if(val === true){
        document.getElementById("load_overlay").style.display = "block";
    }else{
        document.getElementById("load_overlay").style.display = "none";
    }
}