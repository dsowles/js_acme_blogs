
/* main.js
 * INF651 Front End Web Development I
 * Project: Final Project / ACME Blogs
 * Description: A small blog app for practicing dynamic html creation,
 * server calling with the Fetch API, and working with JSON data
 * @author David A. Sowles
 * @version Date 12/09/2024
 */



// 1

//a. Receives up to 3 parameters
//b. 1st parameter is the HTML element string name to be created (h1, p, button, etc)
//c. Set a default value for the 1st parameter to "p"
//d. 2nd parameter is the textContent of the element to be created
//e. Default value of the 2nd parameter is an empty string.
//f. 3rd parameter is a className if one is to be applied (optional)
//g. Use document.createElement() to create the requested HTML element
//h. Set the other desired element attributes.
//i. Return the created element.

function createElemWithText(el = "p", text = "", className) {
    const newEl = document.createElement(el);
    newEl.textContent = text;
    if (className) newEl.classList.add(className);
    return newEl;
}

// 2

//a. Test users JSON data available here: https://jsonplaceholder.typicode.com/users
//b. For testing (not in function) you may want to define users with the test data.
//c. Receives users JSON data as a parameter
//d. Returns undefined if no parameter received
//e. Loops through the users data
//f. Creates an option element for each user with document.createElement()
//g. Assigns the user.id to the option.value
//h. Assigns the user.name to the option.textContent
//i. Return an array of options elements

function createSelectOptions(users) {

    if(!users) return;                      //Check for invalid/empty users JSON data
    let optEls = [];

    users.forEach((user) => {

        const newEl = document.createElement("option");
        newEl.value = user.id;
        newEl.textContent = user.name;
        optEls.push(newEl);

      });

      return optEls;
}


// 3

//a. Receives a postId as the parameter
//b. Selects the section element with the data-post-id attribute equal to the postId
//received as a parameter
//c. Use code to verify the section exists before attempting to access the classList
//property
//d. At this point in your code, the section will not exist. You can create one to test if
//desired.
//e. Toggles the class 'hide' on the section element
//f. Return the section element

function toggleCommentSection(postId) {
    if(!postId) return;                             //If user passes invalid value, return
    let param = "[data-post-id=\"" + postId +"\"]";
    const section = document.querySelector(param);
    if(!section) return null;                      //Ensure that section actaully exists
    section.classList.toggle("hide");
    return section;
}


// 4

//a. Receives a postId as the parameter
//b. Selects the button with the data-post-id attribute equal to the postId received as a
//parameter
//c. If the button textContent is 'Show Comments' switch textContent to 'Hide
//Comments'
//d. If the button textContent is 'Hide Comments' switch textContent to 'Show
//Comments'
//e. Suggestion (not required) for above: try a ternary statement
//f. Return the button element

function toggleCommentButton(postId) {

    if(!postId) return;                                    //If user passes invalid value, return
    let param = "button[data-post-id=\"" + postId +"\"]";
    const btn = document.querySelector(param);
    if(!btn) return null;                                  //If there is no comment button, return nothing

    if(btn.textContent === "Show Comments"){               //Toggle the comment btn's text content
        btn.textContent = "Hide Comments";
    }
    else{
        btn.textContent = "Show Comments";
    }
    return btn;


}

// 5

//a. Receives a parentElement as a parameter
//b. Define a child variable as parentElement.lastElementChild
//c. While the child exists...(use a while loop)
//d. Use parentElement.removeChild to remove the child in the loop
//e. Reassign child to parentElement.lastElementChild in the loop
//f. Return the parentElement

function deleteChildElements(el) {
    if(!el?.tagName) return;             // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining <-- discusses ?. for optional chaining, where
                                         // the operator will default to undefined if the property does not exist (as in the case where the object itself does not exist)

    let child = el.lastElementChild;
    while(child){
        el.removeChild(child);
        child = el.lastElementChild;
    }
    return el;
}

// 6

