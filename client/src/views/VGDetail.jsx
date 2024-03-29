import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame, clearDetail } from "../redux/actions";
import { Link, useParams } from "react-router-dom";
import Error404 from "../components/Error404";

function VGDetail() {
  const dispatch = useDispatch();
  const v = useSelector((state) => state.gameByID); // Mapping
  const { id } = useParams();
  const waitgif =
    "https://media2.giphy.com/media/hqTguNdEoA1ooYxeog/giphy.gif?cid=ecf05e4798x5tyb4ea8iouxizlvg4jttm7yuxiz6mq87cb3s&rid=giphy.gif&ct=g";

    useEffect(() => {
    dispatch(getVideogame(id));
    return () => { dispatch(clearDetail()); };
  }, [dispatch, id]);

  switch (v) {
    case undefined: return <img src={waitgif} alt="Undefined. Sorry." />;
    case null: return <Error404 />;
    default: if (!v.name) {
        return <Error404 />;
      } else {
        return (
          <div className="box">
            <h2>{`${v.name}`}</h2>
            <img className="detailPicture" src={v.background_image} alt="" />
            <p>Rating: {v.rating}<span role="img" aria-label="star">⭐</span></p>
            {/*Super weird way to unconvert string into HTML actual tags*/}
            <div dangerouslySetInnerHTML={{ __html: v.description }} />
            <p>Release date: {v.released}</p>
            <div>
              <h3>Genres:</h3>{" "}
              <ul>
                {v.genres && v.genres.map((g) => g.name && <li key={`${g.id}`}>{`${g.name}`}</li>)}
                </ul>
            </div>
            <div>
              <h3>Platforms: </h3>{" "}
              <ul>
                {v.platforms && v.platforms.map((p) => <li key={`${p.platform.id}`}>{`${p.platform.name}`}</li>)}
              </ul>
            </div>
            <div>
              <h3>Stores:</h3>
              <ul>
                {v.stores && v.stores.map((s) => (
                    <li key={`${s.id}`}>
                      <a href={`https://${s.store.domain}`}>{`${s.store.name}`}</a>
                    </li>
                  ))}
              </ul>
            </div>
            <Link to="/main"><button className="btn">Back to Main Page</button></Link>
          </div>
        );
      }
  }
}

export default VGDetail;
