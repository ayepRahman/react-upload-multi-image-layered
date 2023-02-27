import { useGlobalContext } from "context/GlobalContext";
import { useEffect, useRef } from "react";
import EditorCard from "./EditorCard";

const Editor = () => {
  const { selections, canvas } = useGlobalContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  console.log("selections", selections);

  useEffect(() => {
    if (containerRef?.current) {
      console.log("containerRef", containerRef.current.getBoundingClientRect());
    }
    if (canvasRef?.current) {
      console.log("canvasRef", canvasRef.current.getBoundingClientRect());
    }
  }, [containerRef, canvasRef]);

  return (
    <div
      id="canvas"
      ref={containerRef}
      className="h-[calc(100vh_-_64px)] w-full flex flex-col justify-center bg-slate-900 border-b border-slate-500"
    >
      <div
        ref={canvasRef}
        style={{
          height: canvas?.height,
          width: canvas?.width,
        }}
        className="bg-white/5 mx-auto h-[400px] w-[400px]"
      >
        {!!selections?.length &&
          selections.map((sel) => {
            return <EditorCard key={sel.id} {...sel} />;
          })}
      </div>
    </div>
  );
};

export default Editor;
