const fs = require("fs");
const yaml = require("js-yaml");

const labels = process.env.LABELS.split(" ");
const fileContents = fs.readFileSync(".github/reviewers.yml", "utf8");
const reviewers = yaml.load(fileContents);
let assignedReviewers = [];

labels.forEach((label) => {
  if (reviewers[label]) {
    assignedReviewers = assignedReviewers.concat(reviewers[label]);
  }
});

if (assignedReviewers.length > 0) {
  console.log("::set-output name=reviewers::" + assignedReviewers.join(","));
} else {
  console.log("No reviewers found for the labels " + labels.join(", "));
}
