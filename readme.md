Recraft CLI
======
CLI for bootstrapping projects.

Commands
======

* recraft-cli git feature branch-name
```
git checkout -b feature/branch-name
```
* recraft-cli clone app-name -p `[ssh|https]`
```
git clone app-repo
```
* recraft-cli initial-commit origin-url
```
git remote rm origin
rm -rv .git
git remote add origin origin-url
git add .
git commit -m "initial commit"
git push -u origin master
```
