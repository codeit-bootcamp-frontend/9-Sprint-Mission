export interface ImageUploadProps {
  id: string;
  name: string;
  image: string | null;
  setImage: (image: string) => void;
  onRemoveImage: (clearFileInputRef: () => void) => void;
}
