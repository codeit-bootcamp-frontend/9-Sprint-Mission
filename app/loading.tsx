import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-2">
      <Image src={"/icons/logo.png"} alt="로딩 로고" width={50} height={50} />
      <h2 className="lg:text-xl font-bold">잠시만 기다려주세요!</h2>
    </div>
  );
}

export default Loading;