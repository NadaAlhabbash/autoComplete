const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

//searching states.json and filter it
function searchWord(searchText) {
  if (searchText.length !== 0) {
    fetch(`/search?q=${searchText}`)
      .then((res) => check(res))
      .then((data) => createCard(data))
      .catch((err) => errHandler(err));
  }
  matchList.innerHTML = "";
}

function check(res) {
  // console.log(res.status);
  if (res.status === 404) throw new Error("No matches");
  return res.json();
}
function errHandler(err) {
  matchList.innerHTML = `
  <div id="match-list" class="box-content">
            <ul>
               <strong> <p> No Matches </p> </strong>
            </ul>
        </div>
  `;
}

//Show results in html
const createCard = (matches) => {
  console.log(matches);
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div id="match-list" class="box-content">
            <ul>
               <strong> <p> ${match.name} </p> </strong>
            </ul>
        </div>
        `
      )
      .join("");
    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchWord(search.value));