//a. Selects all buttons nested inside the main element
//b. If buttons exist:
//c. Loop through the NodeList of buttons
//d. Gets the postId from button.dataset.postId
//e. If a postId exists, add a click event listener to the button (reference
//addEventListener) - inside the loop so this happens to each button
//f. The listener calls an anonymous function (see cheatsheet)
//g. Inside the anonymous function: the function toggleComments is called with the
//event and postId as parameters
//h. Return the button elements which were selected
//i. You may want to define an empty toggleComments function for now. The listener
//test will NOT pass for addButtonListeners until toggleComments is completed.
//Nevertheless, I recommend waiting on the logic inside the toggleComments
//function until we get there.

function addButtonListeners() {
    const mainElement = document.querySelector("main");
    const buttons = mainElement ? mainElement.querySelectorAll("button") : document.querySelectorAll("");
    buttons.forEach((button) => {
        const postId = button.dataset.postId; 
        if (postId) {
            button.addEventListener("click", (event) => {
                toggleComments(event, postId);
            });
        }
    });

    // Return the button elements which were selected
    return buttons;
}


/*
function addButtonListeners() {

    const btns = document.querySelectorAll("main button");        // get all buttons inside of the main tag

    if(btns.length > 0){

        for(let i = 0; i < btns.length; i++){

            const postId = btns[i].dataset.postId;                // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset

            if(postId){
                btns[i].addEventListener("click", (e) => {
                    toggleComments(e, postId);
                }); 
            }
        }

        return btns;
    }
    else return btns;

}
*/

// 7

//a. Selects all buttons nested inside the main element
//b. Loops through the NodeList of buttons
//c. Gets the postId from button.dataset.id
//d. If a postId exists, remove the click event listener from the button (reference
//removeEventListener) - inside the loop so this happens to each button
//e. Refer to the addButtonListeners function as this should be nearly identical
//f. Return the button elements which were selected

function removeButtonListeners() {

    const btn = document.querySelectorAll("main button");

    if(btn.length > 0){

        for(let i = 0; i < btn.length; i++){

            const postId = btn[i].dataset.postId;                 //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
            if(postId){
                btn[i].removeEventListener("click", (event) => {
                    //toggleComments(event, postID);
                }, false); 
            }
        }
        return btn;
    }
    else return btn;

}

// 8

//a. Depends on the createElemWithText function we created
//b. Receives JSON comments data as a parameter
//c. Creates a fragment element with document.createDocumentFragment()
//d. Loop through the comments
//e. For each comment do the following:
//f. Create an article element with document.createElement()
//g. Create an h3 element with createElemWithText('h3', comment.name)
//h. Create an paragraph element with createElemWithText('p', comment.body)
//i. Create an paragraph element with createElemWithText('p', `From:
//${comment.email}`)
//j. Append the h3 and paragraphs to the article element (see cheatsheet)
//k. Append the article element to the fragment
//l. Return the fragment element

function createComments(comments) {

    if(!comments) return;                              //If JSON input is null, return

    //Create the new html fragment
    const fragEl = document.createDocumentFragment();

    for(let i = 0; i < comments.length; i++) {

        //Create the individual elements
        const article = document.createElement("article");
        const h3 = createElemWithText('h3', comments[i].name);
        const bodyEl = createElemWithText('p', comments[i].body);
        const emailEl = createElemWithText('p', `From: ${comments[i].email}`);

        //Create fragment structure
        article.append(h3, bodyEl, emailEl);
        fragEl.append(article);

    }

    return fragEl;
}


// 9

//a. Depends on the createSelectOptions function we created
//b. Receives the users JSON data as a parameter
//c. Selects the #selectMenu element by id
//d. Passes the users JSON data to createSelectOptions()
//e. Receives an array of option elements from createSelectOptions
//f. Loops through the options elements and appends each option element to the
//select menu
//g. Return the selectMenu element


