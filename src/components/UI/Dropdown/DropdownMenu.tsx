import {
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import styles from "./DropdownMenu.module.scss";
import DropdownContainer from "./dropdownContainer";
import DropdownButton from "./DropdownButton";
import DropdownItem from "./DropdownItem";
import DropdownLine from "./DropdownLine";

interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleDropdown: () => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

interface DropdownMenuProps {
  children?: ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen, toggleDropdown }}>
      <section className={styles.dropdownMenu}>{children}</section>
    </DropdownMenuContext.Provider>
  );
};

// useDropdown 예외처리
export const useDropdown = () => {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("반드시 DropdownMenuContext 안에서 사용해야 합니다");
  }

  const { isOpen, setIsOpen, toggleDropdown } = context;
  return { isOpen, setIsOpen, toggleDropdown };
};

export const Dropdown = Object.assign(DropdownMenu, {
  Container: DropdownContainer,
  Button: DropdownButton,
  Item: DropdownItem,
  Line: DropdownLine,
});

//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownVisible(!isDropdownVisible);
//   };

//   return (
//     <section className={styles.dropdownMenu}>
//       <button
//         className={styles.sortDropdownTriggerButton}
//         onClick={toggleDropdown}
//       >
//         <Image src={SortIcon} width={30} height={30} alt="sort" />
//       </button>

//       {isDropdownVisible && (
//         <div className={styles.dropdownMenuContainer}>
//           <div
//             className={styles.dropdownItem}
//             onClick={() => {
//               handleSortClick("recent");
//               setIsDropdownVisible(false);
//             }}
//           >
//             최신순
//           </div>
//           <div
//             className={styles.dropdownItem}
//             onClick={() => {
//               handleSortClick("like");
//               setIsDropdownVisible(false);
//             }}
//           >
//             좋아요순
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };
