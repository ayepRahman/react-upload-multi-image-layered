export const getPreviewImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      resolve("");
    }
  });
};
