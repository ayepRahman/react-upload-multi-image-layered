import { saveAs } from "file-saver";
import React from "react";

const BattleShipGenerator = () => {
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement>();
  const [value, setValue] = React.useState<string>("0");
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef?.current);
    }
  }, [canvasRef]);

  const delay = (ms: number) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
  };

  /**
   * @desc requires that ths images in the public folder to access
   * path /public/assets/robots
   * will add battleship assets once logic is done
   */
  const generateImages = React.useCallback(
    (index: number) => {
      if (canvas) {
        let count: number = 0;

        // neck
        const neck = new Image();
        const neckNumber = Math.floor(Math.random() * 10) + 1;
        const neckSrc = `/assets/robots/neck${neckNumber}.png`;
        neck.src = neckSrc;
        // ears
        const ears = new Image();
        const earsNumber = Math.floor(Math.random() * 10) + 1;
        const earsSrc = `/assets/robots/ears${earsNumber}.png`;
        ears.src = earsSrc;
        // antenna
        const antenna = new Image();
        const antennaNumber = Math.floor(Math.random() * 10) + 1;
        const antennaSrc = `/assets/robots/antenna${antennaNumber}.png`;
        antenna.src = antennaSrc;
        // head
        const head = new Image();
        const headNumber = Math.floor(Math.random() * 10) + 1;
        const headSrc = `/assets/robots/head${headNumber}.png`;
        head.src = headSrc;
        // eyes
        const eyes = new Image();
        const eyesNumber = Math.floor(Math.random() * 10) + 1;
        const eyesSrc = `/assets/robots/eyes${eyesNumber}.png`;
        eyes.src = eyesSrc;
        // mouth
        const mouth = new Image();
        const mouthNumber = Math.floor(Math.random() * 10) + 1;
        const mouthSrc = `/assets/robots/mouth${mouthNumber}.png`;
        mouth.src = mouthSrc;
        // nose
        const nose = new Image();
        const noseNumber = Math.floor(Math.random() * 10) + 1;
        const noseSrc = `/assets/robots/nose${noseNumber}.png`;
        nose.src = noseSrc;

        neck.onload = () => {
          draw();
        };
        ears.onload = () => {
          draw();
        };
        antenna.onload = () => {
          draw();
        };
        head.onload = () => {
          draw();
        };
        eyes.onload = () => {
          draw();
        };
        mouth.onload = () => {
          draw();
        };
        nose.onload = () => {
          draw();
        };

        const draw = () => {
          if (canvas) {
            count = count += 1;
            canvas.width = 400;
            canvas.height = 400;
            const ctx = canvas.getContext("2d");

            ctx?.drawImage(neck, (400 - neck.width) / 2, 320);
            ctx?.drawImage(ears, (400 - ears.width) / 2, 110);
            ctx?.drawImage(antenna, (400 - antenna.width) / 2, 20);
            ctx?.drawImage(head, (400 - head.width) / 2, 80);
            ctx?.drawImage(eyes, (400 - eyes.width) / 2, 150);
            ctx?.drawImage(mouth, (400 - mouth.width) / 2, 250);
            ctx?.drawImage(nose, (400 - nose.width) / 2, 220);

            if (count === 7) {
              canvas.toBlob(function (blob) {
                if (blob) {
                  saveAs(blob, `${index}.png`);
                }
              });
            }
          }
        };
      }
    },
    [canvas]
  );

  const generate = React.useCallback(async () => {
    for (let i = 0; i < Number(value); i++) {
      await delay(1000);
      generateImages(i + 1);
    }
  }, [generateImages, value]);

  return (
    <div>
      <div>
        <canvas ref={canvasRef} />
      </div>
      <input
        value={value}
        placeholder="Number"
        type="number"
        ref={inputRef}
        onChange={() => {
          if (inputRef?.current?.value) {
            setValue(inputRef?.current?.value);
          }
        }}
      />
      <button onClick={() => generate()}>Generate</button>
    </div>
  );
};

export default BattleShipGenerator;
