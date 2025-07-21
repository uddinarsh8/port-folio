document.addEventListener('DOMContentLoaded', () => {
  // =================== ACHIEVEMENTS ===================
  fetch('/api/achievements')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('achievements-list');
      list.innerHTML = '';

      data.forEach((a, index) => {
        const card = document.createElement('div');
        card.classList.add('achievement-card');

        const images = a.images.map((img, i) => `
          <img 
            src="/images/achievements/${img}" 
            alt="${a.title}" 
            class="slider-img" 
            data-type="achievement"
            data-index="${index}" 
            data-img="${i}"
            style="display: ${i === 0 ? 'block' : 'none'}; width: 100%; max-height: 200px; object-fit: cover; margin-bottom: 5px;">
        `).join('');

        card.innerHTML = `
          <div class="image-slider" data-index="${index}">
            ${images}
            <button class="prev-btn" data-type="achievement" data-index="${index}">❮</button>
            <button class="next-btn" data-type="achievement" data-index="${index}">❯</button>
          </div>
          <h3>${a.title}</h3>
          <p>${a.description}</p>
        `;

        list.appendChild(card);
      });

      addSliderEvents('achievement');
    });

  // =================== PROJECTS ===================
  fetch('/api/projects')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('projects-list');
      list.innerHTML = '';

      data.forEach((project, index) => {
        const card = document.createElement('div');
        card.classList.add('project-card');

        const images = project.images.map((img, i) => `
          <img 
            src="/images/projects/${img}" 
            alt="${project.title}" 
            class="slider-img" 
            data-type="project"
            data-index="${index}" 
            data-img="${i}"
            style="display: ${i === 0 ? 'block' : 'none'}; width: 100%; max-height: 200px; object-fit: cover; margin-bottom: 5px;">
        `).join('');

        card.innerHTML = `
          <div class="image-slider" data-index="${index}">
            ${images}
            <button class="prev-btn" data-type="project" data-index="${index}">❮</button>
            <button class="next-btn" data-type="project" data-index="${index}">❯</button>
          </div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        `;

        list.appendChild(card);
      });

      addSliderEvents('project');
    });
    fetch('/api/patents')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('patents-list');
      if (!list) return console.error("Element #patents-list not found.");
      
      list.innerHTML = '';
  
      data.forEach((patent, index) => {
        const card = document.createElement('div');
        card.classList.add('patent-card');
  
        const images = (patent.images || []).map((img, i) => `
          <img 
            src="/images/patents/${img}" 
            alt="${patent.title}" 
            class="slider-img" 
            data-type="patent"
            data-index="${index}" 
            data-img="${i}"
            style="display: ${i === 0 ? 'block' : 'none'}; width: 100%; max-height: 200px; object-fit: cover; margin-bottom: 5px;">
        `).join('');
  
        card.innerHTML = `
          <div class="image-slider" data-index="${index}">
            ${images}
            ${images ? `
            <button class="prev-btn" data-type="patent" data-index="${index}">❮</button>
            <button class="next-btn" data-type="patent" data-index="${index}">❯</button>
            ` : ''}
          </div>
          <h3>${patent.title}</h3>
          <p>${patent.description}</p>
        `;
  
        list.appendChild(card);
      });
  
      addSliderEvents('patent');
    })
    .catch(err => console.error("Error loading patents:", err));
  

  // =================== SLIDER FUNCTION (Shared but Scoped) ===================
  function addSliderEvents(type) {
    document.querySelectorAll(`.prev-btn[data-type="${type}"]`).forEach(btn => {
      btn.addEventListener('click', () => changeSlide(type, btn.dataset.index, -1));
    });

    document.querySelectorAll(`.next-btn[data-type="${type}"]`).forEach(btn => {
      btn.addEventListener('click', () => changeSlide(type, btn.dataset.index, 1));
    });
  }

  function changeSlide(type, cardIndex, direction) {
    const images = document.querySelectorAll(`.slider-img[data-type="${type}"][data-index="${cardIndex}"]`);
    let currentIndex = Array.from(images).findIndex(img => img.style.display === 'block');

    if (currentIndex !== -1) {
      images[currentIndex].style.display = 'none';
      const nextIndex = (currentIndex + direction + images.length) % images.length;
      images[nextIndex].style.display = 'block';
    }
  }

  // =================== TYPING EFFECT ===================
  const text = ["Inventor", "Web Developer", "IoT Enthusiast", "Problem Solver"];
  let i = 0, j = 0, isDeleting = false;

  function typeEffect() {
    const typing = document.getElementById("typing");
    if (!typing) return;

    let current = text[i];
    let updated = isDeleting ? current.substring(0, j--) : current.substring(0, j++);

    typing.innerHTML = updated + "|";

    if (!isDeleting && j === current.length + 1) isDeleting = true;
    if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % text.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);
  }

  typeEffect();
});
