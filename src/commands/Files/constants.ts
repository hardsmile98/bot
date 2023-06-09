const services = {
  'ui8.net': 'ui8.net',
  'craftwork.design': 'craftwork.design',
  'ls.graphics': 'ls.graphics',
  'uihut.com': 'uihut.com',
  'pixsellz.io': 'pixsellz.io',
  'spline.one': 'spline.one'
}

const dataServices = {
  [services['ui8.net']]: {
    image: 'https://i.ibb.co/9sQspbH/5.png',
    title: 'UI8NET',
    url: 'https://ui8.net'
  },
  [services['craftwork.design']]: {
    image: 'https://i.ibb.co/98SRdLg/7.png',
    title: 'CraftWork',
    url: 'https://craftwork.design'
  },
  [services['ls.graphics']]: {
    image: 'https://i.ibb.co/tzqpw9J/6.png',
    title: 'LS Graphics',
    url: 'https://www.ls.graphics'
  },
  [services['uihut.com']]: {
    image: 'https://i.ibb.co/j43d3wk/8.png',
    title: 'UIHUT',
    url: 'https://uihut.com'
  },
  [services['pixsellz.io']]: {
    image: 'https://i.ibb.co/k1cMVyM/9.png',
    title: 'Pixsellz',
    url: 'https://www.pixsellz.io'
  },
  [services['spline.one']]: {
    image: 'https://i.ibb.co/d77jSgY/10.png',
    title: 'Spline one',
    url: 'https://www.spline.one'
  }
}

const regexUrl = /ui8\.net|craftwork\.design|ls\.graphics|uihut\.com|pixsellz\.io|spline\.one/

type IKeyMatchSevice = keyof typeof services

export type {
  IKeyMatchSevice
}

export {
  services,
  regexUrl,
  dataServices
}
