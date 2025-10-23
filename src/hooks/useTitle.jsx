import { useEffect } from "react";

export const useTitle = (title) => {

    useEffect(() => {
        document.title = `${title} - CW E-Store`;
    }, [title]);

  return null;
}
