const MENU_PANELS = [
    ["menu_1", "instructions"],
    ["menu_2", "configuracao"],
    ["menu_3", "identificacao"],
    ["menu_4", "estado"],
    ["menu_5", "classicacoes"],
    ["menu_6", "mensagens"],
];

window.onload = function() {
    addListeners();
    startGame();
}

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
