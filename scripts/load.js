const octo = require("octokat");
const fs = require("fs");
console.log(process.argv);
const url = process.argv[2];

const matchResult =
  url && url.match(/https:\/\/github.com\/([^/]*)\/([^/]*)(\/.*)?/);
if (!matchResult) {
  console.log("url error");
  process.exit(0);
}
const [_, username, reponame, path] = matchResult;
console.log({ username, reponame });
const repo = octo().repos(username, reponame);

repo.readme
  .read()
  .then((filecontent) => {
    const dirname = `READMES/${username}/${reponame}`;
    fs.mkdirSync(dirname, { recursive: true });
    fs.writeFileSync(`${dirname}/README.md`, filecontent);
    fs.writeFileSync(`${dirname}/README-zh.md`, filecontent);
  })
  .catch((e) => {
    console.log(e);
  });

// repo.commits
//   .fetch({ path: "README.md" })
//   .then(console.log)
//   .catch((e) => {});
