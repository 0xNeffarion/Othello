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
    addGlobalListeners();
    loadClient();
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

const addGlobalListeners = function(){
    for (let i = 0; i < MENU_PANELS.length; i++) {
        var menuId = MENU_PANELS[i][0];
        var element = document.getElementById(menuId);
        if(element != null){
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
        var opp = document.getElementById("oponente").value;
        if(opp == "pc"){
            var cor = parseInt(document.getElementById("cor").value);
            var diff = parseInt(document.getElementById("dificuldade").value);
            currentGameInfo = null;
            cpuStartGame(diff, cor);
        }else{
            var game = await join();
            document.getElementById("novo_jogo_msg").innerText = "A aguardar pelo outro jogador...";
            currentGameInfo = game;
        }
    });
}

const showPopup = function(message, postAction){
    document.getElementById("pop_up_content").innerText = message;
    document.getElementById("pop_up").style.display = "initial";

    var popupBtn = document.getElementById("pop_up_close");
    popupBtn.removeEventListener("click");
    popupBtn.addEventListener("click", function() {
        document.getElementById("pop_up").style.display = "none";
    });
}