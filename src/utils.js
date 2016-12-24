export function getUALang () {
  return navigator.systemLanguage || navigator.language
}

export function isArray (item) {
  return ({}).toString.call(item) === '[object Array]'
}

export function objectAssign (base, objects) {
  for (let i = 0; i < objects.length; i++) {
    for (let key in objects[i]) {
      if (objects[i].hasOwnProperty(key)) base[key] = objects[i][key]
    }
  }
  return base
}