function populateSelectMenu(users) {

    if(!users) return;                                    //check for null users JSON input

    const menu = document.getElementById('selectMenu');   //grab the select menu
    const options = createSelectOptions(users);           //create the needed option elements

    for(let i = 0; i < options.length; i++){             //add the new option elements to the selectMenu
        menu.append(options[i]);
    }

    return menu;
}

// 10

//a. Fetches users data from: https://jsonplaceholder.typicode.com/ (look at
//Resources section)
//b. Should be an async function
//c. Should utilize a try / catch block
//d. Uses the fetch API to request all users
//e. Await the users data response
//f. Return the JSON data

async function getUsers() {
    try {
                                                                                 // Get users JSON data
      const res = await fetch("https://jsonplaceholder.typicode.com/users");     // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
                                                                                 // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
                                                                                 // https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages

      if(!res.ok) throw new Error("Status code not in 200-299 range");           //If response is not ok, throw error

      return await res.json();                                                   //Return the users JSON data

    } catch(err) {                                                               //Handle response errors
      console.error(err);
    }
}

// 11

//a. Receives a user id as a parameter
//b. Fetches post data for a specific user id from:
// https://jsonplaceholder.typicode.com/ (look at Routes section)
//c. Should be an async function
//d. Should utilize a try / catch block
//e. Uses the fetch API to request all posts for a specific user id
//f. Await the users data response
//g. Return the JSON data

async function getUserPosts(userId) {

    if(!userId) return;                       //Return if userId is invalid

    try {
      let url = 'https://jsonplaceholder.typicode.com/users/' + userId + '/posts';  //Build path to user posts

      const res = await fetch(url);                                                 //http response
      if(!res.ok) throw new Error("Status code not in 200-299 range");              //if http response is not ok, throw (check getUsers() comments)

      return await res.json();                                                      //Return the user posts as JSON
    } catch(err) {
      console.error(err);
    }

}

// 12

// a. Receives a user id as a parameter
// b. Fetches data for a specific user id from: https://jsonplaceholder.typicode.com/ (look at Routes section)
// c. Should be an async function
// d. Should utilize a try / catch block
// e. Uses the fetch API to request a specific user id
// f. Await the user data response
// g. Return the JSON data

async function getUser(userId) {

    if(!userId) return;                // Return if userId is invalid

    try {

      let url = 'https://jsonplaceholder.typicode.com/users/' + userId;  // Build path for users data

      const res = await fetch(url);                                      //http response
      if(!res.ok) throw new Error("Status code not in 200-299 range");   // check getUsers() comments for links on http stuff
      
      return await res.json();                                           //return the user JSON data
    } catch(err) {
      console.error(err);
    }

}

// 13

//a. Receives a post id as a parameter
//b. Fetches comments for a specific post id from:
//https://jsonplaceholder.typicode.com/ (look at Routes section)
//c. Should be an async function
//d. Should utilize a try / catch block
//e. Uses the fetch API to request all comments for a specific post id
//f. Await the users data response
//g. Return the JSON data

async function getPostComments(postId) {

    if(!postId) return;
    try {
      let url = 'https://jsonplaceholder.typicode.com/posts/' + postId + '/comments';  //Build path for posts comments

      const res = await fetch(url);                                                    //http response
      if(!res.ok) throw new Error("Status code not in 200-299 range");                 //check getUsers() comments for links on http stuff
      
      return await res.json();                                                         //return the posts comments JSON data
    } catch(err) {
      console.error(err);
    }

}

// 14

//a. Dependencies: getPostComments, createComments
//b. Is an async function
//c. Receives a postId as a parameter
//d. Creates a section element with document.createElement()
//e. Sets an attribute on the section element with section.dataset.postId
//f. Adds the classes 'comments' and 'hide' to the section element
//g. Creates a variable comments equal to the result of await
//getPostComments(postId);
//h. Creates a variable named fragment equal to createComments(comments)
//i. Append the fragment to the section
//j. Return the section element

