import React from "react";
import SearchResult from "./SearchResults";

function SearchBar( {queryName, onChangeQuery} ){
    return (
        <div>
            <p>This is SearchBar</p>
            <input type="text" value={queryName} onChange={onChangeQuery} ></input>
            <p>This is the current search: {queryName}</p>
            <SearchResult />
        </div>
    );
}



export default SearchBar;
