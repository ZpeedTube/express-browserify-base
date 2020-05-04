import * as bodyParser from "body-parser";
import express from "express";
import { Request, Response } from "express";
import expressBrowserify from "express-browserify";
import * as path from "path";

const app = express();

const {
  PORT = 3000,
} = process.env;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/bundle.js", expressBrowserify("./dist/web/entry.js", {}, () => {
    console.log("expressBrowserify callback");
}));

console.log( path.join( __dirname, "views" ));
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.use("/",  express.static( path.join( __dirname, "public" )) );

app.get("/", (req: Request, res: Response) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log("server started at http://localhost:" + PORT);
});

export default app;
