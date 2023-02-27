import { createContext, useContext, useMemo, useState } from "react";
import { Canvas } from "schemas/Canvas";
import { GlobalContextProps } from "schemas/GlobalContextProps";
import { UpdateSelectionHeightAndWidthByIdArgs } from "schemas/UpdateSelectionHeightAndWidthByIdArgs";
import { SelectionsProps } from "schemas/UploadImagesProps";

export const GlobalContext = createContext<GlobalContextProps>({
  selections: [],
  setSelections: () => {},
  canvas: {
    height: 400,
    width: 400,
  },
  setCanvas: () => {},
  removeSelectionById: () => {},
  updateSelectionHeightAndWidthById: () => {},
});

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [selections, setSelections] = useState<SelectionsProps[]>([]);
  const [canvas, setCanvas] = useState<Canvas>({
    height: 400,
    width: 400,
  });

  const removeSelectionById = (id: string) => {
    setSelections(selections.filter((img) => img.id !== id));
  };

  const updateSelectionHeightAndWidthById = ({
    _id,
    height,
    width,
  }: UpdateSelectionHeightAndWidthByIdArgs) => {
    const updatedSelections = selections.map((item) =>
      item.id === _id ? { ...item, height, width } : item
    );
    setSelections(updatedSelections);
  };

  const value = useMemo(() => {
    return {
      selections,
      setSelections,
      canvas,
      setCanvas,
      removeSelectionById,
      updateSelectionHeightAndWidthById,
    };
  }, [selections, setSelections, canvas, setCanvas]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};

export { GlobalProvider, useGlobalContext };
