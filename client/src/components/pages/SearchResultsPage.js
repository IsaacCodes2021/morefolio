import { useState, useEffect } from "react";
import {
  Box, Typography
} from "@mui/material";
import SearchResultCard from "../Cards/SearchResultCard";

function SearchResultsPage({ results, user, priceData, setPriceData, tickerForFetch, setTickerForFetch }) {
  const [searchResults, setSearchResults] = useState([]);
  console.log("search page: ", tickerForFetch)
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
      { user ?
       searchResults.map((element) => {
            return (
                <SearchResultCard res={element} user={user} priceData={priceData} setPriceData={setPriceData} tickerForFetch={tickerForFetch} setTickerForFetch={setTickerForFetch}/>
              )
          })
        : <Typography>Sign in to use this feature</Typography>}
    </Box>
  );
}
export default SearchResultsPage;
