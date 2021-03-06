"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const url = require("url");
class Content {
    content(req, res) {
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head><title>Faktor</title></head>");
        res.write("<body><form style = 'font-family:Courier; font-size:24px'>");
        res.write("<h1>Szám faktoriálisa</h1>");
        const query = url.parse(req.url, true).query;
        const x = query.xInput === undefined || query.xInput === "" ? 5 : parseFloat(query.xInput);
        res.write("<p>x= ");
        res.write(`<input type='number' name='xInput' value=${x} onChange='this.form.submit();'>`);
        res.write("</p>");
        let faktor = 1;
        for (let i = 2; i < x; i++) {
            faktor = faktor * i;
        }
        res.write(`${x}! = ${faktor}`);
        res.write("</form></body>");
        res.write("</html>");
        res.end();
    }
}
exports.default = Content;
//# sourceMappingURL=content.js.map