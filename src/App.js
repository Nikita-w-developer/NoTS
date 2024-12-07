import React from "react";

import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import EmptyCart from "./pages/EmptyCart";

import { Route, Routes } from "react-router-dom";

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/NoTS/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/Cart" element={<Cart />}></Route>
            <Route path="/emptyCart" element={<EmptyCart />}></Route>
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
