const sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const setSetting = function(key, val){
    localStorage.setItem(key, val);
}

const getSetting = function(key){
    var val = localStorage.getItem(key);
    return (val !== undefined && val !== null) ? val : "0";
}

const incrementSetting = function(key){
    var value = parseInt(getSetting(key));
    setSetting(key, value + 1);
}
