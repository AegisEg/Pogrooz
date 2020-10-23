export function setForceTitle(title) {
  var pageTitle;
  pageTitle = "Pogrooz | " + title;
  document.title = pageTitle ? pageTitle : "Pogrooz";
}