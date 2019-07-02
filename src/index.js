import * as PIXI from "pixi.js";
import { displayDateText } from "./Text.js";
import { displayParamText } from "./Text.js";
import { displayCatSprite } from "./Sprite.js";
import { Common } from "./Common.js";

import img_cat from "./cat.png";

// init
let app = new PIXI.Application({ width: 480, height: 320 });
app.renderer.backgroundColor = 0xe0e0e0;
document.body.appendChild(app.view);

// console.log(img_cat); // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAA.....

// Execute the method defined in Text.js
displayDateText(app);

// Execute the method defined in Sprite.js
displayCatSprite(app, img_cat);

// Execute the method and Read the property defined in Common.js
let ver = Common.pixi_version;
let size = Common.getAppRenderSize(app);
let type = Common.getAppRenderType(app);

// display Pixi data
displayParamText(app, ver, 220);
displayParamText(app, size, 250);
displayParamText(app, type, 280);
