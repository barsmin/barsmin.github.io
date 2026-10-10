/*=============== TABS BUTTONS WITH SMOOTH ANIMATION ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) => {
   tab.addEventListener('click', () => {
      const targetSelector = tab.dataset.target,
            targetContent = document.querySelector(targetSelector),
            currentContent = document.querySelector('[data-content].main-active')

      // Avoid re-triggering if the same tab is clicked
      if(!currentContent || targetContent === currentContent) return

      // Switch active button
      tabs.forEach((t) => t.classList.remove('main-active'))
      tab.classList.add('main-active')

      // Fade out current content
      currentContent.classList.remove('show')

      currentContent.addEventListener('transitionend', function handler(e){
         // Ignore transitions bubbling up from child elements (e.g. scroll animations)
         if(e.target !== currentContent) return

         currentContent.classList.remove('main-active')
         currentContent.removeEventListener('transitionend', handler)

         // Fade in new content
         targetContent.classList.add('main-active')

         requestAnimationFrame(() => {
            requestAnimationFrame(() => {
               targetContent.classList.add('show')
            })
         })
      })
   })
})

/*=============== PROJECT CARDS (data comes from assets/js/projects.js) ===============*/
// Each card opens the project's own page (project.html?id=...) in a new browser tab
const projectsContainer = document.getElementById('projects-container')

if(projectsContainer && typeof projects !== 'undefined'){
   projects.forEach((project) => {
      const card = document.createElement('a')
      card.className = 'projects__card'
      card.href = 'project.html?id=' + encodeURIComponent(project.id)
      card.target = '_blank'
      card.rel = 'noopener'

      if(project.images && project.images.length){
         const thumb = document.createElement('div')
         thumb.className = 'projects__thumb'

         const img = document.createElement('img')
         img.className = 'projects__img'
         img.src = project.images[0]
         img.alt = project.title
         img.loading = 'lazy'

         thumb.append(img)
         card.append(thumb)
      }

      const name = document.createElement('h3')
      name.className = 'projects__name'
      name.append(project.title)

      const icon = document.createElement('i')
      icon.className = 'ri-arrow-right-up-line'
      icon.setAttribute('aria-hidden', 'true')
      name.append(icon)

      const hint = document.createElement('span')
      hint.className = 'visually-hidden'
      hint.textContent = ' (opens in a new tab)'
      name.append(hint)

      card.append(name)

      if(project.summary){
         const description = document.createElement('p')
         description.className = 'projects__description'
         description.textContent = project.summary
         card.append(description)
      }

      projectsContainer.append(card)
   })
}

/*=============== OPEN PROJECTS TAB WHEN COMING BACK FROM A PROJECT PAGE ===============*/
// index.html?tab=projects  ->  starts on the Projects tab
const startsOnProjects = new URLSearchParams(window.location.search).get('tab') === 'projects'

if(startsOnProjects){
   document.querySelector('#info').classList.remove('main-active')
   document.querySelector('#projects').classList.add('main-active')
   tabs.forEach((t) => t.classList.toggle('main-active', t.dataset.target === '#projects'))
}

/*=============== INITIAL FADE IN ON LOAD ===============*/
window.addEventListener('load', () => {
   const initialContent = document.querySelector('[data-content].main-active')
   requestAnimationFrame(() => {
      requestAnimationFrame(() => {
         initialContent.classList.add('show')
      })
   })
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
// If the ScrollReveal CDN script fails to load, the page simply shows without animations
if(typeof ScrollReveal !== 'undefined'){
   const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2000,
      delay: 200,
      // reset: true,  // Uncomment to repeat animations every time elements scroll into view
   })

   // Only elements in the first tab are revealed: elements inside the hidden
   // "Projects" tab have no size yet, so ScrollReveal can't track them
   sr.reveal('.profile__data', { origin: 'left' })
   sr.reveal('.profile__perfil', { origin: 'right', delay: 400 })
   if(!startsOnProjects){
      sr.reveal('.main__left', { origin: 'left', delay: 500 })
      sr.reveal('.main__right', { origin: 'right', delay: 500 })
   }
   sr.reveal('.footer', { origin: 'bottom', distance: '30px', delay: 300 })
}
