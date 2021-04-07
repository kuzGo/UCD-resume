function userInformationHTML(user) {
    return `
    <h2>${user.name}
      <span class="small-name">
         (@<a href="${user.html_url}" target = "_blank">${user.login}</a>)
      </span>
    </h2>
    <div class="gh-content>"
       <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
               <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"/>
            </a>
       </div>
            <p>Followers:${user.followers} - Following :${user.following} <br> Repos:${user.public_repos}</p>
    </div>
    `;
}

function repoInformationHTML (repos) {
    if (repos.length === 0) {
        return `<div class="clearfix repo-list">No Repos!</div>`;
    }
    let listItemHtml =repos.map(function(repo){
        return`<li>
        <a href="${repo.html_url}" taret="_blank">${repo.name}</a>
    </li>`;
    });

    return`<div class="clearfix repo-list">
            <p>
                <strong>Repo List:</strong>
            </p>
            <ul>
            ${listItemHtml.join("\n")}
            </ul>
    </div>`;
}
function fetchGitHubInformation(event) {
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    let username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub name</h2>`);
        return;
    }

$("#gh-user-data").html(
    `<div id="loader">
    <img src="assets/css/loader.gif" alt="loading ... "/>
    </div>`);


$.when (
    $.getJSON(`https://api.github.com/users/${username}`),
    $.getJSON(`https://api.github.com/users/${username}/repos`)
).then(
    function(firstResponse,secondResponse){
        let userData = firstResponse[0];
        let repoData = secondResponse[0];
        $("#gh-user-data").html(userInformationHTML(userData));
        $("#gh-repo-data").html(repoInformationHTML(repoData));
    },
    function(errorResponse){
        if(errorResponse.status === 404){
            $("#gh-user-data").html(`<h2>No info found for user ${username}`);
        }else{
            console.log(errorResponse);
            $("#gh-user-data").html(`Error:${errorResponse.responseJSON.message}</h2>`);
        }
    });
}

$(document).ready(fetchGitHubInformation);