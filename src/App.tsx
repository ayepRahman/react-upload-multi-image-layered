import CanvasForm from "components/CanvasForm";
import Editor from "components/Editor";
import UploadAndSelectImage from "components/UploadAndSelectImage";
import useMediaQuery from "hooks/useMediaQuery";

const FieldNames = {
  UPLOAD: "upload",
};

function App() {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  if (isMobile)
    return (
      <div className="h-screen w-screen flex flex-col justify-center bg-slate-800">
        <div className=" text-center max-w px-4 mx-auto text-2xl text-white">
          Please switch to Desktop view for better experience
        </div>
      </div>
    );

  return (
    <div className="text-white h-screen w-screen bg-slate-800 grid grid-cols-10">
      <div className="col-span-2 p-4">
        <UploadAndSelectImage />
      </div>
      <div className="col-span-6 border-x border-slate-500">
        <Editor />
        <CanvasForm />
      </div>
      <div className="col-span-2 p-4"></div>
    </div>
  );
}

export default App;
