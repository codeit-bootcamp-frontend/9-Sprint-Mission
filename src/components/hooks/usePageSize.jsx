const usePageSize = ({ setPageSize, getPageSize }) => {
  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
      window.addEventListener('resize', handleResize);
    };

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export default usePageSize;
