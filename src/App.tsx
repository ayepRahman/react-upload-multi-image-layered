import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { LayeredImage } from "react-layered-image";
import "./App.css";

const FieldNames = {
  UPLOAD: "upload",
};

function App() {
  const [count, setCount] = useState(0);

  const { control, register } = useForm({
    defaultValues: {
      [FieldNames.UPLOAD]: [{}],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: FieldNames.UPLOAD, // unique name for your Field Array
    }
  );

  const layers = [
    "https://llorca.github.io/react-layered-image/static/images/layer-1.png",
    "https://llorca.github.io/react-layered-image/static/images/layer-2.png",
    "https://llorca.github.io/react-layered-image/static/images/layer-3.png",
  ];

  return (
    <div className=" h-screen w-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LayeredImage layers={layers} style={{ width: 400 }} />
          </div>

          <form>
            {fields.map((field, index) => {
              return (
                <input
                  type="file"
                  placeholder="upload"
                  key={field.id} // important to include key with field's id
                  {...register(`${FieldNames.UPLOAD}.${index}.value`)}
                />
              );
            })}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
