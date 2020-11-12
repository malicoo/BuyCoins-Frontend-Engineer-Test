/**
 * Bitkoin Coding Test
 *
 * @author Malico <hi@malico.me> - https://malico.me
 */
const API_URL = "https://api.github.com/graphql";
/**
 * Git User Name
 *
 * @var {string}
 */
const USER_LOGIN = "malicoo";
/**
 * Github token
 *
 * @var {string}
 */
const token = "05f1b0c656448db5cafbcb6b826399d59fd018e2";
/**
 * Months
 *
 * @var {array}
 */
const months = [
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
const query = `{
    user(login: "${USER_LOGIN}") {
      avatarUrl
      login
      bio
      name
      websiteUrl
      twitterUsername
      status {
        emojiHTML
        message
      }
      repositories(first: 20, privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
        totalCount
        nodes {
          languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
            edges {
                node {
                    name
                    color
                }
            }
          }
          description
          homepageUrl
          name
          updatedAt
          url
          forkCount
          watchers {
            totalCount
          }
          stargazers {
            totalCount
          }
          licenseInfo {
            name
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
              url
            }
          }
        }
      }
    }
}`;
/**
 * Render Returned Repos
 *
 * @param   {Object}  repos
 *
 * @return  {void}
 */
const displayRepos = (repos) => {
    // Display Total Number of Repos
    const totals = document.querySelectorAll("#total");
    totals.forEach((total) => {
        total.innerHTML = repos.totalCount;
    });
    // Repositories
    const reposUL = document.querySelector("#repos");
    repos.nodes.forEach((repo) => {
        const repoItem = document.createElement("li");
        const repoHTML = `
        <div class="flex repo py-4 border-b border-gray justify-between">

            <div class="">

                <h2 class="title">
                  <a href="${repo.url}">
                    ${repo.name}
                  </a>
                </h2>
                
                ${repo.description
            ? "<p class='description'>" + repo.description + "</p>"
            : ""}

                ${repo.repositoryTopics.nodes.length
            ? "<div class='py-2 topics'> " +
                repo.repositoryTopics.nodes
                    .map((topic) => "<span class='mr-2 topic'>" +
                    topic.topic.name +
                    "</span>")
                    .join("") +
                "</div>"
            : ""}
           
                
                <div class="flex mt-3 items-center">
                    <div class="flex mr-2 items-center"  style="${!repo.languages.edges[0] ? "display: none;" : ""}">
                        <span class="lang-dot mr-1 inline" style="background: ${repo.languages.edges[0]
            ? repo.languages.edges[0].node.color
            : ""}">
                        </span>

                        ${repo.languages.edges[0]
            ? "<span>" +
                repo.languages.edges[0].node.name +
                "</span>"
            : ""}
                    </div>

                    <div class="items-center flex mr-3">
                      <ion-icon class="mr-1" name="star-outline"></ion-icon> 
                      <span class="mt-1">
                        ${repo.stargazers.totalCount}
                      </span>
                    </div>

                    <div class="flex items-center mr-3">
                        <ion-icon class="mr-1" name="git-network-outline"></ion-icon> 
                        <span class="mt-1">${repo.forkCount}</span>
                    </div>
                    
                    ${repo.licenseInfo
            ? '<div class="flex items-center mr-3">' +
                '<svg class="mr-1" viewBox="0 0 16 16" fill="currentColor" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg><span class="mt-1">' +
                repo.licenseInfo.name +
                "</span></div>"
            : ""}

                    <div>
                        Updated on ${new Date(repo.updatedAt).getDate() +
            " " +
            months[new Date(repo.updatedAt).getMonth()]}
                    </div>

                </div>
            </div>
            <div>
                <button class="flex items-center" title="${repo.url}" >
                    <ion-icon name="star-outline" class="mr-1"></ion-icon> <span> Star </span>
                </button>
            </div>
        </div>
    `;
        repoItem.innerHTML = repoHTML;
        reposUL.append(repoItem);
    });
};
/**
 * Displayer User infor
 *
 * @return  {void}
 */
const displayUserInfo = (user) => {
    //    Avatars
    const avatars = document.querySelectorAll(".avatar");
    avatars.forEach((avatar) => {
        avatar.src = user.avatarUrl;
    });
    // Names
    const names = document.querySelectorAll("#name");
    names.forEach((name) => {
        name.innerHTML = user.name;
    });
    // userNames
    const usernames = document.querySelectorAll("#username");
    usernames.forEach((username) => {
        username.innerHTML = user.login;
    });
    // bios
    const bios = document.querySelectorAll("#bio");
    bios.forEach((bio) => {
        bio.innerHTML = user.bio;
    });
    // emoji
    const emoji = document.querySelector("#emoji");
    emoji.innerHTML =
        user.status.emojiHTML +
            `<span class="message"> ${user.status.message} </span>`;
    const website = document.querySelector("#website");
    website.href = "//" + user.websiteUrl;
};
/**
 * Render returned Data
 *
 *
 * @return  void
 */
const displaydata = (data) => {
    displayUserInfo(data.user);
    displayRepos(data.user.repositories);
    console.log(data.user);
};
/**
 * Fetch Data
 *
 * @return  {void}
 */
const fetchData = () => {
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "bearer " + token,
        },
        body: JSON.stringify({ query }),
    })
        .then((r) => r.json())
        .then((data) => displaydata(data.data));
};
fetchData();
