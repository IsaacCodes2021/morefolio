import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import SignupPage from "./components/pages/SignupPage";
import SignInPage from "./components/pages/SignInPage";
import MyAppBar from "./components/MyAppBar";
import UserPage from "./components/pages/UserPage";
import PortfolioPage from "./components/pages/PortfolioPage";
import WatchListPage from "./components/pages/WatchListPage";
import SearchResultsPage from "./components/pages/SearchResultsPage";
import FourmPage from "./components/pages/FourmPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1C6E8C",
    },
    secondary: {
      main: "#5171A5",
    },
    third: {
      main: "#D6F9FF",
      contrastText: "#07020D",
    },
    blackish: {
      main: "#07020D",
      contrastText: "#FFFFFF",
    },
  },
});

function App() {
  const [user, setUser] = useState(false);
  const [searchResults, setSearchResults] = useState(false);
  const [priceData, setPriceData] = useState(false)
  const [tickerForFetch, setTickerForFetch] = useState(false)


  useEffect(() => {
    // checks for user
    fetch("/me")
      .then((r) => r.json())
      .then((userData) => {
        if (userData.errors) {
          console.log(userData.errors)
        } else {
          setUser(userData);
          //setTickerArray(user.portfolio_items)
        }
      });
  }, []);

  function setTickerArray(arrOfObj) {
    const  tickers = arrOfObj.map((portfolioObj) => portfolioObj.ticker)
    setTickerForFetch(tickers)
    console.log("tick array", tickerForFetch)
  }
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MyAppBar
          user={user}
          setUser={setUser}
          setSearchResults={setSearchResults}
          searchResults={searchResults}
        />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/signup">
            <SignupPage setUser={setUser}/>
          </Route>
          <Route path="/signin">
            <SignInPage setUser={setUser} />
          </Route>
          <Route path="/my-account">
            <UserPage user={user} setUser={setUser} />
          </Route>
          <Route path="/my-portfolio">
            <PortfolioPage user={user} priceData={priceData} setPriceData={setPriceData} tickerForFetch={tickerForFetch} setTickerForFetch={setTickerForFetch}/>
          </Route>
          <Route path="/my-watchlists">
            <WatchListPage user={user}/>
          </Route>
          <Route path="/asset-search">
            <SearchResultsPage results={searchResults} user={user} priceData={priceData} setPriceData={setPriceData} tickerForFetch={tickerForFetch} setTickerForFetch={setTickerForFetch}/>
          </Route>
          <Route path="/forum">
            <FourmPage user={user}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
