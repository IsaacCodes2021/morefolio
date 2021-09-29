import { useState, useEffect } from "react";
import {
  Box
} from "@mui/material";
import SearchResultCard from "../Cards/SearchResultCard";

function SearchResultsPage({ results, user }) {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.twelvedata.com/symbol_search?symbol=${results}&outputsize=120`
    )
      .then((res) => res.json())
      .then((stockInfo) => {
        setSearchResults(stockInfo.data);
      });
  }, [results]);

  console.log(searchResults);
  return (
    <Box>
      {results ?
       searchResults.map((element) => {
            return (
                <SearchResultCard res={element} user={user}/>
              )
          })
        : null}
    </Box>
  );
}
export default SearchResultsPage;
