import { TYPES } from "./config.js";
import * as PIXI from "pixi.js";

const pixi_ver = `PixiJS: ver.${PIXI.VERSION}`

/**
 * Define the Common object using the export statement.
 * @type { object }
 * @param { string } pixi_version
 * @param { getAppRenderSize } function
 * @param { getAppRenderType } function 
 */
/**
 * @name getAppRenderSize
 * @function
 * @param { object } app - reference.
 */
/**
 * @name getAppRenderType
 * @function
 * @param { object } app - reference.
 */
export const Common = {
  pixi_version: pixi_ver,

  getAppRenderSize: app => {
    let size = `width: ${app.renderer.width}, height: ${app.renderer.height}`;
    return size;
  },

  getAppRenderType: app => {
    let type = TYPES[app.renderer.type];
    return type;
  }
};
