import validUrl from 'valid-url'
import validPath from 'is-valid-path'
const Path = Object.freeze({
  isValidPath: (string)=> {
    return validUrl.isUri(string) || validPath(string)
  }
})

export default Path
