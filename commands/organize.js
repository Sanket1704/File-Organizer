let fs = require("fs")
let path = require("path")
let typeObj = require("./Types")
let types = typeObj.TypeKey
function organize(dirPath){
    if (dirPath==undefined){
        dirPath = process.cwd()
        destPath = path.join(dirPath,"Organized Files")
        if(fs.existsSync(destPath) == false){
            fs.mkdirSync(destPath)
            Identify(dirPath,destPath)
        }
        else{
            Identify(dirPath,destPath)
        }
    }
    else{
        let bval = fs.existsSync(dirPath)
        if(bval){
            destPath = path.join(dirPath,"Organized Files")
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath)
                Identify(dirPath,destPath)
            }
            else{
                Identify(dirPath,destPath)
            }
        }
        else{
            console.log("Please enter a vaild path.")
            return
        }
    }
}
function Identify(src,dest){
    let files = fs.readdirSync(src)
    for(let i = 0;i<files.length;i++){
        filePath = path.join(src,files[i])
        if (fs.lstatSync(filePath).isFile()){
            let ext = path.extname(filePath)
            let category = Identify2(ext)
            console.log(files[i],"belongs to --> ",category)
            SendFiles(filePath,dest,category)
        }
    }
}
function Identify2(ext){
    ext = ext.slice(1)
    for(let type in types){
        let cTypeArray = types[type]
        for(let i=0;i<cTypeArray.length;i++){
            if(ext == cTypeArray[i]){
                return type
            }
        }
    }
    return "Others"
}
function SendFiles(filePath,dest,category){
    categoryPath = path.join(dest,category)
    if (fs.existsSync(categoryPath) == false)
        fs.mkdirSync(categoryPath)
    let name = path.basename(filePath)
    let finalPath = path.join(categoryPath,name)
    fs.copyFileSync(filePath,finalPath)
    console.log(name," copied to ",category)
}

module.exports = {
    organizeKey : organize
}