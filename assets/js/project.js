/*=============== PROJECT PAGE ===============*/
// Reads ?id=... from the address, finds that project in assets/js/projects.js and builds the page

const root = document.getElementById('project')

// Small helper to create an element with a class and text (text is never treated as HTML)
function el(tag, className, text){
   const node = document.createElement(tag)
   if(className) node.className = className
   if(text) node.textContent = text
   return node
}

function backLink(){
   const link = el('a', 'project__back')
   link.href = 'index.html?tab=projects'

   const icon = el('i', 'ri-arrow-left-line')
   icon.setAttribute('aria-hidden', 'true')

   link.append(icon, ' Back to portfolio')
   return link
}

const projectId = new URLSearchParams(window.location.search).get('id')
const project = (typeof projects !== 'undefined') ? projects.find((p) => p.id === projectId) : null

if(!project){
   document.title = 'Project not found'
   root.append(
      el('h1', 'project__title', 'Project not found'),
      el('p', 'project__summary', 'Sorry, this project does not exist or the link is incorrect.')
   )
}else{
   document.title = project.title

   /*===== Top section: title, short description, facts, link =====*/
   const top = el('header', 'project__top')
   top.append(
      el('h2', 'section__title', 'Project'),
      el('h1', 'project__title', project.title)
   )

   if(project.summary) top.append(el('p', 'project__summary', project.summary))

   if(project.meta && Object.keys(project.meta).length){
      const list = el('ul', 'project__meta')

      Object.entries(project.meta).forEach(([label, value]) => {
         const item = el('li')
         item.append(el('span', 'project__meta-label', label), el('span', 'project__meta-value', value))
         list.append(item)
      })

      top.append(list)
   }

   if(project.link && /^(https?:|mailto:)/i.test(project.link.url || '')){
      const button = el('a', 'project__link')
      button.href = project.link.url
      button.target = '_blank'
      button.rel = 'noopener'

      const icon = el('i', 'ri-arrow-right-up-line')
      icon.setAttribute('aria-hidden', 'true')

      button.append(project.link.text || 'Visit project', icon)
      top.append(button)
   }

   root.append(top)

   /*===== Photo gallery =====*/
   if(project.images && project.images.length){
      const gallery = el('div', 'project__gallery')

      project.images.forEach((src, index) => {
         const figure = el('figure', 'project__figure')
         const img = el('img', 'project__img')
         img.src = src
         img.alt = project.title + ' - photo ' + (index + 1)
         if(index > 0) img.loading = 'lazy'

         figure.append(img)
         gallery.append(figure)
      })

      root.append(gallery)
   }

   /*===== Longer description (optional) =====*/
   if(project.details && project.details.length){
      const details = el('section', 'project__details')
      details.append(el('h2', 'section__title', 'About this project'))
      project.details.forEach((text) => details.append(el('p', null, text)))
      root.append(details)
   }

   /*===== Back link at the bottom too, so visitors don't have to scroll up =====*/
   const bottom = el('div', 'project__bottom')
   bottom.append(backLink())
   root.append(bottom)
}
