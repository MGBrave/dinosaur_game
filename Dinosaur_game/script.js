const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 140) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 25;
          dino.style.bottom = position + 'px';
        }
      }, 25);
    } else {
      // Subindo
      position += 28;
      dino.style.bottom = position + 'px';
    }
  }, 25);
}

function createTree() {
  const tree = document.createElement('div');
  let treePosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  tree.classList.add('tree');
  background.appendChild(tree);
  tree.style.left = treePosition + 'px';

  let leftTimer = setInterval(() => {
    if (treePosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(tree);
    } else if (treePosition > 0 && treePosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">GAME OVER</h1>';
    } else {
      treePosition -= 20;
      tree.style.left = treePosition + 'px';
    }
  }, 25);

  setTimeout(createTree, randomTime);
}

createTree();
document.addEventListener('keyup', handleKeyUp);
