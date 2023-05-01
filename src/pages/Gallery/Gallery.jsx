import { Fragment, useEffect, useState, useMemo } from "react";

import "./Gallery.css";
import { map, sortBy } from "lodash";

const getImagePath = (name, path) => {
  if (import.meta.env.MODE === 'development') {
    return `https://picsum.photos/seed/${name}/512/512`
  }

  return `${import.meta.env.BASE_URL}${path}/screenshot.jpeg`
}

const Gallery = () => {
  const [tree, setTree] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}tree.json`)
      .then((res) => res.json())
      .then(setTree, console.error);
  }, [])

  const sortedTree = useMemo( () => sortBy( tree, "meta._mtime").reverse(), [tree]);

  if (!tree) {
    return <div>Loading... ⏳</div>;
  }

  return (
    <Fragment>
      <header>
        <h1>My open-sourced p5js sketches</h1>
      </header>

      {map(sortedTree, ({ sketches, meta: { name, _mtime }}) => (
        <div key={name}>
          <h3 title={new Intl.DateTimeFormat('en-US').format(new Date(_mtime))}>
            {name} ({Object.keys(sketches).length})
          </h3>

          <div className="sketches">
            {map(sketches, ({ meta: { name }, path }) => (
              <div
                className="sketch"
                key={name}
                style={ {
                  backgroundImage: `url(${getImagePath(name, path)})`
                } }
              >
                <a href={`${import.meta.env.BASE_URL}${path}`} >
                  <div className="top">
                    <span>{name}</span>
                  </div>
                </a>

                {/* <div className="bottom"> */}
                  <a
                    target="_blank"
                    className="bottom"
                    href={ `https://github.com/CostardRouge/generative-art-p5js/blob/main/${path}/index.js` }
                  >
                    source code
                  </a>
                {/* </div> */}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div id="social">
          <a href="https://www.instagram.com/costardrouge.jpg/" target="_blank">
            <span>📷&nbsp;</span>
            instagram
          </a>

          <a href="https://www.twitter.com/BlousonRouge" target="_blank">
            <span>🐦&nbsp;</span>
            twitter
          </a>

          <a href="https://github.com/CostardRouge/generative-art-p5js" target="_blank">
            <span>🐙&nbsp;</span>
            github
          </a>
      </div>
    </Fragment>
  );
};

export default Gallery;
