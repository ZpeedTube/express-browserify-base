import * as shell from "shelljs";
import fs from "fs";
import { join } from "path";

let skipFolders:string[] = [""];

/**
 * Minifys (replaces) every js file in directory
 * @param dir fullpath ex: join(__dirname,relativepath)
 * @param deep how deep in directory from relativepath
 */
function MinifyDir(dir:string){
    var files = fs.readdirSync(dir, {withFileTypes:true}).map(Dirent => Dirent.name); 
    for(var file of files){
        var fileExtension = file.split(".");
        if (fileExtension.length > 1) {   
            // console.log("file "+file);        
            for(var ext of fileExtension){
                if (ext === "js"){ 
                    var filepath = join(dir,file);                 
                    // console.log("minify "+filepath);   
                    shell.exec("uglifyjs "+filepath+" --compress --mangle --output "+filepath+"",
                    (error,stdout,stderr)=>{
                        if (error){
                            console.log(error," errors in "+filepath);
                        }
                        else {                            
                            // console.log("minify successful "+filepath);
                        }
                    });
                }
            }
        }
        else {
            var skip = false;
            for(var folder of skipFolders){
                if (folder == file){
                    console.log("Skipping folder "+folder);
                    skip = true;
                    break;
                }
            }
            // If folder name not marked for skipping then continue to minify
            if (!skip){
                MinifyDir(join(dir,file));
            }
        }
    }
    console.log("Minifying all files in directory "+dir);
}

export {MinifyDir,skipFolders};