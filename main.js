let num_input = 0;
let selectedFile1 = null;
let selectedFile2 = null;
let selectedFile3 = null;
const container1 = document.getElementById('carouselContainer1'); 
const container2 = document.getElementById('carouselContainer2');
const container3 = document.getElementById('carouselContainer3'); 
const input1 = document.getElementById("cameraInput1");
const input2 = document.getElementById("cameraInput2");
const input3 = document.getElementById("cameraInput3");
//const preview = document.getElementById("preview");

const resultBox1 = document.getElementById("result1");
const resultBox2 = document.getElementById("result2");
const resultBox3 = document.getElementById("result3");
const fileName1 = document.getElementById("fileName1");
const fileName2 = document.getElementById("fileName2");
const fileName3 = document.getElementById("fileName3");

const clear_carousel1 = document.getElementById("clear_carousel1");
const clear_carousel2 = document.getElementById("clear_carousel2");
const clear_carousel3 = document.getElementById("clear_carousel3");

const carousel_items1 = document.getElementById("carousel_items1");
const carousel_items2 = document.getElementById("carousel_items2");
const carousel_items3 = document.getElementById("carousel_items3");

carousel_items1.style.display = "none";
carousel_items2.style.display = "none";
carousel_items3.style.display = "none"; 

container1.style.display = "none";
container2.style.display = "none";
container3.style.display = "none";

clear_carousel1.style.display = "none";
clear_carousel2.style.display = "none";
clear_carousel3.style.display = "none";

//////////////////////////////////////////////////
input1.addEventListener("change", function () {
const file = input1.files[0];
if (file) {
 selectedFile1 = file;
 //preview.src = URL.createObjectURL(file);
 fileName1.textContent = input1.files[0].name;      
   }
});

input2.addEventListener("change", function () {
const file = input2.files[0];
if (file) {
selectedFile2 = file;
//preview.src = URL.createObjectURL(file);
fileName2.textContent = input2.files[0].name;      
   }
});

input3.addEventListener("change", function () {
const file = input3.files[0];
if (file) {
selectedFile3 = file;
//preview.src = URL.createObjectURL(file);
fileName3.textContent = input3.files[0].name;      
   }
});

//////////////////////////////////////////////////////////////////
function clearCarousel(num){ 
 if(num == 1){
   carousel_items1.innerHTML = '';
   clear_carousel1.style.display = "none"; 
   carousel_items1.style.display = "none";
 }
 else if(num == 2){
   carousel_items2.innerHTML = '';
   clear_carousel2.style.display = "none"; 
   carousel_items2.style.display = "none";
 }
 else if(num == 3){
   carousel_items3.innerHTML = '';
   clear_carousel3.style.display = "none";  
   carousel_items3.style.display = "none"; 
 }           
}

//////////////////////////////////////////////////////////////
function displayCarousel(books,num) {

//before populating the carousel      
if(num==1){
  carousel_items1.style.display = "block";            
  fileName1.textContent = '';      
  carousel_items1.innerHTML = '';  //clear carousel content
  clear_carousel1.style.display = "block";
}
else if(num==2){
  carousel_items2.style.display = "block";            
  fileName2.textContent = '';      
  carousel_items2.innerHTML = ''; 
  clear_carousel2.style.display = "block";
}
else if(num==3){
  carousel_items3.style.display = "block";            
  fileName3.textContent = '';      
  carousel_items3.innerHTML = '';
  clear_carousel3.style.display = "block";
}      


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

  
   
  if(num==1) { carousel_items1.appendChild(item); } 
  else if(num==2) { carousel_items2.appendChild(item);}
  else if(num==3) {carousel_items3.appendChild(item);}
 });
}


async function sendImage(num) {
  //carousel needs to be empty
  if(num==1) document.getElementById("carousel_items1").innerHTML = "";
  else if(num==2)  document.getElementById("carousel_items2").innerHTML = "";
  else if(num==3)  document.getElementById("carousel_items3").innerHTML = "";
         
  // taking a photo is compulsory..      
  if (num==1 && !selectedFile1) {
   alert("Please take a photo first.");
   return;
  }
  else if (num==2 && !selectedFile2) {
   alert("Please take a photo first.");
   return;
  }
  else if (num==3 && !selectedFile3) {
   alert("Please take a photo first.");
   return;
  }       
      
  // Update status
  if(num==1) document.getElementById("status1").textContent = "⏳ Processing...";
  else if(num==2) document.getElementById("status2").textContent = "⏳ Processing..."; 
  else if(num==3) document.getElementById("status3").textContent = "⏳ Processing...";      
      
  try 
  {
   const formData = new FormData();
   if(num==1) formData.append("image", selectedFile1);
   else if(num==2) formData.append("image", selectedFile2);
   else if(num==3) formData.append("image", selectedFile3);
       
   const response = await fetch("https://www.yvclib1.xyz/ocr/process", {
      method: "POST",
      body: formData
    });
   
    const data = await response.json(); 
    let list_books = [];
    list_books.push(data);
    
   
    //displayCarousel(list_books,num);  
    const list_items = list_books[0]["sorted"];
    if(num==1 && list_items.length==0){
       document.getElementById("status1").textContent = "❌ The query failed.."; 
       return;
    }
    else  if(num==2 && list_items.length==0){
     document.getElementById("status2").textContent = "❌ The query failed.."; 
     return;
    }
    if(num==3 && list_items.length==0){
       document.getElementById("status3").textContent = "❌ The query failed.."; 
       return;
    } 
          
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
    
    displayCarousel(books,num);      
          
    if (!response.ok) {  
      console.log("eeeeeeeeeeeeeeeeee=" + response.statusText);
      throw new Error("Server error: " + response.statusText);
    }

    //if the book check was not clean of errors      
    if(num==1 && list_books[0]["existing_swaps"] == 1){
     document.getElementById("status1").textContent = "❌ The right book order should be:";     
    }else if(num==1){
     document.getElementById("status1").textContent = "✅ No misplaced books have been found!";
    }
    else if(num==2 && list_books[0]["existing_swaps"] == 1){
     document.getElementById("status2").textContent = "❌ The right book order should be:";     
    }else if(num==2){
     document.getElementById("status2").textContent = "✅ No misplaced books have been found!";
    }  
    else if(num==3 && list_books[0]["existing_swaps"] == 1){
     document.getElementById("status3").textContent = "❌ The right book order should be:";     
    }else if(num==3){
     document.getElementById("status3").textContent = "✅ No misplaced books have been found!";
    }       

  }
  catch(error)  {    console.log("xxxxxxxx=" + error);  }        
}
