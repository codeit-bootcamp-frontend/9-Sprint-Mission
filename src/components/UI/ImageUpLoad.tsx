import { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';
import ic_plus from '@/images/icons/ic_plus.png';
import ic_imgdel from '@/images/icons/ic_imgdel.png';

interface ImageUpLoadProps {
  onUpload: (urls: string[]) => void;
}

export const ImageUpLoad: React.FC<ImageUpLoadProps> = ({ onUpload }) => {
  const [uploadImgUrls, setUploadImgUrls] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onchangeImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    if (files.length + uploadImgUrls.length > 1) {
      setError(true);
      return;
    }
    setError(false);
    const newUploadUrls: string[] = [];
    const readers: FileReader[] = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      readers.push(reader);
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        if (reader.result) {
          newUploadUrls.push(reader.result as string);
          if (newUploadUrls.length === readers.length) {
            const updatedUrls = [...uploadImgUrls, ...newUploadUrls];
            setUploadImgUrls(updatedUrls);
            onUpload(updatedUrls);
          }
        }
      };
    }
  };

  const handleDeleteImage = (
    index: number,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const newUploadImgUrls = uploadImgUrls.filter((_, i) => i !== index);
    setUploadImgUrls(newUploadImgUrls);
    onUpload(newUploadImgUrls);
  };

  return (
    <div className='flex gap-4'>
      <label className='flex flex-col items-center justify-center  bg-gray-100 rounded-lg p-4 cursor-pointer w-72 h-72 outline-none'>
        <Image
          src={ic_plus}
          alt='Upload'
          width={48}
          height={48}
          className='mb-2 gray-100'
        />
        <span className='text-gray-400'>이미지 등록</span>
        <input
          id='fileUpload'
          type='file'
          accept='image/*'
          multiple
          onChange={onchangeImageUpload}
          ref={fileInputRef}
          className='hidden'
        />
      </label>
      {uploadImgUrls.map((url, index) => (
        <div key={index} className='relative'>
          <img
            src={url}
            alt={`img-${index}`}
            className='rounded-lg w-72 h-72'
          />
          <button
            onClick={(e) => handleDeleteImage(index, e)}
            className='absolute top-2 right-2 bg-gray-400 text-white rounded-full p-1'
          >
            <Image src={ic_imgdel} alt='Delete' width={16} height={16} />
          </button>
        </div>
      ))}
      {error && (
        <span className='text-red-500 text-sm'>
          *이미지 등록은 최대 1개까지 가능합니다.
        </span>
      )}
    </div>
  );
};
