import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres } from "../redux/actions";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import Error404 from "../components/Error404";

function Main() {

  //STATES

  const pageSize = 15;
  const [pages, setPages] = useState(0);
  const [genreFilter, setGenreFilter] = useState(null);
  const [originFilter, setOriginFilter] = useState("");
  const [order, setOrder] = useState("");

  //HOOKS
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideogames(pages, order, genreFilter, originFilter));
    dispatch(getGenres());
  }, [pages, order, genreFilter, originFilter]);

  //BRING VIDEOGAMES (and genres! For the genre filter) FROM REDUX
  const foundGenres = useSelector((state) => state.genres);
  let prePagination = useSelector((state) => state.videogames);

  //SORTING FAUX REDUCER
  switch (order) {
    case "ratingAsc":
      prePagination && prePagination.sort((a, b) => a.rating - b.rating);
      break;
    case "ratingDesc":
      prePagination && prePagination.sort((a, b) => b.rating - a.rating);
      break;
    case "nameAsc":
      prePagination && prePagination.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      break;
    case "nameDesc":
      prePagination && prePagination
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
        .reverse();
      break;
    default: break;
  }
// ORIGIN FAUX REDUCER
if (prePagination && prePagination.length && originFilter) {
  switch (originFilter) {
    case "true":
      prePagination = prePagination.filter(g => g.created);
      break;
    case "false":
      prePagination = prePagination.filter(g => !g.created);
      break;
    default: break;
  }
};
  // GENRE FAUX REDUCER
  if (prePagination && prePagination.length && genreFilter) {
    if (genreFilter === "All") { prePagination; } else {
    prePagination = prePagination.filter(game => game["genres"] && game["genres"].some(gg => gg.name === genreFilter));
  };
}

  //PAGINATION REDUCER
  let thisPage = prePagination && prePagination.slice(pages, pages + pageSize); // AND PAGE THEM.

  // LIST REFRESHER
  const handleReset = (e) => {
    e.preventDefault();
    dispatch(getVideogames(/* pages, order, genreFilter, originFilter */));
  };

  //FILTERS
  const handleGenre = (e) => {
    e.preventDefault();
    setGenreFilter(e.target.value);
  };
  const handleOrigin = (e) => {
    e.preventDefault();
    setOriginFilter(e.target.value);
  };

  //SORTING
  const handleSort = (e) => {
    e.preventDefault();
    setOrder(e.target.value);
  };

  //PAGINATION
  const pgDn = (e) => {
    e.preventDefault();
    if (pages <= 0) {
      setPages(0);
    } else {
      setPages(pages - pageSize);
    }
  };
  const pgUp = (e) => {
    e.preventDefault();
    if (pages + pageSize > prePagination.length) {
      setPages(pages);
    } else {
      setPages(pages + pageSize);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //RENDERING
  return (
    <div className="main">
      {/* LOADING GIF */}
      {thisPage === undefined || null ? (
        <Loading />
      ) : (
        <div className="pag-map">
          <input type="button" onClick={handleReset} value="RESET ALL QUERIES" />
          <SearchBar />
          {/* SORT */}
          <div className="select">
            <select onChange={handleSort} defaultValue="">
              <option value="" disabled>Sort by:</option>
              <option value="ratingAsc">Rating - 0.0 to 5.0</option>
              <option value="ratingDesc">Rating - 5.0 to 0.0</option>
              <option value="nameAsc">Name - A to Z</option>
              <option value="nameDesc"> Name - Z to A</option>
            </select>
          </div>

          {/* ORIGIN FILTER */}
          <div className="select">
            <select onChange={handleOrigin} defaultValue="">
              <option value="" disabled>Filter by origin...</option>
              <option value="false">Existing</option>
              <option value="true">Custom</option>
              <option value="both">All</option>
            </select>
          </div>

          {/* GENRE FILTER */}
          <div className="select">
            <select onChange={handleGenre} defaultValue="">
            <option value="" disabled>Filter by genre...</option>
                {foundGenres.map(g =>
               <option value={`${g.name}`}>{`${g.name}`}</option>
                )}
            <option value="All" >All</option>
            </select>
          </div>

          {/* PAGINATION BUTTONS ON TOP */}
          <input type="button" onClick={pgDn} disabled={pages <= 0} value="<" />
          <span>
            Page {Math.ceil((pages + pageSize) / pageSize)}
            (results {pages + 1}-{pages + thisPage.length})
          </span>
          <input type="button" onClick={pgUp}
            disabled={pages + pageSize >= prePagination.length} value=">"/>

          {/*Get all videogames from backend (including preloaded and created),
          then only display what I need to.*/}
          {Array.isArray(thisPage) && thisPage.length ?
          <div className="cards">
            {thisPage.map((v) => (
              <Link className="link" to={`main/videogame/${v.id}`}>
                <div className="card">
                  <div className="cardTitle">
                    <h2 className="title">{v.name}</h2>
                    <div className="gradient" />
                  </div>
                  <img className="cardPicture" src={v.background_image} alt="" />
                  <ul className="cardGenres">
                    {v.genres && v.genres.map((g) =>
                      <li className="eachGenre" key={`${g.id}`}>{`${g.name}`}</li>
                    )}
                  </ul>
                  <p className="rating">
                    {v.rating}<span role="img" aria-label="star">⭐</span>
                  </p>
                </div>
              </Link>
            ))}
          </div> : (
            <Error404 />
          )}
          {/* PAGINATION BUTTONS AT THE BOTTOM */}
          <input type="button" onClick={pgDn} disabled={pages <= 0} value="<" />
          <span>
            Page {Math.ceil((pages + pageSize) / pageSize)}
            (results {pages + 1}-{pages + thisPage.length})
          </span>
          <input
            type="button"
            onClick={pgUp}
            disabled={pages + pageSize >= prePagination.length}
            value=">"
          />
        </div>
        )
      }
    </div>
  )
};

export default Main;
