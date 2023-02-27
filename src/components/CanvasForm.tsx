import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useGlobalContext } from "context/GlobalContext";

const CanvasForm = () => {
  const { canvas, setCanvas } = useGlobalContext();

  return (
    <div>
      <div className="text-slate-500"></div>
      <form className="flex gap-2 p-3">
        <InputGroup>
          <InputLeftAddon children="canvas height" textColor="black" />
          <Input
            type="number"
            placeholder="Set canvas height"
            value={canvas.height}
            onChange={(e) =>
              setCanvas((pv) => ({
                ...pv,
                height: +e.target.value,
              }))
            }
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="canvas width" textColor="black" />{" "}
          <Input
            type="number"
            placeholder="Set canvas width"
            value={canvas.width}
            onChange={(e) =>
              setCanvas((pv) => ({
                ...pv,
                width: +e.target.value,
              }))
            }
          />
        </InputGroup>
      </form>
    </div>
  );
};

export default CanvasForm;
