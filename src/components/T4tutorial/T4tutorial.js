import React, { useEffect, useState } from "react";
import "./T4tutorial.css";
import { BsSearch } from "react-icons/bs";
import t4icon from "./t4.jpeg";
import axios from "axios";

function T4tutorial() {
  const [query, setquery] = useState("");
  const [results, setresults] = useState([]);
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const handlesearch = (e) => {
    setquery(e.target.value);
  };

  async function search() {
    setresults([]);
    seterror("");
    setloading(true);
    await axios
      .post("http://localhost:5000/search", {
        query: query,
      })
      .then((res) => {
        if (res) {
          if (res.data.Articles) {
            setresults(res.data.Articles);
          } else if (res.data.Msg) {
            seterror(res.data.Msg);
          }
        }
        setloading(false);
      });
  }

  const searchonenter = (e) => {
    const keynum = e.which;
    if (keynum == 13) {
      search().then();
    }
  };

  return (
    <div className="Main">
      <div className="content_container">
        <div className="title">
          <div>
            <img src={t4icon}></img>
          </div>
          <div>
            <h1>Find Articles on T4Tutorial</h1>
          </div>
        </div>

        <div className="Searchbar">
          <div className="input">
            <input onChange={handlesearch} onKeyPress={searchonenter}></input>
          </div>
          <div className="icon">
            <BsSearch onClick={search}></BsSearch>
          </div>
        </div>

        {loading ? (
          <div className="loading"></div>
        ) : (
          <div className="SearchResults">
            {error.length > 0 ? <h1>{error}</h1> : null}
            {results.map((result, i) => (
              <div className="cardcontainer">
                <div>
                  <h2>{result.title}</h2>
                </div>
                <div>
                  <p>{result.body}</p>
                </div>
                <div>
                  <button>
                    <a href={result.link} target="_blank">
                      Read
                    </a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default T4tutorial;
