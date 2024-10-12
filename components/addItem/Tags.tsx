import Image from "next/image";

interface IProps {
  currentTags: 
}

const Tags = () => {
  return (
    <div className="flex flex-col space-y-4">
      <label htmlFor="itemTag" className="text-lg font-bold">
        태그
      </label>
      <div className="flex flex-col space-y-3">
        <input
          {...register("itemTag")}
          onChange={handleChangeTag}
          onKeyDown={handleTagKeyDown}
          type="text"
          id="itemTag"
          name="itemTag"
          value={tagInput}
          className="bg-[--color-gray100] px-6 py-4 rounded-xl"
          placeholder="태그를 입력해주세요"
        />
        <ul className="flex items-center space-x-3 flex-wrap gap-y-3">
          {tags?.map((tag) => (
            <li
              key={tag.tag}
              className="px-3 py-[6px] bg-[--color-gray100] rounded-full flex items-center space-x-[10px]"
            >
              <span>{tag.tag}</span>
              <button
                type="button"
                className="flex items-center justify-center"
                onClick={() => handleDeleteTag(tag.tag)}
              >
                <Image src="/icons/delete.png" alt="삭제" width={20} height={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tags;
