const services = {
  ui8net: 'ui8net',
  craftwork: 'craftwork',
  ls_graphics: 'ls_graphics',
  uihunt: 'uihunt',
  pixsellz: 'pixsellz',
  spline: 'spline'
}

const matchServices = {
  'ui8.net': services.ui8net,
  'craftwork.design': services.craftwork,
  'ls.graphics': services.ls_graphics,
  'uihut.com': services.uihunt,
  'pixsellz.io': services.pixsellz,
  'spline.one': services.spline
}

const dataServices = {
  [services.ui8net]: {
    image: 'https://i.ibb.co/9sQspbH/5.png',
    title: 'UI8NET',
    url: 'https://ui8.net'
  },
  [services.craftwork]: {
    image: 'https://i.ibb.co/98SRdLg/7.png',
    title: 'CraftWork',
    url: 'https://craftwork.design'
  },
  [services.ls_graphics]: {
    image: 'https://i.ibb.co/tzqpw9J/6.png',
    title: 'LS Graphics',
    url: 'https://www.ls.graphics'
  },
  [services.uihunt]: {
    image: 'https://i.ibb.co/j43d3wk/8.png',
    title: 'UIHUT',
    url: 'https://uihut.com'
  },
  [services.pixsellz]: {
    image: 'https://i.ibb.co/k1cMVyM/9.png',
    title: 'Pixsellz',
    url: 'https://www.pixsellz.io'
  },
  [services.spline]: {
    image: 'https://i.ibb.co/d77jSgY/10.png',
    title: 'Spline one',
    url: 'https://www.spline.one'
  }
}

const regexUrl = /ui8\.net|craftwork\.design|ls\.graphics|uihut\.com|pixsellz\.io|spline\.one/

type IKeyMatchSevice = keyof typeof matchServices

export type {
  IKeyMatchSevice
}

export {
  services,
  regexUrl,
  dataServices,
  matchServices
}
