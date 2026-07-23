// Loads data/content.json and fills in the editable parts of the page.
// This is what makes the Decap CMS edits (in /admin) show up on the live site —
// the CMS only ever edits data/content.json, never the HTML itself.

fetch('data/content.json?_=' + Date.now())
  .then((res) => res.json())
  .then((data) => {
    setText('hero-badge', data.hero.badge);
    setText('hero-line1', data.hero.line1);
    setText('hero-line2', data.hero.line2);
    setText('hero-highlight', data.hero.highlight);
    setText('hero-subtext', data.hero.subtext);
    setText('hero-cta', data.hero.cta_text);
    setBackground('hero-image', data.hero.hero_image);

    setSrc('about-portrait', data.about.portrait);
    setText('about-heading', data.about.heading);
    setText('about-paragraph1', data.about.paragraph1);
    setText('about-paragraph2', data.about.paragraph2);
    setText('about-quote', data.about.quote);

    renderGallery(data.gallery);
    renderReviews(data.reviews);

    setHref('contact-phone-link', data.contact.phone_link);
    setText('contact-phone-display', data.contact.phone_display);
    setHref('contact-email-link', 'mailto:' + data.contact.email);
    setText('contact-email-display', data.contact.email);
    setHref('contact-instagram-link', data.contact.instagram_url);
    setText('contact-instagram-handle', data.contact.instagram_handle);
    setHref('contact-facebook-link', data.contact.facebook_url);
    setText('contact-facebook-label', data.contact.facebook_label);

    setText('footer-tagline', data.footer_tagline);
  })
  .catch((err) => console.error('Could not load site content:', err));

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value != null) el.textContent = value;
}

function setSrc(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.src = value;
}

function setBackground(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.style.backgroundImage = `url("${value}")`;
}

function setHref(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.href = value;
}

function renderGallery(items) {
  const grid = document.getElementById('gallery-grid');
  if (!grid || !items) return;
  grid.innerHTML = items
    .map(
      (item) => `
      <div class="lift" style="break-inside:avoid;margin-bottom:18px;border-radius:16px;overflow:hidden;border:6px solid #fff;box-shadow:0 12px 26px rgba(43,33,24,.12);">
        <img src="${item.image}" alt="${escapeHtml(item.alt || '')}" style="width:100%;display:block;">
      </div>`
    )
    .join('');
}

function renderReviews(items) {
  const grid = document.getElementById('reviews-grid');
  if (!grid || !items) return;
  grid.innerHTML = items
    .map(
      (item) => `
      <div style="background:#fff;border-radius:20px;padding:30px 28px;box-shadow:0 12px 26px rgba(31,77,67,.14);">
        <div style="color:#FFC83D;font-size:18px;letter-spacing:2px;margin-bottom:14px;">★★★★★</div>
        <p style="font-size:16px;line-height:1.7;color:#3f3526;margin-bottom:22px;">${escapeHtml(item.quote || '')}</p>
        <div style="font-weight:700;color:#2B2118;">${escapeHtml(item.name || '')}</div>
        <div style="font-size:13.5px;color:#8a7c63;">${escapeHtml(item.context || '')}</div>
      </div>`
    )
    .join('');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
