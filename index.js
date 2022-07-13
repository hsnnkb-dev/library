var library = [];

var banner = document.getElementById("banner");
var cancelBtn = document.getElementById("cancel-btn");
var addBook = document.getElementById("addbook");
var form = document.getElementById("pop");
var title = document.getElementById("title");
var author = document.getElementById("author");
var pages = document.getElementById("pages");
var readBtn = document.getElementById("read");
var p = document.getElementById("proto");
var container = document.getElementById("container");
var delBtn;

window.addEventListener("load", loadpage, )

function checkbtns(testClone, library){
    var thisBtn = testClone.querySelector(".readcheck");
    thisBtn.style.background = thisBtn.innerHTML=="READ"? "darkgreen": "red";
    thisBtn.addEventListener("click", ()=>{
        if(thisBtn.innerHTML=="READ"){
            thisBtn.innerHTML = "NOT READ"
        }  else{
            thisBtn.innerHTML = "READ"
        }
        thisBtn.style.background = thisBtn.innerHTML=="READ"? "darkgreen": "red";
        
        library[3] = thisBtn.innerHTML;
        localStorage.setItem(testClone.id, JSON.stringify(library));
        
    })
}

function loadpage(){
    for(var i=0; i<localStorage.length; i++){ 
        
        var library = JSON.parse(localStorage.getItem(localStorage.key(i)));
        var testClone = p.cloneNode(true);
        testClone.classList.remove("display");
        testClone.querySelectorAll("p")[0].innerHTML = library[0];
        testClone.querySelectorAll("p")[1].innerHTML = "- " + library[1];
        testClone.querySelectorAll("p")[2].innerHTML = "pages: " + library[2];
        testClone.querySelector("div").querySelectorAll("button")[0].innerHTML = library[3];
        checkbtns(testClone, library)
        testClone.id = library[4];
        container.appendChild(testClone);
    }
    removecards();
}

function removecards(){
    delBtn = document.querySelectorAll(".del");
    delBtn.forEach((l)=>{
        l.addEventListener("click", ()=>{
            container.removeChild(l.parentNode.parentNode);
            localStorage.removeItem(l.parentNode.parentNode.id)
            console.log(l.parentNode.parentNode);
        })
    })
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    var titleValue = title.value; 
    var authorValue = author.value; 
    var pagesValue = pages.value; 
    var readValue = readBtn.innerHTML;
    
    
    var testClone = p.cloneNode(true);
    testClone.id = new Date().getTime();
    library = [titleValue, authorValue, pagesValue, readValue, testClone.id]
    testClone.classList.remove("display");
    testClone.querySelectorAll("p")[0].innerHTML = library[0];
    testClone.querySelectorAll("p")[1].innerHTML = "- " + library[1];
    testClone.querySelectorAll("p")[2].innerHTML = "pages: " + library[2];
    testClone.querySelector("div").querySelectorAll("button")[0].innerHTML = library[3];
    window.localStorage.setItem(`${testClone.id}`, JSON.stringify(library));
    testClone.id = library[4];
    checkbtns(testClone, library);
    container.appendChild(testClone);
    form.reset();

    removecards();

    banner.classList.toggle("display"); 
})

addBook.addEventListener("click", ()=>{
    banner.classList.toggle("display");
})

cancelBtn.addEventListener("click", ()=>{
    banner.classList.toggle("display");
})

readBtn.addEventListener("click", ()=>{
    if(readBtn.innerHTML == "READ"){
        readBtn.innerHTML = "NOT READ";
    }  else{
        readBtn.innerHTML = "READ"
    }
})
