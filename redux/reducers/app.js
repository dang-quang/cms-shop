/**
 * Created by Long ND on 4/8/21.
 */
import {
  LOAD_BOOTSTRAP_SUCCESS,
  CHANGE_LANGUAGE,
  CHANNEL,
  SHOW_SIDEBAR,
  SET_SIDEBAR,
  SHOW_LOADER,
  GAME_TAB,
} from '../actions/app';

export default function app(state = {}, action) {
  switch (action.type) {
    case LOAD_BOOTSTRAP_SUCCESS:
      return {
        ...state,
        appStack: action.route,
      };
    case CHANGE_LANGUAGE:
      localStorage.setItem('LANGUAGE', action.language);
      return {
        ...state,
        language: action.language,
      };
    case CHANNEL:
      localStorage.setItem('CHANNEL', action.channel);
      return {
        ...state,
        channel: action.channel,
      };
    case SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar: action.showSidebar,
      };
    case SET_SIDEBAR:
      return {
        ...state,
        sidebar: action.sidebar,
      };
    case SHOW_LOADER:
      return {
        ...state,
        showLoader: action.showLoader,
      };
    case GAME_TAB:
      return {
        ...state,
        selectedGameTab: action.selectedGameTab,
      };
    default:
      return state;
  }
}
