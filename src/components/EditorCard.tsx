import { FC } from "react";
import { Rnd } from "react-rnd";
import { SelectionsProps } from "schemas/UploadImagesProps";

const EditorCard: FC<SelectionsProps> = ({
  file,
  imgPreview,
  zIndex,
  height,
  width,
}) => {
  return (
    <Rnd
      className="border border-slate-500 hover:border-slate-300 overflow-hidden"
      bounds="#canvas"
      default={{
        x: 0,
        y: 0,
        width: width,
        height: height,
      }}
      style={{
        zIndex: zIndex,
      }}
      onDragStop={(e, d) => {
        console.log("e", e);
      }}
    >
      <div>
        <img className=" pointer-events-none" src={imgPreview} />
      </div>
    </Rnd>
  );
};

export default EditorCard;