async function displayComments(postId) {
    if(!postId) return;

    const sectEl = document.createElement("section");         //Create the new comment section element

    sectEl.dataset.postId = postId;                          //add the necessary attributes, classes
    sectEl.classList.add('comments');
    sectEl.classList.add('hide');

    const comments = await getPostComments(postId);            //Get the needed JSON data
    const fragEl = createComments(comments);                 //create the comments and html fragment

    sectEl.append(fragEl);                                  //Finish building the new comment section
    return sectEl;                                            //Return the comment section
}

// 15

//a. Dependencies: createElemWithText, getUser, displayComments
//b. Is an async function
//c. Receives posts JSON data as a parameter
//d. Create a fragment element with document.createDocumentFragment()
//e. Loops through the posts data
//f. For each post do the following:
//g. Create an article element with document.createElement()
//h. Create an h2 element with the post title
//i. Create an p element with the post body
//j. Create another p element with text of `Post ID: ${post.id}`
//k. Define an author variable equal to the result of await getUser(post.userId)
//l. Create another p element with text of `Author: ${author.name} with
//${author.company.name}`
//m. Create another p element with the author's company catch phrase.
//n. Create a button with the text 'Show Comments'
//o. Set an attribute on the button with button.dataset.postId = post.id
//p. Append the h2, paragraphs, button, and section elements you have created to
//the article element.
//q. Create a variable named section equal to the result of await
//displayComments(post.id);
//r. Append the section element to the article element
//s. After the loop completes, append the article element to the fragment
//t. Return the fragment element

async function createPosts(posts) {
    if(!posts) return;

    const fragEl = document.createDocumentFragment(); //Create the new html fragment to hold the user posts


      for(let i = 0; i < posts.length; i++) {

          const artEl = document.createElement("article");
          const h2El = createElemWithText('h2', posts[i].title);
          const pBodyEl = createElemWithText('p', posts[i].body);
          const pIdEl = createElemWithText('p', `Post ID: ${posts[i].id}`);

          const author = await getUser(posts[i].userId);

          const pAuthorEl = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
          const pPhraseEl = createElemWithText('p', author.company.catchPhrase);
          const buttonComEl = createElemWithText('button', 'Show Comments');

          buttonComEl.dataset.postId = posts[i].id;


          artEl.append(h2El)                     //Create the article element structure
          artEl.append(pBodyEl)
          artEl.append(pIdEl)
          artEl.append(pAuthorEl)
          artEl.append(pPhraseEl)
          artEl.append(buttonComEl);
          const section = await displayComments(posts[i].id);
          artEl.append(section);
          fragEl.append(artEl);
      }
      return fragEl;
}

// 16

//a. Dependencies: createPosts, createElemWithText
//b. Is an async function
//c. Receives posts data as a parameter
//d. Selects the main element
//e. Defines a variable named element that is equal to:
//i. IF posts exist: the element returned from await createPosts(posts)
//ii. IF post data does not exist: create a paragraph element that is identical to
//the default paragraph found in the html file.
//iii. Optional suggestion: use a ternary for this conditional
//f. Appends the element to the main element
//g. Returns the element variable

async function displayPosts(posts) {

    const mainEl = document.querySelector('main');
    let el;
    if(!posts){
      el = createElemWithText('p','Select an Employee to display their posts.', 'default-text');
    }
    else{
      el = await createPosts(posts);
    }
    mainEl.append(el);
    return el;

}

// 17

//a. Dependencies: toggleCommentSection, toggleCommentButton
//b. Receives 2 parameters: (see addButtonListeners function description)
//i. The event from the click event listener is the 1st param
//ii. Receives a postId as the 2nd parameter
//c. Sets event.target.listener = true (I need this for testing to be accurate)
//d. Passes the postId parameter to toggleCommentSection()
//e. toggleCommentSection result is a section element
//f. Passes the postId parameter to toggleCommentButton()
//g. toggleCommentButton result is a button
//h. Return an array containing the section element returned from
//toggleCommentSection and the button element returned from
//toggleCommentButton: [section, button]

