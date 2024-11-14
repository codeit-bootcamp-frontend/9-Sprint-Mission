import { Dispatch, SetStateAction } from "react";

interface SelectMenuProps {
  setOrderBy: Dispatch<SetStateAction<string>>;
}

const SelectMenu = ({ setOrderBy }: SelectMenuProps) => {
  return (
    <div className="absolute top-8 right-0">
      <div className="flex flex-col items-center justify-center">
        <button type="button" className="mobile-select-menu" onClick={() => setOrderBy("recent")}>
          최신순
        </button>
        <button type="button" className="mobile-select-menu" onClick={() => setOrderBy("like")}>
          좋아요순
        </button>
      </div>
    </div>
  );
};

export default SelectMenu;
