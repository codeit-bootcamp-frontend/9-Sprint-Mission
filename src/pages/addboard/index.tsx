import { createArticleClient } from '@/api/article';
import { ImageUpLoad } from '@/components/UI/ImageUpLoad';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';

interface FormData {
  title: string;
  content: string;
}

interface ArticleData extends FormData {
  image: string[];
}

const useArticleForm = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = (images: string[]) => {
    setUploadedImages(images);
  };

  const isFormValid =
    formData.title.trim() !== '' &&
    formData.content.trim() !== '' &&
    uploadedImages.length > 0;

  return {
    formData,
    uploadedImages,
    handleChange,
    handleUpload,
    isFormValid,
  };
};

const AddBoardPage: React.FC = () => {
  const router = useRouter();
  const { formData, uploadedImages, handleChange, handleUpload, isFormValid } =
    useArticleForm({ title: '', content: '' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const articleData: ArticleData = {
        ...formData,
        image: uploadedImages,
      };
      await createArticleClient(articleData);
      alert('게시글이 등록되었습니다.');
      router.push('/boards');
    } catch (error) {
      console.error('게시글 등록에 실패했습니다:', error);
      alert('게시글 등록에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 mt-12'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-xl font-bold mb-4'>게시글 쓰기</h1>
        <button
          type='submit'
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!isFormValid}
        >
          등록
        </button>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <p className='font-semibold mb-2'>제목</p>
          <input
            type='text'
            name='title'
            placeholder='제목을 입력해주세요'
            value={formData.title}
            onChange={handleChange}
            className='bg-gray-100 rounded-md p-2 w-full outline-none placeholder:pl-2'
            required
          />
        </div>
        <div>
          <p className='font-semibold mb-2'>내용</p>
          <textarea
            name='content'
            placeholder='내용을 입력해주세요'
            value={formData.content}
            onChange={handleChange}
            className='bg-gray-100 rounded-md p-2 w-full h-40 outline-none placeholder:pl-2'
            required
          />
        </div>
        <div>
          <p className='font-semibold mb-2'>이미지</p>
          <ImageUpLoad onUpload={handleUpload} />
        </div>
      </form>
    </div>
  );
};

export default AddBoardPage;
