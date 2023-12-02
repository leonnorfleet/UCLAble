import imageCompression from "browser-image-compression";

const defaultOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

const compressImage = async (imgFile, options = defaultOptions) => {
  try {
    const compressedFile = await imageCompression(imgFile, options);
    // console.log(`Compressed file size: ${compressedFile.size / 1024 / 1024} MB`);
    return compressedFile;
  } catch (error) {
    console.error(error);
  }
};

export { compressImage };
