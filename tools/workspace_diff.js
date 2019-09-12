const exec = require('child_process').exec;
var fs = require('fs');
var jsondiffpatch = require('jsondiffpatch');

const workspaceFile = 'data/conversation/workspaces/banking.json';
const workspaceJson = JSON.parse(fs.readFileSync(workspaceFile));

exec("git show master:" + workspaceFile, function(err, stdout, stderr) {
  if (err) {
    console.log("ERROR:");
    console.log(err);
  }
  if (stderr) {
    console.log("STDERR:");
    console.log(stderr);
  }
  const masterJson = JSON.parse(stdout);
  var delta = jsondiffpatch.diff(masterJson, workspaceJson);
  console.log("WORKSPACE JSON DIFF WITH MASTER:");
  console.log("================================");
  jsondiffpatch.console.log(delta);
});