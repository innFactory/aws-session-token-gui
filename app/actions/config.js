/**
 * Created by toni on 20.05.2017.
 */
export const SET_CONFIG = 'SET_CONFIG';


export function setConfig(config) {
  return {
    data: config,
    type: SET_CONFIG
  };
}
