/**
 * Bitkoin Coding Test
 *
 * @author Malico <hi@malico.me> - https://malico.me
 */
var API_URL = "https://api.github.com/graphql";
/**
 * Github token
 *
 * @var {string}
 */
var token = window.env.PUBLIC_URL;
/**
 * Months
 *
 * @var {array}
 */
var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
/**
 * graphql Query
 */
var query = "{\n  viewer {\n      avatarUrl\n      login\n      bio\n      name\n      websiteUrl\n      twitterUsername\n      status {\n        emojiHTML\n        message\n      }\n      repositories(first: 20, privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {\n        totalCount\n        nodes {\n          languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {\n            edges {\n                node {\n                    name\n                    color\n                }\n            }\n          }\n          description\n          homepageUrl\n          name\n          updatedAt\n          url\n          forkCount\n          watchers {\n            totalCount\n          }\n          stargazers {\n            totalCount\n          }\n          licenseInfo {\n            name\n          }\n          repositoryTopics(first: 10) {\n            nodes {\n              topic {\n                name\n              }\n              url\n            }\n          }\n        }\n      }\n    }\n}";
/**
 * Render Returned Repos
 *
 * @param   {Object}  repos
 *
 * @return  {void}
 */
var displayRepos = function (repos) {
    // Display Total Number of Repos
    var totals = document.querySelectorAll("#total");
    totals.forEach(function (total) {
        total.innerHTML = repos.totalCount;
    });
    // Repositories
    var reposUL = document.querySelector("#repos");
    repos.nodes.forEach(function (repo) {
        var repoItem = document.createElement("li");
        var repoHTML = "\n        <div class=\"flex repo py-4 border-b border-gray justify-between\">\n\n            <div class=\"\">\n\n                <h2 class=\"title\">\n                  <a href=\"" + repo.url + "\">\n                    " + repo.name + "\n                  </a>\n                </h2>\n                \n                " + (repo.description ? "<p class='description'>" + repo.description + "</p>" : "") + "\n\n               " + (repo.repositoryTopics.nodes.length ? "<div class='py-2 topics'> " + repo.repositoryTopics.nodes.map(function (topic) { return "<span class='mr-2 topic'>" + topic.topic.name + "</span>"; }).join("") + "</div>" : "") + "\n           \n                \n                <div class=\"flex mt-3 items-center\">\n                    <div class=\"flex mr-2 items-center\"  style=\"" + (!repo.languages.edges[0] ? "display: none;" : "") + "\">\n                        <span class=\"lang-dot mr-1 inline\" style=\"background: " + (repo.languages.edges[0] ? repo.languages.edges[0].node.color : "") + "\">\n                        </span>\n\n                        " + (repo.languages.edges[0] ? "<span>" + repo.languages.edges[0].node.name + "</span>" : "") + "\n                    </div>\n\n                    <div class=\"items-center flex mr-3\">\n                      <ion-icon class=\"mr-1\" name=\"star-outline\"></ion-icon> \n                      <span class=\"mt-1\">\n                        " + repo.stargazers.totalCount + "\n                      </span>\n                    </div>\n\n                    <div class=\"flex items-center mr-3\">\n                        <ion-icon class=\"mr-1\" name=\"git-network-outline\"></ion-icon> \n                        <span class=\"mt-1\">" + repo.forkCount + "</span>\n                    </div>\n                    \n                    " + (repo.licenseInfo ? '<div class="flex items-center mr-3">' + '<svg class="mr-1" viewBox="0 0 16 16" fill="currentColor" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg><span class="mt-1">' + repo.licenseInfo.name + "</span></div>" : "") + "\n\n                    <div>\n                        Updated on " + (new Date(repo.updatedAt).getDate() + " " + months[new Date(repo.updatedAt).getMonth()]) + "\n                    </div>\n\n                </div>\n            </div>\n            <div>\n                <button class=\"flex items-center\" title=\"" + repo.url + "\" >\n                    <ion-icon name=\"star-outline\" class=\"mr-1\"></ion-icon> <span> Star </span>\n                </button>\n            </div>\n        </div>\n    ";
        repoItem.innerHTML = repoHTML;
        reposUL.append(repoItem);
    });
};
/**
 * Displayer User infor
 *
 * @return  {void}
 */
var displayUserInfo = function (user) {
    //    Avatars
    var avatars = document.querySelectorAll(".avatar");
    avatars.forEach(function (avatar) {
        avatar.src = user.avatarUrl;
    });
    // Names
    var names = document.querySelectorAll("#name");
    names.forEach(function (name) {
        name.innerHTML = user.name;
    });
    // userNames
    var usernames = document.querySelectorAll("#username");
    usernames.forEach(function (username) {
        username.innerHTML = user.login;
    });
    // bios
    var bios = document.querySelectorAll("#bio");
    bios.forEach(function (bio) {
        bio.innerHTML = user.bio;
    });
    // emoji
    var emoji = document.querySelector("#emoji");
    if (user.status) {
        emoji.innerHTML =
            user.status.emojiHTML +
                ("<span class=\"message\"> " + user.status.message + " </span>");
    }
    else
        emoji.innerHTML += "<span class=\"message\"> Set Status </span>";
};
/**
 * Render returned Data
 *
 *
 * @return  void
 */
var displaydata = function (_a) {
    var viewer = _a.viewer;
    displayUserInfo(viewer);
    displayRepos(viewer.repositories);
};
/**
 * Fetch Data
 *
 * @return  {void}
 */
var fetchData = function () {
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "bearer " + token
        },
        body: JSON.stringify({ query: query })
    })
        .then(function (r) {
        if (r.status === 401) {
            alert("Authorization: check app.ts or app.js");
        }
        return r.json();
    })
        .then(function (data) { return displaydata(data.data); })["catch"](function (error) {
        console.log(error);
    });
};
fetchData();
