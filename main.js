let btn = document.querySelector(".btn");
let section = document.querySelector("section");
let repo = document.querySelector(".repo");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  let input = document.querySelector(".input").value;
  if (input) {
    let data = fetch(`https://api.github.com/users/${input}`);
    data
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error("user not found");
        }
      })
      .then((data) => {
        let element = document.createElement("div");
        section.innerHTML = "";
        element.classList.add("info");
        element.innerHTML = `<div class="userdetails">
            <img
              src="${data.avatar_url}"
              alt="user"
            />
            <div class="userinfo">
              <h1>${data.name}</h1>
              <p>${data.login}</p>
            </div>
          </div>
          <div class="bio">
            <p>${data.bio}</p>
            <span>${data.location ? data.location : "india"}</span>
          </div>
          <div class="userfollowers">
            <p>Followers<span>${data.followers}</span></p>
            <p>Following<span>${data.following}</span></p>
            <p>public_repos<span>${data.public_repos}</span></p>
          </div>`;
        section.appendChild(element);

        let repodata = fetch(data.repos_url);
        repodata
          .then((data) => {
            if (data.ok) {
              return data.json();
            } else {
              throw new Error("repo is not found");
            }
          })
          .then((data) => {
            console.log(data);
            repo.innerHTML = "";
            data.forEach((element) => {
              let repoelement = document.createElement("div");
              repoelement.classList.add("repo_data");
              repoelement.innerHTML = `
          <a href="${element.homepage}"><i class="ri-link"></i><h1>${element.name}</h1>
          </a>`;
              repo.appendChild(repoelement);
            });
          })
          .catch((error) => {
            section.innerHTML = "";
            let errormessage = document.createElement("p");
            errormessage.innerHTML = `<i class="ri-error-warning-line"></i> ${error}`;
            errormessage.style.color = "red";
            errormessage.style.textAlign = "center";
            section.appendChild(errormessage);
          });
      })
      .catch((error) => {
        section.innerHTML = "";
        let errormessage = document.createElement("p");
        errormessage.innerHTML = `<i class="ri-error-warning-line"></i> ${error}`;
        errormessage.style.color = "red";
        errormessage.style.textAlign = "center";
        section.appendChild(errormessage);
      });
    document.querySelector(".input").value = "";
  } else {
    alert("please enter userName");
  }
});
