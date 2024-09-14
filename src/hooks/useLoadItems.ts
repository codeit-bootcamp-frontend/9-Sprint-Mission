import { useCallback, useEffect, useState } from 'react';
import { getPandaItems } from '../api';

export const useLoadItems = (search, page, orderBy)=>{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(10); // 윈도우 너비 width를 받아왔음 -> pageSize setter 호출하기


  setTotalPage(Math.floor(totalCount / pageSize) + 1);

  const loadAllItems = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getPandaItems({ page, pageSize: 10, orderBy, search });
      setAllItems(response.list || []);
      setTotalCount(response.totalCount);
      // console.log(totalPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, orderBy]);

  
  useEffect(() => {
    loadAllItems();
  }, [loadAllItems]);

  return {allItems, loading, error, totalPage}
}