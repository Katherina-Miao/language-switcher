let localStore = {
  get (key) {
    if (!key) return null
    if (window.localStorage) {
      try {
        return localStorage.getItem(key)
      } catch(e) {
        return false
      }
    }
  },

  set (key, value) {
    if (!key) return null
    try {
      localStorage.setItem(key, value)
      return true
    } catch(e) {
      return false
    }
  }
}

let cookieStore = {
  get (key) {
    if (!key) return null
    var value = "; " + document.cookie
    var parts = value.split("; " + key + "=")
    if (parts.length == 2) return parts.pop().split(";").shift()
  },

  set (key, value) {
    if (!key) return null
    try {
      document.cookie = key + "=" + encodeURIComponent(value)
      return true
    } catch(e) {
      return false
    }
  }
}

export const getItem = (key) => {
  return localStore.get(key) || cookieStore.get(key)
}

export const setItem = (key, value) => {
  return localStore.set(key, value) || cookieStore.set(key, value)
}
