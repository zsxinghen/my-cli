#!/usr/bin/env node
// 上面行不加必挂,
// 让系统动态的去PATH目录中查找node来执行你的脚本文件。

const program = require("commander");
const version = require("./package.json").version;
const log = require("./util/log");
const prompt = require('./config/prompt')
const clear = require('clear')

program
  .version(version, "-v, --version")
  .command("create")
  .description("使用 my-cli 创建一个新的项目")
  .option("-d --dir <dir>", "创建目录")
  .action((command) => { // 指定命令要做什么事，回调函数中实现命令功能
    log.info(JSON.stringify(command))
    // clear()
    prompt.gitDownload()
    // const create = require("./create/index");
    // create(name, command);
  }).parse(process.argv);
