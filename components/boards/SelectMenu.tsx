interface IProps {
  setOrderBy: React.Dispatch<React.SetStateAction<string>>
}

// 모바일 전용 select 메뉴
const SelectMenu = ({ setOrderBy }: IProps) => {
  return (
    <div className="absolute top-14 right-0">
      <div className="flex flex-col items-center justify-center">
        <button type="button" className="mobile-select-menu" onClick={() => setOrderBy("recent")}>최신순</button>
        <button type="button" className="mobile-select-menu" onClick={() => setOrderBy("like")}>좋아요순</button>
      </div>
    </div>
  )
}

export default SelectMenu;