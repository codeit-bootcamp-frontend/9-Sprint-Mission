import { useState } from "react";

function PagiNationTest() {
  const [page, setPage] = useState(1);

  const handlePageChange = () => setPage();

  return <button onClick={handlePageChange}>{page}</button>;
}
