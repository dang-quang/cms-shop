export const LOAD_BOOTSTRAP = 'LOAD_BOOTSTRAP'
export const LOAD_BOOTSTRAP_SUCCESS = 'LOAD_BOOTSTRAP_SUCCESS'
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
export const CHANNEL = 'CHANNEL'
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR'
export const SET_SIDEBAR = 'SET_SIDEBAR'
export const SHOW_LOADER = 'SHOW_LOADER'

export function setShowLoader(showLoader) {
    return {
      type: SHOW_LOADER,
      showLoader,
    }
  }