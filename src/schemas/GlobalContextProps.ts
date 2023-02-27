import { Dispatch, SetStateAction } from "react";
import { Canvas } from "./Canvas";
import { UpdateSelectionHeightAndWidthByIdArgs } from "./UpdateSelectionHeightAndWidthByIdArgs";
import { SelectionsProps } from "./UploadImagesProps";

export interface GlobalContextProps {
  selections: SelectionsProps[];
  setSelections: Dispatch<SetStateAction<SelectionsProps[]>>;
  canvas: Canvas;
  setCanvas: Dispatch<SetStateAction<Canvas>>;
  removeSelectionById: (id: string) => void;
  updateSelectionHeightAndWidthById: (
    args: UpdateSelectionHeightAndWidthByIdArgs
  ) => void;
}
