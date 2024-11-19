import BackToListBtn from "@/components/ui/BackToListBtn";
import Post from "./components/Post";

const BoardDetailPage = () => {
  return (
    <div className="flex flex-col space-y-10">
      <Post /> 
      <BackToListBtn />
    </div>
  );
};

export default BoardDetailPage;
