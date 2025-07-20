fetch('images/manifest.json')
  .then(res => res.json())
  .then(products => init(products))
  .catch(err => console.error('Failed to load manifest:', err));

function init(products) {
  let currentIndex = 0;
  const topImg = document.getElementById('top-image');
  const bottomImg = document.getElementById('bottom-image');
  const infoBox = document.getElementById('product-info');
  const prevButtons = document.querySelectorAll('.prev');
  const nextButtons = document.querySelectorAll('.next');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');

  function updateView() {
    const product = products[currentIndex];
    topImg.src = `images/${product.main}`;
    bottomImg.src = `images/${product.main}`;
    // details
    infoBox.innerHTML = '<ul>' + Object.entries(product.details)
      .map(([k,v]) => `<li><strong>${k}:</strong> ${v}</li>`)
      .join('') + '</ul>';
    // disable arrows at bounds
    prevButtons.forEach(btn => btn.disabled = currentIndex === 0);
    nextButtons.forEach(btn => btn.disabled = currentIndex === products.length - 1);
    prevButtons.forEach(btn => btn.classList.toggle('disabled', currentIndex === 0));
    nextButtons.forEach(btn => btn.classList.toggle('disabled', currentIndex === products.length - 1));
  }

  function showGallery() {
    const gallery = products[currentIndex].gallery;
    modalContent.innerHTML = '';
    gallery.forEach(file => {
      const img = document.createElement('img');
      img.src = `images/${file}`;
      modalContent.appendChild(img);
    });
    modal.style.display = 'flex';
  }

  // attach handlers
  prevButtons.forEach(btn => btn.addEventListener('click', () => {
    if (currentIndex > 0) { currentIndex--; updateView(); }
  }));
  nextButtons.forEach(btn => btn.addEventListener('click', () => {
    if (currentIndex < products.length - 1) { currentIndex++; updateView(); }
  }));

  [topImg, bottomImg].forEach(img =>
    img.addEventListener('click', showGallery)
  );

  document.getElementById('modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // section toggles
  document.getElementById('btn-products').addEventListener('click', () => selectSection('products'));
  document.getElementById('btn-about').addEventListener('click', () => selectSection('about'));
  function selectSection(name) {
    document.getElementById('btn-products').classList.toggle('active', name==='products');
    document.getElementById('btn-about').classList.toggle('active', name==='about');
    document.getElementById('products-section').classList.toggle('active', name==='products');
    document.getElementById('about-section').classList.toggle('active',    name==='about');
  }

  updateView();
}
