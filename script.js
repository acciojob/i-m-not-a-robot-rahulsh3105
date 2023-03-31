const images = [  'https://picsum.photos/150/150',  'https://picsum.photos/151/151',  'https://picsum.photos/152/152',  'https://picsum.photos/153/153',  'https://picsum.photos/154/154'];

let selectedTiles = [];
let verifyBtn = document.getElementById('verify');
let resetBtn = document.getElementById('reset');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderTiles() {
  const tileContainer = document.getElementById('tile-container');
  shuffleArray(images);

  images.forEach((image, index) => {
    const tile = document.createElement('img');
    tile.src = image;
    tile.classList.add(`img${index + 1}`);
    tileContainer.appendChild(tile);
    tile.addEventListener('click', () => handleTileClick(tile));
  });
}

function resetTiles() {
  selectedTiles = [];
  renderTiles();
  verifyBtn.classList.add('hidden');
  resetBtn.classList.add('hidden');
}

function handleTileClick(tile) {
  if (selectedTiles.length < 2 && !selectedTiles.includes(tile)) {
    selectedTiles.push(tile);
    tile.classList.add('selected');
  }

  if (selectedTiles.length === 2) {
    if (selectedTiles[0].classList[0] === selectedTiles[1].classList[0]) {
      verifyBtn.classList.remove('hidden');
    } else {
      resetBtn.classList.remove('hidden');
    }
  }
}

function verifySelection() {
  if (selectedTiles[0].classList[0] === selectedTiles[1].classList[0]) {
    document.getElementById('para').innerText = 'You are a human. Congratulations!';
  } else {
    document.getElementById('para').innerText = 'We can\'t verify you as a human. You selected the non-identical tiles.';
  }

  verifyBtn.classList.add('hidden');
  resetBtn.classList.remove('hidden');
  selectedTiles = [];
}

resetBtn.addEventListener('click', resetTiles);
verifyBtn.addEventListener('click', verifySelection);

renderTiles();
