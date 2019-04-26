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

   const pages = Math.ceil(students.length / numToShow);
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
         showPage(students, pageNumber);
      });
      
      const li = document.createElement('li');
      li.appendChild(a);
      ul.appendChild(li);
   }
}

showPage(students, 1);
appendPageLinks(students);