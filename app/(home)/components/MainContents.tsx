import { MAIN_CONTENTS } from "../constants/mainContents";
import MainContentsSection from "./MainContentsSection";

const MainContents = () => {
  return (
    <div className="p-6 my-6 flex flex-col space-y-12 lg:space-y-[138px] lg:my-[138px]">
      {MAIN_CONTENTS.map((content, i) => (
        <MainContentsSection key={i} {...content} />
      ))}
    </div>
  );
};

export default MainContents;
