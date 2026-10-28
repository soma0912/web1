const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Mobile menu
const menu = $('#menu');
$('#menu-btn').onclick = () => menu.classList.toggle('open');
$$('#menu a').forEach(a => a.onclick = () => menu.classList.remove('open'));

// Typing effect
const roles = ['Web Developer', 'Frontend Designer', 'Creative Coder'];
let r = 0, c = 0, deleting = false;
function type() {
  const word = roles[r];
  $('#typed').textContent = word.substring(0, c);
  if (!deleting && c < word.length) c++;
  else if (!deleting) { deleting = true; setTimeout(type, 1200); return; }
  else if (c > 0) c--;
  else { deleting = false; r = (r + 1) % roles.length; }
  setTimeout(type, deleting ? 50 : 100);
}
type();

// Scroll: progress bar, navbar shadow, back-to-top, active link
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  $('#progress').style.width = (window.scrollY / h * 100) + '%';
  $('#navbar').classList.toggle('scrolled', window.scrollY > 20);
  $('#top-btn').classList.toggle('show', window.scrollY > 400);
  let current = 'home';
  $$('section[id]').forEach(s => { if (window.scrollY >= s.offsetTop - 150) current = s.id; });
  $$('#menu a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});
$('#top-btn').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Number counter
function runCount(el) {
  const target = +el.dataset.target;
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 50));
  const t = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(t); }
    el.textContent = n;
  }, 30);
}

// Reveal sections, fill skill bars, start counters
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    e.target.querySelectorAll('.bar span').forEach(b => b.style.width = b.dataset.level + '%');
    e.target.querySelectorAll('.count').forEach(runCount);
    observer.unobserve(e.target);
  });
}, { threshold: 0.15 });
$$('.reveal').forEach(el => observer.observe(el));

// 3D tilt on photo (mouse)
const tilt = $('#tilt'), frame = $('.frame');
tilt.addEventListener('mousemove', e => {
  const b = tilt.getBoundingClientRect();
  const x = (e.clientX - b.left) / b.width - 0.5;
  const y = (e.clientY - b.top) / b.height - 0.5;
  frame.style.transform = 'rotateY(' + (x * 18) + 'deg) rotateX(' + (-y * 18) + 'deg)';
});
tilt.addEventListener('mouseleave', () => frame.style.transform = '');

// Project filter
$$('.filter').forEach(btn => btn.onclick = () => {
  $$('.filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  $$('.card[data-cat]').forEach(card => {
    card.classList.toggle('hide', btn.dataset.filter !== 'all' && card.dataset.cat !== btn.dataset.filter);
  });
});

// Contact form check
$('#contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const msg = $('#form-msg');
  const name = $('#name').value.trim();
  if (!name || !$('#email').value.trim() || !$('#message').value.trim()) {
    msg.style.color = 'crimson';
    msg.textContent = 'Please fill in all fields.';
    return;
  }
  msg.style.color = 'green';
  msg.textContent = 'Thank you, ' + name + '! Your message was received.';
  e.target.reset();
});

$('#year').textContent = new Date().getFullYear();
