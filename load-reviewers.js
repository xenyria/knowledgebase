const fs = require("fs");
const yaml = require("js-yaml");

const labelsJson = process.env.LABELS;
const prAuthor = process.env.PR_AUTHOR;
const labelsArray = JSON.parse(labelsJson).map((label) => label.name);
const fileContents = fs.readFileSync(".github/reviewers.yaml", "utf8");
const reviewers = yaml.load(fileContents);
let assignedReviewers = [];

labelsArray.forEach((label) => {
  if (reviewers[label]) {
    assignedReviewers = assignedReviewers.concat(reviewers[label]);
  }
});

const indexOfAuthor = assignedReviewers.indexOf(prAuthor);
if (indexOfAuthor > -1) {
  assignedReviewers.splice(indexOfAuthor, 1);
}

if (assignedReviewers.length > 0) {
  console.log("::set-output name=reviewers::" + assignedReviewers.join(","));
} else {
  console.log("No reviewers found for the labels " + labelsArray.join(", "));
}
