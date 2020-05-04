import * as shell from "shelljs";
// import {MinifyDir,skipFolders} from "./minifyDir";
// import { join } from "path";
console.log(Date().toString()); // Just to see when copy was done

// Copy all the view templates
shell.cp( "-R", "src/views", "dist/" );
shell.cp( "-R", "src/public", "dist/" );



// Minify js files
// const jspath:string = join(__dirname, "../dist/public/js/");
// skipFolders.push("libs");
// MinifyDir(jspath);