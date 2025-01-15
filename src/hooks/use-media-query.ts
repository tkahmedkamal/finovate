import { useEffect, useState } from 'react';

const useMediaQuery = (query: string) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches);
    };

    setValue(media.matches);

    media.addEventListener('change', onChange);

    return () => {
      media.removeEventListener('change', onChange);
    };
  }, [query]);

  return value;
};

export default useMediaQuery;
