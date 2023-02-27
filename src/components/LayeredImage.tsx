import React, { FC, useEffect } from "react";

interface LayeredImageProps {
  layers: string[];
}

const LayeredImage: FC<LayeredImageProps> = ({ layers }) => {
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement>();
  const [value, setValue] = React.useState<string>("0");
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef?.current);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (layers?.length && canvas) {
      generateImages();
    }
  }, [layers, canvas]);

  /**
   * @desc requires that ths images in the public folder to access
   * path /public/assets/robots
   * will add battleship assets once logic is done
   */

  /**
   * By Ken Fyrstenberg Nilsen
   *
   * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
   *
   * If image and context are only arguments rectangle will equal canvas
   */
  function drawImageProp({
    ctx,
    img,
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    offsetX,
    offsetY,
  }: {
    ctx: CanvasRenderingContext2D;
    img: HTMLImageElement;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    offsetX?: number;
    offsetY?: number;
  }) {
    if (arguments.length === 2) {
      x = y = 0;
      w = ctx.canvas.width;
      h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
      ih = img.height,
      r = Math.min(w / iw, h / ih),
      nw = iw * r, // new prop. width
      nh = ih * r, // new prop. height
      cx,
      cy,
      cw,
      ch,
      ar = 1;

    // decide which gap to fill
    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
  }

  const generateImages = React.useCallback(() => {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = 400;
      canvas.height = 400;

      layers.forEach((layer) => {
        let img = new Image();
        img.src = layer;
        img.onload = () => {
          console.log("img", img);
          console.log("width", img.width);
          console.log("height", img.height);

          // ctx?.drawImage(img, (400 - img.width) / 2, (400 - img.height) / 2);
          ctx?.drawImage(img, 0, 0, img.width * 2, img.height * 2);
          if (ctx) {
            drawImageProp({
              ctx,
              img,
              x: 0,
              y: 0,
              h: 400,
              w: 400,
              offsetX: 0.5,
              offsetY: 0.5,
            });
          }
          // ctx?.drawImage(img, 400, 400, 400, 400);
        };
      });

      // neck
      // const neck = new Image();
      // const neckNumber = Math.floor(Math.random() * 10) + 1;
      // const neckSrc = `/assets/robots/neck${neckNumber}.png`;
      // neck.src = neckSrc;
      // // ears
      // const ears = new Image();
      // const earsNumber = Math.floor(Math.random() * 10) + 1;
      // const earsSrc = `/assets/robots/ears${earsNumber}.png`;
      // ears.src = earsSrc;
      // // antenna
      // const antenna = new Image();
      // const antennaNumber = Math.floor(Math.random() * 10) + 1;
      // const antennaSrc = `/assets/robots/antenna${antennaNumber}.png`;
      // antenna.src = antennaSrc;
      // // head
      // const head = new Image();
      // const headNumber = Math.floor(Math.random() * 10) + 1;
      // const headSrc = `/assets/robots/head${headNumber}.png`;
      // head.src = headSrc;
      // // eyes
      // const eyes = new Image();
      // const eyesNumber = Math.floor(Math.random() * 10) + 1;
      // const eyesSrc = `/assets/robots/eyes${eyesNumber}.png`;
      // eyes.src = eyesSrc;
      // // mouth
      // const mouth = new Image();
      // const mouthNumber = Math.floor(Math.random() * 10) + 1;
      // const mouthSrc = `/assets/robots/mouth${mouthNumber}.png`;
      // mouth.src = mouthSrc;
      // // nose
      // const nose = new Image();
      // const noseNumber = Math.floor(Math.random() * 10) + 1;
      // const noseSrc = `/assets/robots/nose${noseNumber}.png`;
      // nose.src = noseSrc;

      // neck.onload = () => {
      //   draw();
      // };
      // ears.onload = () => {
      //   draw();
      // };
      // antenna.onload = () => {
      //   draw();
      // };
      // head.onload = () => {
      //   draw();
      // };
      // eyes.onload = () => {
      //   draw();
      // };
      // mouth.onload = () => {
      //   draw();
      // };
      // nose.onload = () => {
      //   draw();
      // };

      // const draw = () => {
      //   if (canvas) {
      //     canvas.width = 400;
      //     canvas.height = 400;

      //     ctx?.drawImage(ears, (400 - ears.width) / 2, 110);
      //     ctx?.drawImage(antenna, (400 - antenna.width) / 2, 20);
      //     ctx?.drawImage(head, (400 - head.width) / 2, 80);
      //     ctx?.drawImage(eyes, (400 - eyes.width) / 2, 150);
      //     ctx?.drawImage(mouth, (400 - mouth.width) / 2, 250);
      //     ctx?.drawImage(nose, (400 - nose.width) / 2, 220);

      //     // if (count === 7) {
      //     //   canvas.toBlob(function (blob) {
      //     //     if (blob) {
      //     //       saveAs(blob, `${index}.png`);
      //     //     }
      //     //   });
      //     // }
      //   }
      // };
    }
  }, [canvas]);

  return <canvas ref={canvasRef} />;
};

export default LayeredImage;
