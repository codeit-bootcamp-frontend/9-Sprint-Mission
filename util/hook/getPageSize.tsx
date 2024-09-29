import { useEffect, useState } from 'react';

type PageSize = 'mobile' | 'tablet' | 'pc';

const GetPageSize = (): PageSize => {
    const [pageWidth, setPageWidth] = useState<PageSize>('mobile');

    useEffect(() => {
        const handleResize = () => {
            const width: number = window?.innerWidth;

            if (width < 767) {
                setPageWidth('mobile');
            } else if (width < 1200) {
                setPageWidth('tablet');
            } else {
                setPageWidth('pc');
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return pageWidth;
};

export default GetPageSize;
