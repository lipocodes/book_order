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

    async function sendImage() {
      const table = document.getElementById("resultTable");
      table.innerHTML = ""; 
      if (!selectedFile) {
        alert("Please take a photo first.");
        return;
      }
 
      document.getElementById("status").textContent = "⏳ Sending image to server...";

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {




      } catch (error) {
        document.getElementById("status").textContent = "❌ Error: " + error.message;
      }
    }
