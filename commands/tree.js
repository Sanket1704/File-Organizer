let fs = require("fs")
let path = require("path")
function tree(dirPath){
    if(dirPath == undefined){
        tree2(process.cwd(), "")
        return
    }
    else{
        if(fs.existsSync(dirPath)){
            tree2(dirPath, "")
        }
        else{
            console.log("Please enter a valid path")
            return
        }
    }

}
function tree2(dirPath,indent){
    let isFile = fs.lstatSync(dirPath).isFile()
    if (isFile == true){
        let fileName = path.basename(dirPath)
        console.log(indent + "├──" + fileName)
    }
    else{
        let dirName = path.basename(dirPath)
        console.log(indent + "└──" + dirName)
        let content = fs.readdirSync(dirPath)
        for(let i=0;i<content.length;i++){
            let Contentpath = path.join(dirPath,content[i])
            tree2(Contentpath, indent + "\t")
        }
    }
}

module.exports = {
    treeKey : tree
}