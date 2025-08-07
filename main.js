let selectedFile = null;
const input = document.getElementById("cameraInput");
const preview = document.getElementById("preview");
const resultBox = document.getElementById("result");

input.addEventListener("change", function () {
const file = input.files[0];
if (file) {
selectedFile = file;
preview.src = URL.createObjectURL(file);
      }
});



function displayCarousel(books) {
const container = document.getElementById('carouselContainer');
container.innerHTML = ''; // Clear existing

books.forEach(book => {
const item = document.createElement('div');
item.className = 'carousel-item';

const dewey = document.createElement('div');
dewey.className = 'dewey';
dewey.textContent = book.dewey;

const title = document.createElement('div');
title.className = 'title';
title.textContent = book.title;

item.appendChild(dewey);
item.appendChild(title);
container.appendChild(item);
});
}

// Scroll function for arrow buttons
function scrollCarousel(direction) {
  const container = document.getElementById('carouselContainer');
  const scrollAmount = 150; // px
  container.scrollLeft += direction * scrollAmount;
}

// Touch / mouse drag support
(function enableDragScroll() {
const container = document.getElementById('carouselContainer');
let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
isDown = true;
container.classList.add('active');
startX = e.pageX - container.offsetLeft;
scrollLeft = container.scrollLeft;
});

container.addEventListener('mouseleave', () => {
 isDown = false;
 container.classList.remove('active');
});

container.addEventListener('mouseup', () => {
 isDown = false;
  container.classList.remove('active');
});

container.addEventListener('mousemove', (e) => {
if (!isDown) return;
e.preventDefault();
const x = e.pageX - container.offsetLeft;
const walk = (x - startX) * 1.5;
container.scrollLeft = scrollLeft - walk;
});

// Mobile touch support
container.addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener('touchend', () => {
  isDown = false;
});

container.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });
})();






async function sendImage() {

//carousel needs to be empty
document.getElementById("carouselContainer").innerHTML = "";
      
// taking a photo is compulsory..      
if (!selectedFile) {
        alert("Please take a photo first.");
        return;
      }
      
// Update status
document.getElementById("status").textContent = "⏳ Sending image to server...";
      
try 
{
 const formData = new FormData();
 formData.append("image", selectedFile);
             
 const response = await fetch("https://www.yvclib1.xyz/ocr/process", {
    method: "POST",
    body: formData
});
const data = await response.json(); 
let list_books = [];
list_books.push(data);
displayCarousel(list_books);  
const list_items = list_books[0]["sorted"];
     
let books = [];      
for(let i=0; i<list_items.length; i++){
 const item = list_items[i];
 const pos = item.indexOf("^^^");
 const dewey = item.substr(pos+3);     
 const title = item.substr(0,pos);
      
 let obj = {};
 obj.dewey = dewey;
 obj.title = title;         
 books.push(obj);     
}
 
displayCarousel(books);      
          
if (!response.ok) {  
    console.log("eeeeeeeeeeeeeeeeee=" + response.statusText);
    throw new Error("Server error: " + response.statusText);
}

//if the book check was not clean of errors      
if(books.length>1){
 document.getElementById("status").textContent = "❌ The right book order should be:";     
}else{
 document.getElementById("status").textContent = "✅ No misplaced books have been found!";
}

}
catch(error) 
{
 document.getElementById("status").textContent = "❌ Error: " + error.message;
}
        
}
