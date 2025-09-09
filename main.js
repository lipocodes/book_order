let num_input = 0;
let selectedFile1 = null;
let selectedFile2 = null;
let selectedFile3 = null;

const input1 = document.getElementById("cameraInput1");
const input2 = document.getElementById("cameraInput2");
const input3 = document.getElementById("cameraInput3");
const preview1 = document.getElementById("preview1");
const preview2 = document.getElementById("preview2");
const preview3 = document.getElementById("preview3");

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

clear_carousel1.style.display = "none";
clear_carousel2.style.display = "none";
clear_carousel3.style.display = "none";

//////////////////////////////////////////////////
input1.addEventListener("change", function () {  
const file = input1.files[0];   
if (file) {
alert("xxxxxxxxxxxx");	
resultBox1.style.display = "none";	
selectedFile1 = file;
preview1.src = URL.createObjectURL(file);
fileName1.textContent = input1.files[0].name;      
   }
});

input2.addEventListener("change", function () {
const file = input2.files[0];
if (file) {
selectedFile2 = file;
preview2.src = URL.createObjectURL(file);
fileName2.textContent = input2.files[0].name;      
   }
});

input3.addEventListener("change", function () {
const file = input3.files[0];
if (file) {
selectedFile3 = file;
preview3.src = URL.createObjectURL(file);
fileName3.textContent = input3.files[0].name;      
   }
});

//////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  
  const preview1 = document.getElementById("preview1");
  const modal1 = document.getElementById("imgModal1");
  const modalImg1 = document.getElementById("modalImg1");
  const closeBtn1 = document.getElementById("closeBtn1");
  // ensure modal is hidden on page load
  modal1.style.display = "none"; 

  const preview2 = document.getElementById("preview2");
  const modal2 = document.getElementById("imgModal2");
  const modalImg2 = document.getElementById("modalImg2");
  const closeBtn2 = document.getElementById("closeBtn2");
  // ensure modal is hidden on page load
  modal2.style.display = "none";

  const preview3 = document.getElementById("preview3");
  const modal3 = document.getElementById("imgModal3");
  const modalImg3 = document.getElementById("modalImg3");
  const closeBtn3 = document.getElementById("closeBtn3");
  // ensure modal is hidden on page load
  modal3.style.display = "none";  

  // Open modal on click/tap
  preview1.addEventListener("click", () => {
    modal1.style.display = "flex";
    modalImg1.src = preview1.src;
  });
  preview2.addEventListener("click", () => {
    modal2.style.display = "flex";
    modalImg2.src = preview2.src;
  }); 
  preview3.addEventListener("click", () => {
    modal3.style.display = "flex";
    modalImg3.src = preview3.src;
  }); 

  // Close modal with the X button
  closeBtn1.addEventListener("click", () => {
    modal1.style.display = "none";
  });
  closeBtn2.addEventListener("click", () => {
    modal2.style.display = "none";
  }); 
  closeBtn3.addEventListener("click", () => {
    modal3.style.display = "none";
  });  

  // Close modal by tapping outside the image
  modal1.addEventListener("click", (e) => {
    if (e.target === modal1) {
      modal1.style.display = "none";
    }
  });
  modal2.addEventListener("click", (e) => {
    if (e.target === modal2) {
      modal2.style.display = "none";
    }
  });
  modal3.addEventListener("click", (e) => {
    if (e.target === modal3) {
      modal3.style.display = "none";
    }
  }); 
   
});

//////////////////////////////////////////////////////////////////
function clearCarousel(num){ 
 if(num == 1){
   carousel_items1.innerHTML = '';
   resultBox1.style.display = "none";
 }
 else if(num == 2){
   carousel_items2.innerHTML = '';
   clear_carousel2.style.display = "none"; 
   carousel_items2.style.display = "none";
 }
 else if(num == 3){
   carousel_items3.innerHTML = '';
   clear_carouse3.style.display = "none";  
   carousel_items3.style.display = "none"; 
 }           
}

//////////////////////////////////////////////////////////////
function displayCarousel(books,num) {

//before populating the carousel      
if(num==1){
 carousel_items1.style.display = "flex";
 carousel_items1.style.flexDirection = "row";
 carousel_items1.style.gap = "8px";
 carousel_items1.style.height = "100px";
 carousel_items1.style.alignItems = "stretch";
 
  fileName1.textContent = '';      
  carousel_items1.innerHTML = '';  
  clear_carousel1.style.display = "block";
}
else if(num==2){
  carousel_items2.style.display = "block";
  carousel_items2.style.display = "flex";
  carousel_items2.style.flexDirection = "row";  
  carousel_items2.style.gap = "8px";
  carousel_items2.style.height = "100px";
  carousel_items2.style.alignItems = "stretch";
 
  fileName2.textContent = '';      
  carousel_items2.innerHTML = ''; 
  clear_carousel2.style.display = "block";
}
else if(num==3){
  carousel_items3.style.display = "block"; 
  carousel_items3.style.display = "flex";
  carousel_items3.style.flexDirection = "row";  
  carousel_items3.style.gap = "8px";
  carousel_items3.style.height = "100px";
  carousel_items1.style.alignItems = "stretch";
  
 fileName3.textContent = '';      
  carousel_items3.innerHTML = '';
  clear_carousel3.style.display = "block";
}      


books.forEach(book => {
  const item = document.createElement('div');
  item.className = 'carousel-item';
  item.style.backgroundColor = "#800080";
  item.style.color = "white";
  item.style.padding = "10px";
  item.style.boxSizing = "border-box";

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
   ("Please take a photo first.");
   return;
  }
  else if (num==2 && !selectedFile2) {
   ("Please take a photo first.");
   return;
  }
  else if (num==3 && !selectedFile3) {
   ("Please take a photo first.");
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

   let data; 
   let response1,response2,response3;
   
   //we need each <input> to have its separate fetch() operation
   if(num==1){
     response1 = await fetch("https://www.yvclib.org/ocr/process", {
      method: "POST",
      body: formData
    });
      
    data = await response1.json();  
    console.log("aaa=" + data.toString());  
   }
   else if(num==2){
     response2 = await fetch("https://www.yvclib.org/ocr/process", {
      method: "POST",
      body: formData
    });
    data = await response2.json(); 
    console.log("bbb=" + data.toString());     
   }
   else if(num==3){
      response3 = await fetch("https://www.yvclib.org/ocr/process", {
      method: "POST",
      body: formData
    });
    data = await response3.json();
    console.log("ccc=" + data.toString());    
   }
       
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
          
    if (response1 && !response1.ok) {  
      throw new Error("Server error: " + response1.statusText);
    }
    else if (response2 && !response2.ok) {  
      throw new Error("Server error: " + response2.statusText);
    }
    else if (response3 && !response3.ok) {  
      throw new Error("Server error: " + response3.statusText);
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
  catch(error)  {console.log("eeeeeeeeeeeee=" + error)  }        
}
