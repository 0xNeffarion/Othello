const stream = require('stream');

module.exports.extractBody = function(req) {
    return new Promise((resolve, _) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => resolve(body));
    });
};

let users = [
    [10, 'Arya', 9],
    [3, 'Sansa', 1],
    [6, 'Cersei', 2],
    [10, 'JSnow', 5],
    [20, 'Daenerys', 7],
    [1, 'Ned', 0],
    [20, 'Tyrion', 7],
    [10, 'RedLady', 5],
    [567, 'WhiteWalker', 500],
    [1345, 'Khal', 100]
];

var json = users.map(function(value, key){
  return{
    "games" : value[0],
    "nick" : value[1],
    "victories" : value[2]
  }
});

//console.log(json);

const fs = require('fs');
//cria ficheiro com o array
fs.writeFile("ranking.json", JSON.stringify(json), function (err,data){
       if(err) {
         throw err;
       } /*else {
         console.log('fim');
       }*/
});
//lê o ficheiro com o array
module.exports.tabela = function(){
    fs.readFile('ranking.json','utf8',function(err,data) {
        if(err) {
            console.log(err);
        } /*else {
          console.log('li');
        }*/
  });
}
