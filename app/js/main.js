import { $, $$ } from '@sciter';

main();

async function main() {
  console.log("main");
  adjust_window();
  console.log("ya");
  const dots = [];
  animate(dots);
}

async function animate(dots) {
  const { x: mouse_x, y: mouse_y } = await get_mouse_coords();
  const dot = { x: mouse_x, y: mouse_y, size: 8, age: 0 };
  dots.splice(0, 0, dot);
  dots.length > 50 && dots.pop();

  const canvas = $('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((dot, i) => {
    const { x, y, size, age } = dot;
    dot.age += 2;
    ctx.fillStyle = `hsl(${120 - age}, 100%, 50%)`;
    ctx.beginPath();
    ctx.ellipse(x, y, size, size, 0, 0, 360);
    ctx.fill();
    ctx.stroke();
  });
  requestAnimationFrame(animate.bind(null, dots));
}

function adjust_window() {
  const [w, h] = Window.this.screenBox('frame', 'dimension');
  document.style.width = w + 'px';
  document.style.height = h + 'px';
  $('body').style.width = w + 'px';
  $('body').style.height = h + 'px';
  $('body').innerHTML += `<canvas width="${w}" height="${h}"></canvas>`;
  Window.this.move(0, 0, w, h, true);
}

function get_mouse_coords() {
  return new Promise((resolve) => {
    Window.this.xcall('get_mouse_coords', (x, y) => resolve({ x, y }));
  });
}

document.addEventListener('keyup', function ({ code }) {
  if (code === 'KeyF1') {
    Window.this.modal({
      url: 'about/about.html'
    });
  }
  
  if (code === 'KeyESCAPE') {
    Window.this.close();
  }
});