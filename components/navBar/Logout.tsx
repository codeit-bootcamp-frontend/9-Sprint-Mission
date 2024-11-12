import useToken from "@/hooks/useToken";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Logout = () => {
  const router = useRouter();
  const { setTokens } = useToken();

  const handleLogout = () => {
    setTokens(null, null);
    router.push("/");
  };

  return (
    <motion.div
      className="absolute top-14 right-4 lg:right-52"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <button
        className="w-[139px] pt-4 pb-3 border-[1px] border-panda-gray300 rounded-lg text-panda-gray500 bg-white hover:bg-panda-gray100 z-40 transition-all font-bold"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </motion.div>
  );
};

export default Logout;
