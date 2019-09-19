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
        const a = query.aInput === undefined || query.aInput === "" ? 5 : parseFloat(query.aInput);
        const b = query.bInput === undefined || query.bInput === "" ? 6 : parseFloat(query.bInput);
        res.write("<p>a= ");
        res.write(`<input type='number' name='aInput' value=${a} onChange='this.form.submit();'>`);
        res.write("</p>");
        res.write("<p>b= ");
        res.write(`<input type='number' name='bInput' value=${b} onChange='this.form.submit();'>`);
        res.write("</p>");
        let terulet;
        terulet = a * b;
        const kerulet = 2 * (a + b);
        res.write(`<p>T=${terulet}</p>`);
        res.write(`<p>K=${kerulet}</p>`);
        res.write("</form></body>");
        res.write("</html>");
        res.end();
    }
}
exports.default = Content;
//# sourceMappingURL=content.js.map