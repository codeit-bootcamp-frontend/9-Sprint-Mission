import useToken from "@/hooks/useToken";
import { useRouter } from "next/navigation";

const SignoutMenu = () => {
  const context = useToken();
  const router = useRouter();

  const handleLogout = () => {
    context?.Signout();
    router.push("/");
  }  

  return (
    <div className="absolute top-14 right-4 lg:right-52">
      <button className="w-[139px] pt-4 pb-3 border-[1px] border-[--color-gray300] rounded-lg text-[--color-gray500] bg-white hover:bg-[--color-gray100] z-40 transition-all font-bold" onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default SignoutMenu;