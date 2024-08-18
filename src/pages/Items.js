import { useOutletContext } from "react-router-dom";
import BestItems from "../components/BestItems";
import TotalItems from "../components/TotalItems";
import PageNavigator from "../components/PageNavigator";

export default function Items() {
  const context = useOutletContext();
  return (
    <>
      <BestItems />
      <TotalItems currentPage={context.page} />
      <PageNavigator
        setPage={context.setPage}
        onPageClick={context.handlePageClick}
        currentPage={context.page}
      />
    </>
  );
}
