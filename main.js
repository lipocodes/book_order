let selectedFile = null;
const container1 = document.getElementById('carouselContainer1'); 
const input1 = document.getElementById("cameraInput1");
//const preview = document.getElementById("preview");
const resultBox1 = document.getElementById("result1");
const fileName1 = document.getElementById("fileName1");
const clear_carousel1 = document.getElementById("clear_carousel1");


input1.addEventListener("change", function () {
const file = input1.files[0];
if (file) {
selectedFile = file;
//preview.src = URL.createObjectURL(file);
fileName1.textContent = input1.files[0].name;      
      }
});



function clearCarousel(){    
 container1.innerHTML = '';
 clear_carousel1.style.display = "none";     
}

function displayCarousel(books) {

clear_carousel1.style.display = "block";            
fileName1.textContent = '';      
container1.innerHTML = '';  //clear carousel content

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
container1.appendChild(item);
});
}

// Scroll function for arrow buttons
function scrollCarousel(direction) {    
  const scrollAmount = 150; // px
  container1.scrollLeft += direction * scrollAmount;
}

// Touch / mouse drag support
(function enableDragScroll() {
const container1 = document.getElementById('carouselContainer1');
let isDown = false;
let startX;
let scrollLeft;

container1.addEventListener('mousedown', (e) => {
isDown = true;
container1.classList.add('active');
startX = e.pageX - container1.offsetLeft;
scrollLeft = container1.scrollLeft;
});

container1.addEventListener('mouseleave', () => {
 isDown = false;
 container1.classList.remove('active');
});

container1.addEventListener('mouseup', () => {
 isDown = false;
  container1.classList.remove('active');
});

container1.addEventListener('mousemove', (e) => {
if (!isDown) return;
e.preventDefault();
const x = e.pageX - container1.offsetLeft;
const walk = (x - startX) * 1.5;
container1.scrollLeft = scrollLeft - walk;
});

// Mobile touch support
container1.addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].pageX - container1.offsetLeft;
  scrollLeft = container1.scrollLeft;
});

container1.addEventListener('touchend', () => {
  isDown = false;
});

container1.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - container1.offsetLeft;
    const walk = (x - startX) * 1.5;
    container1.scrollLeft = scrollLeft - walk;
  });
})();






async function sendImage() {

//carousel needs to be empty
document.getElementById("carouselContainer1").innerHTML = "";
      
// taking a photo is compulsory..      
if (!selectedFile) {
        alert("Please take a photo first.");
        return;
      }
      
// Update status
document.getElementById("status1").textContent = "⏳ Sending image to server...";
      
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
if(list_books[0]["existing_swaps"] == 1){
 document.getElementById("status1").textContent = "❌ The right book order should be:";     
}else{
 document.getElementById("status1").textContent = "✅ No misplaced books have been found!";
}

}
catch(error) 
{
 document.getElementById("status1").textContent = "❌ Error: " + error.message;
}
        
}
