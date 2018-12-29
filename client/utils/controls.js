export function findCharacterId() {
  let storedIds = localStorage.getItem('characterIds')
  let available = []
  for (let i = 1; i <= 3; i++) {
    available[i - 1] = i
  }
  //if storedIds is not empty.
  if (storedIds.indexOf('null') === -1) {
    //split storedIds into an array of nums
    storedIds = storedIds
      .split(',')
      .sort()
      .map(id => parseInt(id, 10))
    //filter available array with nums not in storedIds
    available = available.filter(id => {
      return !storedIds.includes(id)
    })
  }
  let idx = Math.round(Math.random() * available.length)
  return available[idx] || available[0] || 1
}

export function setCharacterId(id) {
  let charIds = localStorage.getItem('characterIds')
  if (charIds.indexOf(id) === -1) {
    if (charIds.indexOf('null') !== -1) {
      let beginning = charIds.slice(0, charIds.indexOf('null'))
      let end = charIds.slice(charIds.indexOf('null') + 4)
      charIds = beginning + end
    }
    if (charIds.length) {
      charIds += `,${id}`
    } else charIds += `${id}`
  }
  localStorage.setItem('characterIds', charIds)
}
