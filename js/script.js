const numPage = 9;
const studentList = document.querySelector('.student-list');
const header = document.querySelector('.header');
const list = data;

// displaying the list of students and their names, mails, img and date
function showPage(list, page) {
  const startIndex = (page * numPage) - numPage;
  const endIndex = page * numPage;
  studentList.innerHTML = "";
 // for (let i=0; i < list.length; i++){
  for(let i in list) {
   if (i >= startIndex && i < endIndex){ // adding list of 9 students with personal infos
    let showList =   `<li class="student-item cf">
      <div class="student-details">
      <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
      <h3 class="h3">${list[i].name.first} ${list[i].name.last}</h3>
      <span class="email">${list[i].email}</span>
      </div>
      <div class="joined-details">
      <span class="date">Joined ${list[i].registered.date}</span>
      </div>
      </li> `;
      // display 'showList' on page : 
    studentList.insertAdjacentHTML("beforeend", showList);
    }
   }
}


function addPagination(list) {
   const pagLength = Math.ceil(list.length / numPage) + 1; 
   const ul = document.querySelector('.link-list');
   ul.innerHTML = "";
   for (i = 1; i < pagLength; i++) { //making 5 buttons
      let ulHTML = 
      `
       <li> <button id="liBtn" type="button">${[i]}</button> </li>
      `
      ul.insertAdjacentHTML("beforeend", ulHTML);
      document.querySelector('#liBtn').className = "active" // adding 'active' class for the first button
   }
   
   ul.addEventListener('click', (e) => {
      const ulHTML = e.target ; // declaring that the buttons will be the event targets
      const ulText = ulHTML.textContent; //textcontect = page number, in this case.
      if (e.target.tagName === 'BUTTON') {
         let activeBtn = document.querySelector(".active"); // holding the button with active class in a var
         activeBtn.className = ''; // removing the active class from the prev selected button
         ulHTML.className = "active"; // adding active class to the selected button
         showPage(list, ulText);
      }
   });
}

//searchbar :
function searchBar() {
   let searchBar =
      `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button id="searchBtn" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>`
      header.insertAdjacentHTML("beforeend", searchBar)
}
searchBar();

// Filter Search
const search = document.querySelector('#search');

function searchFilter(search, list) {
   // empty array to store the results
   let newPage = [];
   
   //for (i=0; i < list.length; i++)
   for(let i in list) {
      // store fullname, and Ignore upper or lower case.
   let fullName = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;

   if (fullName.includes(search.value.toLowerCase())) {
      // 'refreshing' the list according to results
      newPage.push(list[i]);   
   } 
   }
// Call new functions
   addPagination(newPage);
   showPage(newPage, 1);
// no results 
if (newPage.length === 0) {
   studentList.innerHTML = `<h4>No Results Found</h4>`
};
}

//function for eventlistener - triger the newlist \ else, not.
function eventFunc() {
   if(search.value.length != 0) {
      searchFilter(search, list);
   } else {
      showPage(list, 1);
      addPagination(list);
   }
}
// event listener
const searchBtn = document.querySelector('#searchBtn');
search.addEventListener('keyup', eventFunc);
searchBtn.addEventListener('click', eventFunc);

// call the 'original' functions
showPage(list, 1);
addPagination(list);