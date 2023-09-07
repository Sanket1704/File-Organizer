#!/usr/bin/env node
let InputArr = process.argv.slice(2)
let fs = require("fs")
const { basename, dirname } = require("path")
let path = require("path")
const { deserialize } = require("v8")
let helpObj = require("./commands/help")
let OrganizeObj = require("./commands/organize")
let treeObj = require("./commands/tree")
let command = InputArr[0]
switch (command){
    case "tree":
        treeObj.treeKey(InputArr[1])
        break
    case "organize":
        OrganizeObj.organizeKey(InputArr[1])
        break
    case "help":
        helpObj.helpKey()
        break
    default:
        console.log("Error !! Please enter right command.")
        break
}