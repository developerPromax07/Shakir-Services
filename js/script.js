const topProducts = [
  { src: 'images/fridge.jpg', gallery: ['images/fridge1.jpg','images/fridge2.jpg','images/fridge3.jpg','images/fridge4.jpg'] },
  { src: 'images/ac.jpg', gallery: ['images/ac1.jpg','images/ac2.jpg','images/ac3.jpg','images/ac4.jpg'] },
  { src: 'images/washing_machine.jpg', gallery: ['images/wm1.jpg','images/wm2.jpg','images/wm3.jpg','images/wm4.jpg'] }
];
const bottomProducts = topProducts;
const details = [
  { colour:'Silver', price:'₹10,000', registered:'2025-06-15', condition:'Good', warranty:'3 months', pickup:'Available' },
  { colour:'White', price:'₹8,000', registered:'2025-06-10', condition:'Excellent', warranty:'6 months', pickup:'Available' },
  { colour:'Gray', price:'₹6,000', registered:'2025-06-05', condition:'Fair', warranty:'1 month', pickup:'Pick-up only' }
];
let topIndex=0, bottomIndex=0;
const topImage=document.getElementById('top-image');
const bottomImage=document.getElementById('bottom-image');
const productInfo=document.getElementById('product-info');
const modal=document.getElementById('modal');
const modalContent=document.getElementById('modal-content');
const modalClose=document.getElementById('modal-close');
const productsSection=document.getElementById('products-section');
const aboutSection=document.getElementById('about-section');

function updateTop(){ topImage.src=topProducts[topIndex].src; }
function updateBottom(){
  bottomImage.src=bottomProducts[bottomIndex].src;
  const d=details[bottomIndex];
  productInfo.innerHTML='<ul>' +
    `<li><strong>Colour:</strong> ${d.colour}</li>`+
    `<li><strong>Price:</strong> ${d.price}</li>`+
    `<li><strong>Registered:</strong> ${d.registered}</li>`+
    `<li><strong>Condition:</strong> ${d.condition}</li>`+
    `<li><strong>Warranty:</strong> ${d.warranty}</li>`+
    `<li><strong>Pick-up:</strong> ${d.pickup}</li>`+
  '</ul>';
}
function openModal(gallery){
  modalContent.innerHTML='';
  gallery.forEach(src=>{
    const img=document.createElement('img');
    img.src=src;
    modalContent.appendChild(img);
  });
  modal.style.display='flex';
}

// Event listeners
['top','bottom'].forEach(section=>{
  document.getElementById(`${section}-prev`).addEventListener('click',()=>{
    if(section==='top') topIndex=(topIndex+topProducts.length-1)%topProducts.length, updateTop();
    else bottomIndex=(bottomIndex+bottomProducts.length-1)%bottomProducts.length, updateBottom();
  });
  document.getElementById(`${section}-next`).addEventListener('click',()=>{
    if(section==='top') topIndex=(topIndex+1)%topProducts.length, updateTop();
    else bottomIndex=(bottomIndex+1)%bottomProducts.length, updateBottom();
  });
  document.getElementById(`${section}-image`).addEventListener('click',()=> openModal(topProducts[section==='top'?topIndex:bottomIndex].gallery));
});

modalClose.addEventListener('click',()=>modal.style.display='none');
window.addEventListener('click',e=>{ if(e.target===modal) modal.style.display='none';});

document.getElementById('btn-products').addEventListener('click',()=>{
  document.getElementById('btn-products').classList.add('active');
  document.getElementById('btn-about').classList.remove('active');
  productsSection.classList.add('active');
  aboutSection.classList.remove('active');
});
document.getElementById('btn-about').addEventListener('click',()=>{
  document.getElementById('btn-about').classList.add('active');
  document.getElementById('btn-products').classList.remove('active');
  aboutSection.classList.add('active');
  productsSection.classList.remove('active');
});

// Init
updateTop(); updateBottom();
