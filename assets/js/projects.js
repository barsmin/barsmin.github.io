/*=============== YOUR PROJECTS ===============
  Each entry below becomes:
    1) a card in the "Projects" tab (cover photo + short description), and
    2) its own page that opens in a new browser tab (project.html?id=...).

  HOW TO ADD A PROJECT
    1. Upload your photos to the repo, e.g. into a folder like  assets/img/my-project/
    2. Copy one entry below, paste it after the last one (keep the comma between entries)
       and edit the text and photo paths.
    3. Commit the change. The live site updates within a minute or two.

  FIELDS
    id       Unique short name: lowercase letters, numbers and hyphens only (used in the page address)
    title    Project name
    summary  Short description (shown on the card and at the top of the project page)
    images   List of photos. The FIRST photo is the card's cover image.
    meta     (optional) Small facts shown under the summary. Use any labels you like.
    link     (optional) Button to the live project, e.g. { text: 'Visit website', url: 'https://...' }
    details  (optional) Longer text for the project page. Each item is one paragraph.

  Delete the sample projects below once you have added your own.
*/
const projects = [
  {
    id: 'sample-project-1',
    title: 'Sample Project 1',
    summary: 'Professional website for a company, using HTML, CSS, JavaScript, Gsap, Figma, Database and others.',
    meta: {
      Year: '2024',
      Role: 'Design & development',
      Tools: 'HTML, CSS, JavaScript, GSAP, Figma'
    },
    images: [
      'assets/img/project-1.jpg',
      'assets/img/project-2.jpg',
      'assets/img/project-3.jpg'
    ],
    details: [
      'Replace this text with the story of the project: the goal, your role and the result.',
      'Add as many paragraphs as you like, or delete the "details" line to hide this section.'
    ]
  },
  {
    id: 'sample-project-2',
    title: 'Sample Project 2',
    summary: 'Professional website for a company, using HTML, CSS, JavaScript, Gsap, Figma, Database and others.',
    meta: { Year: '2023', Role: 'Brand strategy' },
    images: ['assets/img/project-2.jpg', 'assets/img/project-4.jpg']
  },
  {
    id: 'sample-project-3',
    title: 'Sample Project 3',
    summary: 'Professional website for a company, using HTML, CSS, JavaScript, Gsap, Figma, Database and others.',
    images: ['assets/img/project-3.jpg']
  },
  {
    id: 'sample-project-4',
    title: 'Sample Project 4',
    summary: 'Professional website for a company, using HTML, CSS, JavaScript, Gsap, Figma, Database and others.',
    images: ['assets/img/project-4.jpg']
  },
  {
    id: 'sample-project-5',
    title: 'Sample Project 5',
    summary: 'Professional website for a company, using HTML, CSS, JavaScript, Gsap, Figma, Database and others.',
    images: ['assets/img/project-5.jpg']
  }
]
