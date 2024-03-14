const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const socket = io('http://localhost:2207'); // Replace with your server address if different

// Drawing Logic
function drawSquare(x, y) {
    ctx.fillRect(x, y, 5, 5); // Draw a 5x5 square 
}

// Socket Event Listener
socket.on('coordinates', (data) => {
    drawSquare(data.x, data.y);
});

const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
    const dataUrl = canvas.toDataURL("image/png").replace(/^data:image\/\w+;base64,/, '');
    window.electronAPI.saveImage(dataUrl, 'test.png');
});