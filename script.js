const galleryData = {
    sealife: {
      sharks: ['shark1.jpg', 'shark2.jpg'],
      dolphins: ['dolphin1.jpg'],
      octopus: ['octopus1.jpg']
    },
    mammals: {
      lions: ['lion1.jpg'],
      elephants: ['elephant1.jpg']
    }
  };
  
  const view = document.getElementById('view');
  let history = [];
  
  function renderCategories() {
    view.innerHTML = '<h2>Choose a Category</h2>';
    for (let cat in galleryData) {
      const btn = document.createElement('button');
      btn.textContent = cat;
      btn.onclick = () => {
        history.push(renderCategories);
        renderSubcategories(cat);
      };
      view.appendChild(btn);
    }
  }
  
  function renderSubcategories(category) {
    view.innerHTML = `<h2>${category}</h2>`;
    for (let sub in galleryData[category]) {
      const btn = document.createElement('button');
      btn.textContent = sub;
      btn.onclick = () => {
        history.push(() => renderSubcategories(category));
        renderGallery(category, sub);
      };
      view.appendChild(btn);
    }
    renderBackButton();
  }
  
  function renderGallery(category, subcategory) {
    view.innerHTML = `<h2>${subcategory}</h2>`;
    galleryData[category][subcategory].forEach(img => {
      const image = document.createElement('img');
      image.src = `images/${category}/${subcategory}/${img}`;
      image.alt = img;
      view.appendChild(image);
    });
    renderBackButton();
  }
  
  function renderBackButton() {
    const btn = document.createElement('button');
    btn.textContent = '⬅ Back';
    btn.onclick = () => {
      const last = history.pop();
      if (last) last();
    };
    view.appendChild(document.createElement('br'));
    view.appendChild(btn);
  }
  
  // Initial load
  renderCategories();