import { useEffect, useState, useMemo } from "react";

import "./Gallery.css";
import { map, sortBy } from "lodash";

// https://picsum.photos/512

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

  const sortedTree = useMemo( () => sortBy( tree, "meta._mtime"), [tree]);

  if (!tree) {
    return <div>Loading... ⏳</div>;
  }

  return (
    <div>
      <header>
        <h1>My open-sourced p5js sketches</h1>

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
      </header>

      <ul>
        {map(sortedTree, ({ sketches, meta: { name, _mtime }}) => (
          <li key={name}>
            <h3
              title={new Intl.DateTimeFormat('en-US').format(new Date(_mtime))}
            >
              {name} ({Object.keys(sketches).length})
            </h3>
            <ul>
              {map(sketches, ({ meta: { name }, path }) => (
                <li key={name} className="sketch">
                  <a href={`${import.meta.env.BASE_URL}${path}`}>
                    <a
                      className="github"
                      target="_blank"
                      href={ `https://github.com/CostardRouge/generative-art-p5js/blob/main/${path}/index.js` }
                    >
                      source code
                    </a>

                    <img src={getImagePath(name, path)}/>
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
