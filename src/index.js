import * as PIXI from "pixi.js";
import { displayDateText } from "./helper/text.js";
import { displayParamText } from "./helper/text.js";
import { displaySprite } from "./helper/sprite.js";
import { Common } from "./helper/common.js";

import img_snowman from "./images/pic_yukidaruma.png";
import img_bg from "./images/pic_darksky_bg.jpg";
import img_snow from "./images/pic_snow.png";

import "./main.css";

const STAGE_WIDTH = 480;
const STAGE_HEIGHT = 320;

// init
let app = new PIXI.Application({ width: STAGE_WIDTH, height: STAGE_HEIGHT });
app.renderer.backgroundColor = 0x000000;
document.body.appendChild(app.view);

// console.log(img_cat); // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAA.....

// Execute the method defined in sprite.js
displaySprite(app, img_bg, 0, 0);
displaySprite(app, img_snowman, 200, 200, 0.5, 0.5);
displaySprite(app, img_snow, 262, 235, 1.5, 1.5);

// Execute the method defined in text.js
displayDateText(app);

// Execute the method and Read the property defined in common.js
let ver = Common.pixi_version;
let size = Common.getAppRenderSize(app);
let type = Common.getAppRenderType(app);

// display Pixi data
displayParamText(app, ver, 230);
displayParamText(app, size, 260);
displayParamText(app, type, 290);

//// Main

// v5 ticker
let ticker = PIXI.Ticker.shared;
// Set this to prevent starting this ticker when listeners are added.
// By default this is true only for the PIXI.Ticker.shared instance.
ticker.autoStart = false;
// FYI, call this to ensure the ticker is stopped. It should be stopped
// if you have not attempted to render anything yet.
// ticker.stop();
// Call this when you are ready for a running shared ticker.
// ticker.start();

ticker.add((time) => {
    // app.renderer;
    // console.log("render...", time);
    update(time);
});
/*
// You may use the shared ticker to render...
let renderer = PIXI.autoDetectRenderer();
let stage = new PIXI.Container();
document.body.appendChild(renderer.view);
ticker.add(function (time) {
    renderer.render(stage);
});
*/

// TODO: separate text, animation, pic layer
// let container_bg = new PIXI.Container();
// container_bg.x = 0;
// container_bg.y = 0;
// app.stage.addChild(container_bg);

let container = new PIXI.Container();
container.width = 480;
container.height = 320;
container.x = 0;
container.y = 0;
container.pivot.x = 0;
container.pivot.y = 0;
container.interactive = true;
app.stage.addChild(container);

// snow property
const ROTATE_LEFT = 1;
const ROTATE_RIGHT = 2;
const MAX_NUM = 20;
const MAX_SCALE = 1;
const MIN_SCALE = 0.3;
const MAX_ACCEL = 7;
const MIN_ALPHA = 0.3;
const MAX_ALPHA = 1;
const MAX_RADIUS = 5;
const MIN_RADIUS = 1;
let snows = [];
let radiusNums = [];
let angleNums = [];
let accelNums = [];

// Snow
for (let i = 0; i < MAX_NUM; i++) {
    console.log(i);
    // let snow = PIXI.Sprite.from(res.snow_data.texture);
    let texture = PIXI.Texture.from(img_snow); // PIXI ver.5-
    let snow = PIXI.Sprite.from(texture);

    // x position
    let xNum = Math.floor(Math.random() * STAGE_WIDTH + 1);
    snow.x = xNum;

    // y position
    let yNum = -Math.floor(Math.random() * 100 + 1);
    snow.y = yNum;

    // scale
    let scaleNum = Math.random() * (MAX_SCALE - MIN_SCALE) + MIN_SCALE;
    snow.scale.x = scaleNum;
    snow.scale.y = scaleNum;

    // direction of rotation
    let rotateDirecNum = Math.floor(Math.random() * 2 + 1);
    rotateDirecNum === 1
        ? (rotateDirecNum = ROTATE_LEFT)
        : (rotateDirecNum = ROTATE_RIGHT);

    // acceleration
    let accelNum = Math.floor(Math.random() * MAX_ACCEL + 1);
    accelNums.push(accelNum);

    // transparency
    let alphaNum =
        Math.floor((Math.random() * (MAX_ALPHA - MIN_ALPHA) + MIN_ALPHA) * 10) / 10;
    snow.alpha = alphaNum;

    // radius
    let radiusNum = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
    radiusNums.push(radiusNum);

    // angle
    let angleNum = Math.floor(Math.random() * 360 + 1);
    angleNums.push(angleNum);

    snows.push(snow);
    container.addChild(snow);
}

ticker.start(); // render start

/**
 * app rendering
 * @param { number } time
 */
const update = (time) => {
    // console.log("update()")
    for (let i = 0; i < MAX_NUM; i++) {
        // radian
        let radian = (angleNums[i] * Math.PI) / 180;

        snows[i].x += radiusNums[i] * Math.cos(radian);

        snows[i].y += 1 * accelNums[i];
        angleNums[i] += 5;

        // +rotation

        // moved out of screen
        if (STAGE_HEIGHT + snows[i].height < snows[i].y) {
            let xNew = Math.floor(Math.random() * STAGE_WIDTH + 1);
            snows[i].x = xNew;
            snows[i].y = -snows[i].height;
        }
    }

}
