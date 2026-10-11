/*=============== YOUR PROJECTS ===============
  Each entry below becomes:
    1) a card in the "Projects" tab (cover photo + short description), and
    2) its own page that opens in a new browser tab (project.html?id=...).

  KEEP PHOTOS ORGANIZED: one folder per project
    assets/img/projects/my-project/photo-1.jpg
    assets/img/projects/my-project/photo-2.jpg
    assets/img/projects/another-project/photo-1.jpg
  Name the folder after the project's id. To change a photo later, open that
  project's folder on GitHub and upload a file with the same name (it replaces the old one).

  HOW TO ADD A PROJECT
    1. Put the photos in a folder on your computer named like the project (e.g. my-project),
       then upload that whole folder into  assets/img/projects/  on GitHub.
    2. Copy one entry below, paste it after the last one (keep the comma between entries)
       and edit the text, folder and photo names.
    3. Commit the change. The live site updates within a minute or two.

  FIELDS
    id       Unique short name: lowercase letters, numbers and hyphens only (used in the page address)
    title    Project name
    summary  Short description (shown on the card and at the top of the project page)
    folder   Where this project's photos are, e.g. 'assets/img/projects/my-project/'
    images   Photo file names inside that folder. The FIRST photo is the card's cover image.
    meta     (optional) Small facts shown under the summary. Use any labels you like.
    link     (optional) Button to the live project, e.g. { text: 'Visit website', url: 'https://...' }
    details  (optional) Longer text for the project page. Each item is one paragraph.

  Photo tips: use .jpg, .png or .webp (iPhone .heic files do not show in browsers), keep file
  names lowercase without spaces (e.g. photo-1.jpg), and resize photos to about 1600 px wide.

  Delete the sample projects below (and their folders) once you have added your own.
*/
const projects = [
  {
    id: 'sample-project-1',
    title: 'Sample Project 1',
    summary: 'Professional website for a company, using HTML, CSS, JavaScript, Gsap, Figma, Database and others.',
    folder: 'assets/img/projects/sample-project-1/',
    images: ['photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg'],
    meta: {
      Year: '2024',
      Role: 'Design & development',
      Tools: 'HTML, CSS, JavaScript, GSAP, Figma'
    },
    details: [
      'Replace this text with the story of the project: the goal, your role and the result.',
      'Add as many paragraphs as you like, or delete the "details" line to hide this section.'
    ]
  },
  {
    id: 'sample-project-2',
    title: 'Sample Project 2',
    summary: 'Professional website for a company, using HTML, CSS, JavaScript, Gsap, Figma, Database and others.',
    folder: 'assets/img/projects/sample-project-2/',
    images: ['photo-1.jpg', 'photo-2.jpg'],
    meta: { Year: '2023', Role: 'Brand strategy' }
  },
  {
    id: 'sample-project-3',
    title: 'Sample Project 3',
    summary: 'Professional website for a company, using HTML, CSS, JavaScript, Gsap, Figma, Database and others.',
    folder: 'assets/img/projects/sample-project-3/',
    images: ['photo-1.jpg']
  },
  {
    id: 'sample-project-4',
    title: 'Sample Project 4',
    summary: 'Professional website for a company, using HTML, CSS, JavaScript, Gsap, Figma, Database and others.',
    folder: 'assets/img/projects/sample-project-4/',
    images: ['photo-1.jpg']
  },
  {
    id: 'sample-project-5',
    title: 'Sample Project 5',
    summary: 'Professional website for a company, using HTML, CSS, JavaScript, Gsap, Figma, Database and others.',
    folder: 'assets/img/projects/sample-project-5/',
    images: ['photo-1.jpg']
  }
]

/*=============== DON'T EDIT BELOW THIS LINE ===============*/
// If a project has a "folder", put it in front of each photo name
// (without a folder, photo paths are used exactly as written)
projects.forEach((project) => {
  if(project.folder && project.images){
    const folder = project.folder.endsWith('/') ? project.folder : project.folder + '/'
    project.images = project.images.map((name) => folder + name)
  }
})
