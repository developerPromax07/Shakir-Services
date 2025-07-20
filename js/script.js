// js/script.js
fetch('images/manifest.json')
  .then(res => res.json())
  .then(products => init(products))
  .catch(err => console.error('Failed to load manifest:', err));

function init(products) {
  let productIndex = 0;
  let galleryIndex = 0;

  const topImg = document.getElementById('top-image');
  const bottomImg = document.getElementById('bottom-image');
  const infoBox = document.getElementById('product-info');
  const topPrev = document.getElementById('top-prev');
  const topNext = document.getElementById('top-next');
  const bottomPrev = document.getElementById('bottom-prev');
  const bottomNext = document.getElementById('bottom-next');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');

  function updateView() {
    const product = products[productIndex];

    // Update main (top) image
    topImg.src = `images/${product.main}`;

    // Update gallery (bottom) image
    bottomImg.src = `images/${product.gallery[galleryIndex]}`;

    // Update product details
    infoBox.innerHTML = '<ul>' + Object.entries(product.details)
      .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)  
      .join('') + '</ul>';

    // Disable/enable top arrows at bounds
    topPrev.disabled = productIndex === 0;
    topNext.disabled = productIndex === products.length - 1;
    topPrev.classList.toggle('disabled', topPrev.disabled);
    topNext.classList.toggle('disabled', topNext.disabled);

    // Disable/enable bottom arrows at bounds
    bottomPrev.disabled = galleryIndex === 0;
    bottomNext.disabled = galleryIndex === product.gallery.length - 1;
    bottomPrev.classList.toggle('disabled', bottomPrev.disabled);
    bottomNext.classList.toggle('disabled', bottomNext.disabled);
  }

  function showGallery() {
    const gallery = products[productIndex].gallery;
    modalContent.innerHTML = '';
    gallery.forEach(file => {
      const img = document.createElement('img');
      img.src = `images/${file}`;
      modalContent.appendChild(img);
    });
    modal.style.display = 'flex';
  }

  // Top arrows change product, reset gallery index
  topPrev.addEventListener('click', () => {
    if (productIndex > 0) {
      productIndex--;
      galleryIndex = 0;
      updateView();
    }
  });
  topNext.addEventListener('click', () => {
    if (productIndex < products.length - 1) {
      productIndex++;
      galleryIndex = 0;
      updateView();
    }
  });

  // Bottom arrows only change gallery for current product
  bottomPrev.addEventListener('click', () => {
    if (galleryIndex > 0) {
      galleryIndex--;
      updateView();
    }
  });
  bottomNext.addEventListener('click', () => {
    if (galleryIndex < products[productIndex].gallery.length - 1) {
      galleryIndex++;
      updateView();
    }
  });

  // Click on images to open modal gallery
  topImg.addEventListener('click', showGallery);
  bottomImg.addEventListener('click', showGallery);

  // Modal close handlers
  document.getElementById('modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Section toggles
  document.getElementById('btn-products').addEventListener('click', () => selectSection('products'));
  document.getElementById('btn-about').addEventListener('click', () => selectSection('about'));
  function selectSection(name) {
    document.getElementById('btn-products').classList.toggle('active', name === 'products');
    document.getElementById('btn-about').classList.toggle('active', name === 'about');
    document.getElementById('products-section').classList.toggle('active', name === 'products');
    document.getElementById('about-section').classList.toggle('active', name === 'about');
  }

  // Initialize view
  updateView();
}
