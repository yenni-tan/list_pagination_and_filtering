/**
 * Global list of students and configuration for number of students to show.
 */
const students = document.querySelector('.student-list').children;
const numToShow = 10;

/**
 * Show the students on the given page number.
 */
function showPage(students, page) {
   const offset = page * numToShow;
   const startIndex = offset - 10;
   const endIndex = offset - 1;
   for (var i = 0; i < students.length; i++) {
      if (i < startIndex || i > endIndex) {
         students[i].style.display = 'none'; 
      } else {
         students[i].style.display = ''; 
      }
   }
}


/**
 * Generate pagination links including page button styling and displaying students on a selected page.
 */
function appendPageLinks(list) {
   const pageDiv = document.querySelector('.page');
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   pageDiv.appendChild(paginationDiv);

   const ul = document.createElement('ul');
   paginationDiv.appendChild(ul);

   const pages = Math.ceil(list.length / numToShow);
   var counter = 1;
   for (var counter = 1; counter <= pages; counter++) {
      const a = document.createElement('a');
      a.setAttribute('href', '#');
      a.textContent = counter;
      if (counter === 1) {
         a.className = 'active';
      }
      a.addEventListener('click', (event) => {
         const pageNumber = event.target && event.target.textContent;
         const allLinks = event.target.parentNode.parentNode.children;
         for (var i = 0; i < allLinks.length; i++) {
            const anchor = allLinks[i].children[0];
            if (anchor.textContent === pageNumber) {
               anchor.className = 'active';
            } else {
               anchor.className = '';
            }
         }
         showPage(list, pageNumber);
      });
      
      const li = document.createElement('li');
      li.appendChild(a);
      ul.appendChild(li);
   }
}

/**
 * Generates a search input and button. 
 */
function showSearchBar() {
   const page = document.querySelector('.page-header');
   const div = document.createElement('div');
   div.className = 'student-search';
   page.appendChild(div);

   const input = document.createElement('input');
   input.placeholder = 'Search for students...';
   div.appendChild(input);

   const button = document.createElement('button');
   button.textContent = 'Search';
   div.appendChild(button);
   button.addEventListener('click', () => {
      if (input.value !== '') {
         searchStudents(input.value);
      }
   });
   input.addEventListener('keyup', () => {
      searchStudents(input.value);
   });
}

/**
 * Displays student search results.
 */
function searchStudents(searchTerm) {
   var filteredStudents = [];
   if (searchTerm && searchTerm.length > 0) {
      for (i = 0; i < students.length; i++) {
         const nameArray = students[i].getElementsByTagName('h3');
         if (nameArray && nameArray[0] && !nameArray[0].textContent.includes(searchTerm)) {
            students[i].style.display = 'none';
         } else {
            students[i].style.display = '';
            filteredStudents.push(students[i]);
         }
      }
   } else {
      filteredStudents = students;
   }
   showPage(filteredStudents, 1);
   clearPageLinks();
   appendPageLinks(filteredStudents);

   const errorMessage = document.getElementById('error');
   
   if (filteredStudents.length !== 0) {
      if (errorMessage) {
         errorMessage.style.display = 'none';
      }
   } else {
      if (errorMessage) {
         errorMessage.style.display = '';
      } else {
         createErrorMessage();
      }
   }
}

/**
 * Creates error message when no matches are returned from search.
 */
function createErrorMessage() {
   const newErrorMessage = document.createElement('p');
   newErrorMessage.id = 'error';
   newErrorMessage.textContent = 'Sorry, no results match your search. Please try again.';
   const page = document.getElementsByClassName('page');
   if (page && page[0]) {
      page[0].appendChild(newErrorMessage);
   }
}

/**
 * Clears the old previous pagination links.
 */
function clearPageLinks() {
   const pagination = document.querySelector('.pagination');
   pagination.parentNode.removeChild(pagination);
}

/**
 * Initializes the page with the full list of students, paginated by 10. 
 * Displays the search bar.
 */
showPage(students, 1);
appendPageLinks(students);
showSearchBar();