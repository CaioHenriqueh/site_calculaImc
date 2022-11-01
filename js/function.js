var header = document.getElementById("header");
var navigationHeader = document.getElementById("navigation_header");
var content = document.querySelector(".content");
var showSidebar = false;
const menulinks = document.querySelectorAll('.navigation_header a[href^="#"]');
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");
const btn = document.getElementById("btnimc");
const mensagem = document.getElementById("mensagem");
const imclog = document.getElementById("imc");
const form = document.querySelector("form");
const fields = document.querySelectorAll("[required]");

function toggleSidebar() {
  showSidebar = !showSidebar;
  if (showSidebar) {
    navigationHeader.style.marginLeft = "-10vw";
    navigationHeader.style.animationName = "showSidebar";
    content.style.filter = "blur(2px)";
  } else {
    navigationHeader.style.marginLeft = "-100vw";
    navigationHeader.style.animationName = "";
    content.style.filter = "";
  }
}
function closeSidebar() {
  if (showSidebar) {
    showSidebar = true;
    toggleSidebar();
  }
}
window.addEventListener("resize", function (event) {
  if (window.innerWidth > 768 && showSidebar) {
    showSidebar = true;
    toggleSidebar();
  }
});

function calculaImc(peso, altura) {
  return peso / (altura * altura);
}
btnimc.addEventListener("click", function () {
  let imc = calculaImc(peso.value, altura.value).toFixed(2);
  if (peso.value === "" || altura.value === "") {
    mensagem.textContent = "";
    imclog.textContent = "";
  } else {
    mensagem.textContent = `Seu Imc é: `;
    imclog.textContent = ` ${imc}`;
    form.reset();
  }
});
function getDistanceFromTheTop(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}
function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
  smoothScrollTo(0, distanceFromTheTop);
}

menulinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60);
}

