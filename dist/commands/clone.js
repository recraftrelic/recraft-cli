var Command = require('./types').Command;
var cloneCommand = {
    name: "clone",
    methodToCall: function (args) {
        var appName = args['_'][1];
        var method = args['p'] || "ssh";
        if (repoList[appName]) {
            var repoUrl_1 = repoList[appName][method];
            if (!repoUrl_1) {
                return console.log(chalk.red(method + " schema not found for " + appName));
            }
            console.log(chalk.green("cloning " + appName + " from " + repoUrl_1));
            simpleGit.outputHandler(function (_, stdout, stderr) {
                stdout.pipe(process.stdout);
                stderr.pipe(process.stderr);
            })
                .clone(repoList[appName][method])
                .then(function () { return console.log(chalk.green("successfully cloned " + appName + " from " + repoUrl_1)); })
                .catch(function (error) { return console.log(chalk.red(error)); });
        }
        else {
            console.log("project " + chalk.red(appName) + " doesn't found");
        }
    }
};
module.exports = cloneCommand;
//# sourceMappingURL=clone.js.map