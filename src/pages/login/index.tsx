import React, { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Visible from '@/images/icons/eye-visible.svg';
import Invisible from '@/images/icons/eye-invisible.svg';
import google from '@/images/social/google-logo.png';
import kakao from '@/images/social/kakao-logo.png';
import Logo from '@/images/logo/logo-auth.svg';
import { login, saveToken } from '@/api/auth';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();

  const { setUser } = useAuth();

  const validateEmail = (email: string): boolean =>
    /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = '이메일을 입력해 주세요';
    } else if (!validateEmail(email)) {
      newErrors.email = '잘못된 이메일 형식입니다';
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해 주세요';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        const response = await login({ email, password });
        saveToken(response.accessToken);
        setUser({
          id: response.user.id,
          nickname: response.user.nickname,
          email: response.user.email,
        });
        router.push('/');
      } catch (error) {
        console.error('로그인 실패:', error);
        // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
        setErrors({
          ...errors,
          form: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
        });
      }
    } else {
      // 모든 필드를 touched 상태로 만들어 에러 메시지 표시
      setTouched({
        email: true,
        password: true,
      });
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 px-4'>
      <div className='text-center mb-8'>
        <Link href='/'>
          <Logo />
        </Link>
      </div>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {errors.form && <p className='text-sm text-red-600'>{errors.form}</p>}
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            이메일
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            placeholder='이메일을 입력해주세요'
            required
          />
          {touched.email && errors.email && (
            <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            비밀번호
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
              className='block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='비밀번호를 입력해주세요'
              required
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-0 pr-3 flex items-center'
            >
              {showPassword ? <Invisible /> : <Visible />}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
          )}
        </div>
        <button
          type='submit'
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isFormValid
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-400 cursor-not-allowed'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          로그인
        </button>
      </form>
      <div className='flex mt-6 p-3 justify-between items-center bg-[#E6F2FF] rounded-md'>
        <h3 className='text-base font-medium'>간편 로그인하기</h3>
        <div className='flex justify-center space-x-4'>
          <a href='https://www.google.com/'>
            <Image src={google} alt='구글 로그인' width={40} height={20} />
          </a>
          <a href='https://www.kakaocorp.com/page/'>
            <Image src={kakao} alt='카카오 로그인' width={40} height={20} />
          </a>
        </div>
      </div>
      <div className='flex mt-6 text-center justify-center'>
        <p className='mr-2'> 판다마켓이 처음이신가요?</p>
        <Link href='signup' className='text-blue-500 underline'>
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
