const chalk = require('chalk')
module.exports = {
    info: content => console.log(chalk.green(content)),
    error: content => console.error(chalk.red(content)),
    success: content => console.error(chalk.blue(content)),
}