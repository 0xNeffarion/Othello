const stream = require('stream');

module.exports.extractBody = function (req) {
    return new Promise((resolve, _) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => resolve(body));
    });
};

module.exports.isJsonValid = function (json) {
    try {
        JSON.parse(json);
        return true;
    } catch {
        return false;
    }
}
