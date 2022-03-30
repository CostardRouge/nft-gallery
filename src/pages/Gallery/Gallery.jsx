import { useEffect, useState } from "react";

import "./Gallery.css";
import { map } from "lodash";

const Gallery = () => {
  const [tree, setTree] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}tree.json`)
      .then((res) => res.json())
      .then(setTree, console.error);
  }, [])

  if (!tree) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 hidden>
        NFT Gallery{" - "}
        <a href="https://www.twitter.com/BlousonRouge" target="_blank">
          @BlousonRouge
        </a>
      </h2>

      <ul>
        {map(tree, (sketches, sketchTheme) => (
          <li key={sketchTheme}>
            <h3>{sketchTheme}</h3>
            <ul>
              {map(sketches, ({ meta: { name }, path }) => (
                <li key={name}>
                  <img src={`${import.meta.env.BASE_URL}${path}/screenshoot.png`}/>
                  {/* <img src="https://via.placeholder.com/512x512"/> */}
                  {/* <img src="https://costardrouge.github.io/generative-art-p5js/sketches/3d-star/hsb/screenshoot.png"/> */}
                  <a href={`${import.meta.env.BASE_URL}${path}`}>
                    {name}
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
