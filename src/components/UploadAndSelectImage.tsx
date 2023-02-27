import { Button } from "@chakra-ui/react";
import clsx from "clsx";
import { DEFAULT_SIZE } from "constants/constants";
import { useGlobalContext } from "context/GlobalContext";
import { nanoid } from "nanoid";
import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { SelectionsProps } from "schemas/UploadImagesProps";
import { getPreviewImage } from "utils/image";

const UploadAndSelectImage: FC = () => {
  const { selections, setSelections } = useGlobalContext();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const data: SelectionsProps[] = await Promise.all(
      acceptedFiles.map(async (file, i) => {
        try {
          // @desc - get the preview image from file
          const imgPreview = await getPreviewImage(file);

          return {
            id: nanoid(),
            file,
            imgPreview,
            zIndex: i,
            height: DEFAULT_SIZE,
            width: DEFAULT_SIZE,
          };
        } catch (error: any) {
          throw new Error(error);
        }
      })
    );

    setSelections(data);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const removeImageById = (id: string) => {
    setSelections(selections.filter((img) => img.id !== id));
  };

  return (
    <div className="h-full">
      <div
        className={clsx(
          "p-3 border border-dashed border-slate-500 rounded cursor-pointer hover:border-slate-200",
          { "flex flex-col h-full justify-center": !selections?.length }
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image files here ...</p>
        ) : (
          <p>
            Drag 'n' drop some image files here, or click to select files ...
          </p>
        )}
      </div>

      {!!selections?.length && (
        <div className="w-full mt-3 flex justify-between">
          <div className="cursor-pointer font-medium">Images</div>
          <div
            onClick={() => setSelections([])}
            className=" cursor-pointer underline"
          >
            Clear
          </div>
        </div>
      )}

      {!!selections?.length && (
        <div className=" overflow-auto my-4 h-[calc(100vh-200px)]">
          {selections.map((img, i) => {
            return (
              <div
                key={`img-${i}`}
                className="flex justify-between items-center mb-3 border border-slate-500 rounded p-1 bg-slate-700 cursor-pointer hover:border-slate-300"
              >
                <div className="flex gap-2 items-center">
                  <img
                    className="h-10 w-10 overflow-hidden rounded border border-slate-500 bg-slate-300"
                    src={img.imgPreview}
                    alt={img.imgPreview}
                  />
                  <div className="truncate w-40">{img.file.name}</div>
                </div>

                {/* <Checkbox colorScheme="red" isChecked={img.isChecked} /> */}
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => removeImageById(img.id)}
                >
                  X
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UploadAndSelectImage;
