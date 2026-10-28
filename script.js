// Mobile menu
const menu = document.getElementById('menu');
document.getElementById('menu-btn').onclick = () => menu.classList.toggle('open');
menu.querySelectorAll('a').forEach(a => a.onclick = () => menu.classList.remove('open'));

// Typing effect
const roles = ['Web Developer', 'Creative Thinker', 'Lifelong Learner'];
let r = 0, c = 0, deleting = false;
const typed = document.getElementById('typed');
function type() {
  const word = roles[r];
  typed.textContent = word.substring(0, c);
  if (!deleting && c < word.length) c++;
  else if (!deleting) { deleting = true; setTimeout(type, 1200); return; }
  else if (c > 0) c--;
  else { deleting = false; r = (r + 1) % roles.length; }
  setTimeout(type, deleting ? 50 : 100);
}
type();

// Navbar shadow + back-to-top button
const navbar = document.getElementById('navbar');
const topBtn = document.getElementById('top-btn');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  topBtn.classList.toggle('show', window.scrollY > 400);
});
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Reveal sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contact form check
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const text = document.getElementById('message').value.trim();
  if (!name || !email || !text) {
    msg.style.color = 'crimson';
    msg.textContent = 'Please fill in all fields.';
    return;
  }
  msg.style.color = 'green';
  msg.textContent = 'Thank you, ' + name + '! Your message was received.';
  e.target.reset();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
