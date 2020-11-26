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

//http://twserver.alunos.dcc.fc.up.pt:8008/

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", event =>{})
btnLogin.addEventListener("click", event =>{
    event.PreventDefault();
})

const username = document.getElementById("username");
const valorUser = username.value;

const url = `http://twserver.alunos.dcc.fc.up.pt:8008/`;

fetch(url)
  .then(response =>{
  return response.json();
  })
  .then(data =>{
    atribuirPass(data);
  })

function atribuirPass(data){
  const password = document.getElementById("password");
  const valorPass = password.value;
  }
