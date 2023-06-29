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
  SHOP_FLASH_SALE_TAB,
  LOADING,
} from '../actions/app';

const initialState = {
  loading: true,
};

export default function app(state = initialState, action) {
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
    case SHOP_FLASH_SALE_TAB:
      return {
        ...state,
        selectedFlashSaleTabIndex: action.selectedFlashSaleTabIndex,
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}
