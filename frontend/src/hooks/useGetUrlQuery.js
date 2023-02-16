import { useLocation } from "react-router-dom";

function useGetUrlQuery(key) {
    return new URLSearchParams(useLocation().search).get(key);
}

export default useGetUrlQuery;
