    let selectedFile = null;

    const input = document.getElementById("cameraInput");
    const gallerySelection = document.getElementById("gallerySelection");
    const preview = document.getElementById("preview");
    const resultBox = document.getElementById("result");


    input.addEventListener("change", function () {
      const file = input.files[0];
      if (file) {
        selectedFile = file;
        preview.src = URL.createObjectURL(file);
      }
    });

    gallerySelection.addEventListener("change", function () {
      const file = gallerySelection.files[0];
      if (file) {
        selectedFile = file;
        preview.src = URL.createObjectURL(file);
      }
    });

    async function sendImage() {
        ////////////////////////////////////////////////////////////////////
        const books = [
        { dewey: '001.94', title: 'Mysteries of the Unknown' },
        { dewey: '303.49', title: 'Societies in Change' },
        { dewey: '500', title: 'General Science' },
        { dewey: '641.5', title: 'The Art of Cooking' },
        { dewey: '910', title: 'World Explorers' },
        { dewey: '398.2', title: 'Folk Tales and Fables' },
        { dewey: '796', title: 'The Science of Sport' }
      ];

       displayCarousel(books);
        return;
       //////////////////////////////////////////////////////////////////////

        
      const table = document.getElementById("resultTable");
      table.innerHTML = ""; 
      if (!selectedFile) {
        alert("Please take a photo first.");
        return;
      }

      // Update status
      document.getElementById("status").textContent = "⏳ Sending image to server...";

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch("https://www.yvclib1.xyz/ocr/process", {
          method: "POST",
          body: formData
        });

        if (!response.ok) {
          throw new Error("Server error: " + response.statusText);
        }

   
        const json = await response.json();

        if (json.sorted) {
          // Extract the list inside the JSON object
          let res = JSON.stringify(json);
          const pos1 = res.indexOf('[');
          const pos2 = res.indexOf(']') + 1;
          res = res.substring(pos1, pos2);
          const list_books = JSON.parse(res);

          // Clear previous table rows
          const table = document.getElementById("resultTable");
          table.innerHTML = "";

          // Create table header
          const headerRow = document.createElement("tr");
          const headerTitle = document.createElement("th");
          headerTitle.textContent = "Title";
          const headerDewey = document.createElement("th");
          headerDewey.textContent = "Dewey";
          headerRow.appendChild(headerTitle);
          headerRow.appendChild(headerDewey);
          table.appendChild(headerRow);

          // Loop over the list & extract titles & Dewey numbers
          for (let i = 0; i < list_books.length; i++) {
            const pos = list_books[i].indexOf('^^^');
            if (pos >= 0) {
              try {
                const title = list_books[i].substr(0, pos);
                const dewey = list_books[i].substr(pos + 3);

                const row = document.createElement("tr");

                const cell1 = document.createElement("td");
                cell1.textContent = title;

                const cell2 = document.createElement("td");
                cell2.textContent = dewey;

                row.appendChild(cell1);
                row.appendChild(cell2);
                table.appendChild(row);
              } catch (e) {
                console.log("Error:", e.toString());
              }
            }
          }
         document.getElementById("status").textContent = "✅ The right book order ahould be:";
        } 

      } catch (error) {
        document.getElementById("status").textContent = "❌ Error: " + error.message;
      }
    }
