import type { TFunction } from "i18next";
import { toast } from "react-toastify";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
const MAX_SIZE = 500 * 1024;

export interface readFile {
  base64: string;
  size: number;
  type: string;
}

export async function readFile(file: File, t: TFunction<"errors">): Promise<readFile | null> {
  if (!file) return null;

  if (!ALLOWED_TYPES.includes(file.type)) {
    toast.error(t("errors.invalidFormat"));
    return null;
  }

  if (file.size > MAX_SIZE) {
    toast.error(t("errors.fileTooLarge"));
    return null;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result?.toString() ?? "";

      resolve({
        base64,
        size: file.size,
        type: file.type,
      });
    };

    reader.readAsDataURL(file);
  });
}
