import * as PIXI from "pixi.js";

/**
 * Define the displaySprite() function using the export statement.
 * @param { object } app reference
 * @param { string } img base64 encode image data
 */
export const displaySprite = (app, img, x, y, scalex = 1, scaley = 1) => {
  let texture = PIXI.Texture.from(img); // PIXI ver.5-
  let sprite = PIXI.Sprite.from(texture);
  sprite.x = x;
  sprite.y = y;
  sprite.scale.x = scalex;
  sprite.scale.y = scaley;
  app.stage.addChild(sprite);
}
