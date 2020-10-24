const menus_panels = [
    ["menu_1", "instructions"],
    ["menu_2", "configuracao"],
    ["menu_3", "identificacao"],
    ["menu_4", "estado"],
    ["menu_5", "classicacoes"],
    ["menu_6", "mensagens"],
];

window.onload = function() {
    addListeners();
}

const menuSwitch = function(id) {
    for (let i = 0; i < menus_panels.length; i++) {
        var element = document.getElementById(menus_panels[i][1]);
        if(element != null){
            element.style.display = "none";
        }
    }

    for (let i = 0; i < menus_panels.length; i++) {
        if(menus_panels[i][0] == id){
            var element = document.getElementById(menus_panels[i][1]);
            if(element != null){
                element.style.display = "block";
                break;
            }
        }
    }
}

const addListeners = function(){
    for (let i = 0; i < menus_panels.length; i++) {
        var menuId = menus_panels[i][0];
        var element = document.getElementById(menuId);
        if(element != null){
            element.addEventListener("click", function(){ menuSwitch(this.id); });
        }
    }
}



