import * as fs from "fs";
import * as http from "http";
import * as path from "path";
import { ParsedUrlQuery } from "querystring";
import * as url from "url";

export default class Content {

    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        // Weboldal fejrésze:
        res.write("<head><title>Faktor</title></head>");

        res.write("<body><form style = 'font-family:Courier; font-size:24px'>");

        res.write("<h1>Szám faktoriálisa</h1>");

        // URL paraméterek (aInput, bInput) ellenőrzése,  kiolvasása:
        const query: ParsedUrlQuery = url.parse(req.url as string, true).query;
        // ha aInput paraméter nincs vagy aInput beviteli mező üres, akkor legyen 5, egyébként konvertáljuk számra:
        const x: number = query.xInput === undefined || query.xInput === "" ? 5 : parseFloat(query.xInput as string);

        res.write("<p>x= ");
        res.write(`<input type='number' name='xInput' value=${x} onChange='this.form.submit();'>`);
        res.write("</p>");
        let faktor: number = 1;
        for (let i: number = 2; i < x; i++) {
            faktor = faktor * i;
        }
        res.write(`${x}! = ${faktor}`);

        res.write("</form></body>");
        res.write("</html>");
        res.end();
    }
}