function toggleComments(e, postId) {

    if(!e || !postId) return;         // Return if post id or
    e.target.listener = true;
    let result = [];
    const section = toggleCommentSection(postId);
    const button = toggleCommentButton(postId);
    result.push(section, button);
    return result;
}

// 18

//a. Dependencies: removeButtonListeners, deleteChildElements, displayPosts,
//addButtonListeners
//b. Is an async function
//c. Receives posts JSON data as a parameter
//d. Call removeButtonListeners
//e. Result of removeButtonListeners is the buttons returned from this function
//f. Call deleteChildElements with the main element passed in as the parameter
//g. Result of deleteChildElements is the return of the main element
//h. Passes posts JSON data to displayPosts and awaits completion
//i. Result of displayPosts is a document fragment
//j. Call addButtonListeners
//k. Result of addButtonListeners is the buttons returned from this function
//l. Return an array of the results from the functions called: [removeButtons, main,
//fragment, addButtons]

async function refreshPosts(posts) {

    if(!posts) return;
    let result = [];
    result.push(removeButtonListeners());
    result.push(deleteChildElements(document.querySelector("main")));
    const fragment = await displayPosts(posts);
    result.push(fragment);
    result.push(addButtonListeners());
    return result;

}

// 19

//a. Dependencies: getUserPosts, refreshPosts
//b. Should be an async function
//c. Automatically receives the event as a parameter (see cheatsheet)
//d. Disables the select menu when called into action (disabled property)
//e. Defines userId = event.target.value || 1; (see cheatsheet)
//f. Passes the userId parameter to await getUserPosts
//g. Result is the posts JSON data
//h. Passes the posts JSON data to await refreshPosts
//i. Result is the refreshPostsArray
//j. Enables the select menu after results are received (disabled property)
//k. Return an array with the userId, posts and the array returned from refreshPosts:
//[userId, posts, refreshPostsArray]


async function selectMenuChangeEventHandler(e) {
    if (!e) return undefined;                          //Make sure event is valid

    const tgtEl = e.target;

    var userId = 1;

    //Is event target the right element?
    //console.log("selectMenu? ", tgtEl)


    if (tgtEl) {

      //console.log("target value: ", tgtEl.value)

      userId = tgtEl.value || 1;
      tgtEl.disabled = true;                         //Part d.
    }

    if (userId == "Employees") {
      userId = 1;
    }

    const posts = await getUserPosts(userId); 
    const refreshPostsArray = await refreshPosts(posts);


    if (tgtEl) {
      tgtEl.disabled = false;                             // Reenable the selection menu (part j.)
    }
    return [userId, posts, refreshPostsArray];
}


// 20

//a. Dependencies: getUsers, populateSelectMenu
//b. Should be an async function
//c. No parameters.
//d. Call await getUsers
//e. Result is the users JSON data
//f. Passes the users JSON data to the populateSelectMenu function
//g. Result is the select element returned from populateSelectMenu
//h. Return an array with users JSON data from getUsers and the select element
//result from populateSelectMenu: [users, select]

async function initPage() {

    let result = [];

    const users = await getUsers();                //Construct posts
    const selMenuEl = populateSelectMenu(users);

    result.push(users, selMenuEl);                   //Return posts as html to caller
    return result;

}

// 21

//a. Dependencies: initPage, selectMenuChangeEventHandler
//b. Call the initPage() function.
//c. Select the #selectMenu element by id
//d. Add an event listener to the #selectMenu for the “change” event
//e. The event listener should call selectMenuChangeEventHandler when the change
//event fires for the #selectMenu
//f. NOTE: All of the above needs to be correct for your app to function correctly.
//However, I can only test if the initApp function exists. It does not return anything.

function initApp() {

    initPage();                                              //Get posts and put into page
    const menuEl = document.getElementById("selectMenu");
    menuEl.addEventListener("change", (e) => {
      selectMenuChangeEventHandler();
    });

}

//Ensure that page is initialized immediately after the DOM has been loaded.
document.addEventListener("DOMContentLoaded", (e) => {
    initApp();
  }, false);