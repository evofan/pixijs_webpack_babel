import * as PIXI from "pixi.js";

/**
 * Define the displayCatSprite() function using the export statement.
 * @param { object } app reference
 * @param { string } img_cat base64 encode image data
 */
export function displayCatSprite(app, img_cat) {
  let texture = PIXI.Texture.from(img_cat); // PIXI ver.5-
  let sprite = PIXI.Sprite.from(texture);
  sprite.x = 180;
  sprite.y = 110;
  app.stage.addChild(sprite);
}
