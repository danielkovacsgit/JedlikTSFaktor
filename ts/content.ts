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
        const a: number = query.aInput === undefined || query.aInput === "" ? 5 : parseFloat(query.aInput as string);
        // ha bInput paraméter nincs vagy bInput beviteli mező üres, akkor legyen 6, egyébként konvertáljuk számra:
        const b: number = query.bInput === undefined || query.bInput === "" ? 6 : parseFloat(query.bInput as string);

        res.write("<p>a= ");
        res.write(`<input type='number' name='aInput' value=${a} onChange='this.form.submit();'>`);
        res.write("</p>");
        res.write("<p>b= ");
        res.write(`<input type='number' name='bInput' value=${b} onChange='this.form.submit();'>`);
        res.write("</p>");
        let terulet: number; // deklaráció
        terulet = a * b; // értékadás
        const kerulet: number = 2 * (a + b); // definíció = deklaráció + értékadás
        res.write(`<p>T=${terulet}</p>`);
        res.write(`<p>K=${kerulet}</p>`);
        res.write("</form></body>");
        res.write("</html>");
        res.end();
    }
}
