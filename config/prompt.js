const inquirer = require("inquirer");
const choices = require("inquirer/lib/objects/choices");
const log = require("../util/log");
const download = require("download-git-repo");
const ora = require("ora");
const gitJson = require("./git.json");
module.exports = {
  gitDownload: (name) => gitDownload(name),
};
const gitDownload = async (name) => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "choose project",
        message: "please choose your project:",
        choices: gitJson,
      },
      {
        type: "input",
        name: "projectName",
        message: "请输入项目名称",
        default: "gitbook",
      },
    ])
    .then((answers) => {
      const { "choose project": choose, projectName } = answers;
      // Use user feedback for... whatever!!
      const spinner = ora("正在下载项目...");

      spinner.start();
      download(
        `direct:https://github.com/zsxinghen/${choose}.git`, `test/${projectName}`,
        { clone: true },
        (err) => {
          if (err) {
            spinner.fail();
            log.error("fail:");
            log.error(err);
          } else {
            spinner.succeed();
            const fileName = `${projectName}/package.json`;
            const meta = {
              name: projectName,
              description: description,
            };
            if (fs.existsSync(fileName)) {
              const content = fs.readFileSync(fileName).toString();
              const result = handlebars.compile(content)(meta);
              fs.writeFileSync(fileName, result);
            }
            console.log(symbols.success, chalk.green("项目初始化完成"));
          }
        }
      );
    })
    .catch((error) => {
      if (error.isTtyError) {
        log.error("fail:");
        log.error("isTtyError");
        // Prompt couldn't be rendered in the current environment
      } else {
        log.error("fail");
        log.error(error);
        // Something else went wrong
      }
    });
};
