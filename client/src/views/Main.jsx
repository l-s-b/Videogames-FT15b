import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearList, getVideogames } from "../redux/actions";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import Error404 from "../components/Error404";

function Main() {
  const dispatch = useDispatch();
  const pageSize = 15;
  const [pages, setPages] = useState(0);
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getVideogames(pages, order, filter));
  }, [dispatch, pages, order, filter]);

  //BRING VIDEOGAMES FROM REDUX
  const prePagination = useSelector((state) => state.videogames);

  //SORTING FAUX REDUCER
  switch(order) {
    case "ratingAsc":
    prePagination.sort((a, b) => a.rating - b.rating);
    console.log("RATING ASC: ", prePagination.sort((a, b) => a.rating - b.rating));
    break;
    case "ratingDesc":
    prePagination.sort((a, b) => b.rating - a.rating);
    console.log("RATING DESC: ", prePagination.sort((a, b) => b.rating - a.rating));
    break;
    case "nameAsc":
    prePagination.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    console.log(
      "NAME ASC: ", prePagination.sort(
        (a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
        ));
    break;
    case "nameDesc":
    prePagination.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
    console.log(
      "NAME DESC: ", prePagination.sort(
        (a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
        ).reverse());
    break;
    default: break;
    }

    //PAGINATION REDUCER
  let thisPage = prePagination && prePagination.slice(pages, pages + pageSize); // AND PAGE THEM.

  // LIST REFRESHER
  const handleReset = (e) => {
     e.preventDefault();
     dispatch(getVideogames(pages, order, filter));
   }

  //FILTERS
  const handleFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value)
  }

  //SORTING
  const handleSort = (e) => {
    e.preventDefault();
setOrder(e.target.value);
  }

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

  //RENDERING
  return (
    <div className="main">
      {/* LOADING GIF */}
      {!thisPage ? (
        <Loading /> //console.log(videogames.map (v => v)),
      ) : (

        <div className="pag-map">
          <input type="button" onClick={handleReset} value="RESET ALL QUERIES" />
          <SearchBar />
           {/* SORT */}
          <div className="select">
            <select onChange={handleSort} defaultValue="">
              <option value="" disabled> Sort by </option>
              <option value="ratingAsc">Rating - 0.0 to 5.0</option>
              <option value="ratingDesc">Rating - 5.0 to 0.0</option>
              <option value="nameAsc">Name - A to Z</option>
              <option value="nameDesc"> Name - Z to A</option>
            </select>
          </div>
          {/* ORIGIN FILTER */}
          <div className="select">
            <select /*onChange={e => changeFilter(e)}*/ defaultValue="">
              <option value="" disabled> Filter by origin... </option>
              <option value="false">Existing</option>
              <option value="true">Custom</option>
            </select>
          </div>
          <input type="button" onClick={pgDn} disabled={pages <= 0} value="<" />
          <span>
            Page {Math.ceil((pages + pageSize) / pageSize)} (results {pages + 1}
            -{pages + thisPage.length})
          </span>
          <input
            type="button"
            onClick={pgUp}
            disabled={pages + pageSize >= prePagination.length}
            value=">"
          />
          {/*Get all videogames from backend (including preloaded and created), then only display what I need to.*/}
          {/* console.log(thisPage); */}
           {Array.isArray(thisPage) ? thisPage.map((v) => (
            <div className="box">
              <Link className="link" to={`main/videogame/${v.id}`}>
                <h2>{v.name}</h2>
                <img className="picture" src={v.background_image} alt="" />
                <p>
                  <ul>
                    {v.genres && v.genres.map((g) => <li>{`${g.name}`}</li>)}
                  </ul>
                </p>
                <p>
                  {v.rating}
                  <span role="img" aria-label="star">
                    ⭐
                  </span>
                </p>
              </Link>
            </div>
          ))
        : <Error404 />}
        </div>
      )}
    </div>
  );
}

export default Main;