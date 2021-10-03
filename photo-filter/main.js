const input = document.querySelectorAll('input');
const output = document.getElementsByName('result');
const img = document.querySelector('img');
const btnReset = document.querySelector('.btn-reset');
const btnNext = document.querySelector('.btn-next');
const btnLoad = document.querySelector('#btnInput');
const btnSave = document.querySelector('.btn-save');
const filterbloc = document.querySelector('.filters');
const fullscreen = document.querySelector('.fullscreen');
let reader = new FileReader();
let url = '';
let counterImg = 1;
let blurs = '0';
let invert ='0%';
let sepia ='0%';
let saturate ='100%';
let hue = '0deg';

filterbloc.addEventListener('input', ev => {
  ev.path[1].children[1].value = ev.target.value;
  if(ev.target.name === 'blur') {
    blurs = ev.target.value;
    img.style.setProperty('--blur',blurs + 'px');
  }
  if(ev.target.name === 'invert') {
    invert = `${ev.target.value}%`;
    img.style.setProperty('--invert',invert);
  }
  if(ev.target.name === 'sepia') {
    sepia = `${ev.target.value}%`;
    img.style.setProperty('--sepia', sepia);
  }
  if(ev.target.name === 'saturate')  {
    saturate = `${ev.target.value}%`
    img.style.setProperty('--saturate', saturate);
  }
  if(ev.target.name === 'hue') {
    hue = `${ev.target.value}deg`
    img.style.setProperty('--hue', hue);
  }
});

const reset = (event) => {
  AddClassActive(event);
  blurs = '0';
  invert ='0%';
  sepia ='0%';
  saturate ='100%';
  hue = '0deg';
  img.setAttribute('style','')
  input.forEach((element,i) => {
    if(element.hasAttribute('value')) {
      if(element.name === 'saturate') {
        element.value = 100;
        output[i].value = 100;
        } else {
          output[i].value = '0';
          element.value = '0';
        }
      }
    });
  }

function AddClassActive(even) {
  let active = document.querySelector('.btn-active');
  if(!even.target.classList.contains('btn-active')) {
    even.target.classList.add('btn-active');
    active.classList.remove('btn-active');
  }
}

const nextPicture =(event)=> {
  AddClassActive(event);
  let time= new Date();
  let timeDay = '';
  let hour = time.getHours();
  let minut=time.getMinutes();
  if(hour >= 6 && hour <= 11 && minut <= 59) timeDay='morning';
  if(hour >= 12 && hour <= 17 && minut <= 59) timeDay='day';
  if(hour >= 18 && hour <= 23 && minut <= 59) timeDay='evening';
  if(hour >= 0 && hour <= 5 && minut <= 59) timeDay='night ';
  if (counterImg > 20) counterImg = 1;
  if (counterImg < 10) {
    url =  `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeDay}/0${counterImg}.jpg`;
  } else {
    url =  `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeDay}/${counterImg}.jpg`;
  }
  img.src=url;
  img.setAttribute('crossOrigin','anonymous');
  counterImg++;
}

btnLoad.addEventListener('change', ev => {
  reader.readAsDataURL(ev.target.files[0]);
  btnLoad.value='';
});

reader.onload = function() {
  img.setAttribute('src',reader.result.toString());
  
};

const saveImage = (event) => {
  AddClassActive(event);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext("2d");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  sizeDifference = img.naturalHeight/ img.height;
  ctx.filter=`blur(${blurs*sizeDifference}px) invert(${invert}) sepia(${sepia}) saturate(${saturate}) hue-rotate(${hue})`;
  ctx.drawImage(img, 0, 0);
  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
  if (document.exitFullscreen) {
      document.exitFullscreen();
    } 
  }
}

fullscreen.addEventListener('click',toggleFullScreen);
btnSave.addEventListener('click', saveImage);
btnReset.addEventListener('click', reset);
btnNext.addEventListener('click', nextPicture);

