"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const express_browserify_1 = __importDefault(require("express-browserify"));
const path = __importStar(require("path"));
const app = express_1.default();
const { PORT = 3000, } = process.env;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/bundle.js", express_browserify_1.default("./dist/web/entry.js", {}, () => {
    console.log("expressBrowserify callback");
}));
console.log(path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/", express_1.default.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.render("index");
});
app.listen(PORT, () => {
    console.log("server started at http://localhost:" + PORT);
});
exports.default = app;
//# sourceMappingURL=server.js.map