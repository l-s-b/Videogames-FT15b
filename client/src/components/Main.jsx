import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearList, getVideogames } from "../redux/actions";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

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
  const videogames = useSelector((state) => state.videogames);
  let thisPage = videogames && videogames.slice(pages, pages + pageSize); // AND PAGE THEM.

  /*const handleClick = (e) => {
     e.preventDefault();
     dispatch(getVideogames(pages, order, filter));
   }Not in use rn... */

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
    if (pages + pageSize > videogames.length) {
      setPages(pages);
    } else {
      setPages(pages + pageSize);
    }
  };

  return (
    <div className="main">
      <h1>This is Henry Games Main.</h1>

      {/* COMMENT LIKE THIS INSIDE JSX. */}
      {/* LOADING GIF */}
      {!thisPage ? (
        <Loading /> //console.log(videogames.map (v => v)),
      ) : (

        <div className="pag-map">
          <SearchBar />
          <div className="select">
            <select>
              <option value="" disabled selected> Sort by </option>
              <option>Rating - 0.0 to 5.0</option>
              <option>Rating - 5.0 to 0.0</option>
              <option>Name - A to Z</option>
              <option>Name - Z to A</option>
            </select>
          </div>
          <input type="button" onClick={pgDn} disabled={pages <= 0} value="<" />
          <span>
            Page {Math.ceil((pages + pageSize) / pageSize)} (results {pages + 1}
            -{pages + pageSize})
          </span>
          <input
            type="button"
            onClick={pgUp}
            disabled={pages + pageSize >= videogames.length}
            value=">"
          />
          {/*Get all videogames from backend (including preloaded and created), then only display what I need to.*/}
          {thisPage.map((v) => (
            <div className="videogame">
              <Link className="link" to={`main/videogame/${v.id}`}>
                <h2>{v.name}</h2>
                <p>{console.log(v.background_image)}</p>
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
          ))}
        </div>
      )}
    </div>
  );
}

export default Main;
