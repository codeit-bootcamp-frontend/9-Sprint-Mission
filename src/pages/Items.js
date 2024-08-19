import { useOutletContext } from "react-router-dom";
import BestItems from "../components/BestItems";
import TotalItems from "../components/TotalItems";
import PageNavigator from "../components/PageNavigator";

export default function Items() {
  const { page, setPage, handlePageClick } = useOutletContext();

  return (
    <>
      <BestItems />
      <TotalItems currentPage={page} />
      <PageNavigator
        setPage={setPage}
        onPageClick={handlePageClick}
        currentPage={page}
      />
    </>
  );
}
