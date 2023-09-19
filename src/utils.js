export function getFileType (filename) {
  const extension = filename.split(".").pop().toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "webp":
    case "tiff":
      return "image";
    case "mp4":
    case "mov":
    case "avi":
    case "webm":
    case "mkv":
    case "flv":
    case "wmv":
      return "video";
    case "pdf":
      return "document";
  }
  throw new Error("Unsupported file type");
}

export const endpointMap = {
  "image": "/images",
  "video": "/videos",
  "document": "/documents"
}
