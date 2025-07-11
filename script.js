document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const input = document.getElementById('imageInput');
  const file = input.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('file', file);
  document.getElementById('prediction').innerText = "Predicting...";
  document.getElementById('preview').style.display = "block";
  document.getElementById('preview').src = URL.createObjectURL(file);
  try {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    document.getElementById('prediction').innerText = `Prediction: ${result.class}`;
  } catch (error) {
    document.getElementById('prediction').innerText = "Error predicting image.";
    console.error(error);
  }
});