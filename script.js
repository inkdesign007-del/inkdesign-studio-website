/*
  Analytics hook: connect Google Tag Manager / another provider by listening to
  dataLayer events. No tracking account or personal data is configured here.
*/
const track = (event, details = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...details });
};

const header = document.querySelector('.site-header');
const progress = document.querySelector('.page-progress span');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

const updateScrollState = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percentage}%`;
  header.classList.toggle('is-stuck', window.scrollY > 30);
};

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
    track('menu_toggle', { menu_open: isOpen });
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }));
}

document.querySelectorAll('[data-track]').forEach((element) => {
  element.addEventListener('click', () => track(element.dataset.track));
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');

filters.forEach((filter) => filter.addEventListener('click', () => {
  const category = filter.dataset.filter;
  filters.forEach((button) => button.classList.toggle('is-active', button === filter));
  projects.forEach((project) => {
    const visible = category === 'all' || project.dataset.category === category;
    project.classList.toggle('is-hidden', !visible);
  });
  track('portfolio_filter', { portfolio_category: category });
}));

document.querySelectorAll('.accordion-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.accordion-item');
    const isOpen = item.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
    track('faq_toggle', { faq_question: button.childNodes[0].textContent.trim(), faq_open: isOpen });
  });
});

document.querySelectorAll('[data-interest]').forEach((link) => {
  link.addEventListener('click', () => {
    const projectType = document.querySelector('[name="type"]');
    if (projectType) projectType.value = link.dataset.interest;
  });
});

const form = document.getElementById('enquiry-form');
const formStatus = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const fields = new FormData(form);
    const message = [
      'Hello InkDesign Studio, I would like to discuss a project.',
      '',
      `Name: ${fields.get('name')}`,
      `Phone / WhatsApp: ${fields.get('phone')}`,
      `Company: ${fields.get('company') || 'Not provided'}`,
      `City: ${fields.get('city')}`,
      `Project type: ${fields.get('type')}`,
      `Project stage: ${fields.get('stage')}`,
      `Notes: ${fields.get('message') || 'Not provided'}`
    ].join('\n');

    const url = `https://wa.me/918850915636?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
    formStatus.textContent = 'WhatsApp has opened with your enquiry ready to send.';
    formStatus.classList.add('is-success');
    track('enquiry_whatsapp_opened', { project_type: fields.get('type'), project_stage: fields.get('stage') });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
