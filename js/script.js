// js/script.js
fetch('images/manifest.json')
  .then(res => res.json())
  .then(products => init(products))
  .catch(err => console.error('Failed to load manifest:', err));

function init(products) {
  let productIndex = 0;
  let angleIndex = 0;

  const topPrev = document.getElementById('top-prev');
  const topNext = document.getElementById('top-next');
  const bottomPrev = document.getElementById('bottom-prev');
  const bottomNext = document.getElementById('bottom-next');
  const topImg = document.getElementById('top-image');
  const bottomImg = document.getElementById('bottom-image');
  const infoBox = document.getElementById('product-info');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');

  function updateMain() {
    const prod = products[productIndex];
    topImg.src = `images/${prod.main}`;
    topPrev.disabled = productIndex === 0;
    topNext.disabled = productIndex === products.length - 1;
    topPrev.classList.toggle('disabled', topPrev.disabled);
    topNext.classList.toggle('disabled', topNext.disabled);
  }

  function updateGallery() {
    const prod = products[productIndex];
    bottomImg.src = `images/${prod.gallery[angleIndex]}`;
    infoBox.innerHTML = '<ul>' + Object.entries(prod.details)
      .map(([k,v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('') + '</ul>';
    bottomPrev.disabled = angleIndex === 0;
    bottomNext.disabled = angleIndex === prod.gallery.length - 1;
    bottomPrev.classList.toggle('disabled', bottomPrev.disabled);
    bottomNext.classList.toggle('disabled', bottomNext.disabled);
  }

  topPrev.onclick = () => { if (productIndex>0) { productIndex--; angleIndex=0; updateMain(); updateGallery(); }};
  topNext.onclick = () => { if (productIndex<products.length-1){ productIndex++; angleIndex=0; updateMain(); updateGallery(); }};
  bottomPrev.onclick = () => { if (angleIndex>0) { angleIndex--; updateGallery(); }};
  bottomNext.onclick = () => { const prod=products[productIndex]; if (angleIndex<prod.gallery.length-1){ angleIndex++; updateGallery(); }};

  [topImg, bottomImg].forEach(img => img.onclick = () => {
    const prod = products[productIndex];
    modalContent.innerHTML = '';
    [prod.main, ...prod.gallery].forEach(f => {
      const i = document.createElement('img'); i.src = `images/${f}`; modalContent.appendChild(i);
    });
    modal.style.display = 'flex';
  });

  document.getElementById('modal-close').onclick = () => modal.style.display='none';
  window.onclick = e => { if (e.target===modal) modal.style.display='none'; };

  document.getElementById('btn-products').onclick = () => selectSection('products');
  document.getElementById('btn-about').onclick    = () => selectSection('about');
  function selectSection(name) {
    document.getElementById('btn-products').classList.toggle('active', name==='products');
    document.getElementById('btn-about').classList.toggle('active',    name==='about');
    document.getElementById('products-section').classList.toggle('active',name==='products');
    document.getElementById('about-section').classList.toggle('active',   name==='about');
  }

  updateMain(); updateGallery();
}
