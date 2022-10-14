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
      <header>
        <h1 hidden>&lt;Gallery author="costadrouge"/&gt;</h1>
        <h1>My open-sourced p5js sketches</h1>

        <a href="https://www.instagram.com/costardrouge.jpg/" target="_blank">
          instagram
        </a>
        <span>&nbsp;</span>

        <a href="https://www.twitter.com/BlousonRouge" target="_blank">
          twitter
        </a>
      </header>

      <ul>
        {map(tree, (sketches, branch) => (
          <li key={branch}>
            <h3>{branch} ({Object.keys(sketches).length})</h3>
            <ul>
              {map(sketches, ({ meta: { name }, path }) => (
                <li key={name} className="sketch">
                  <a href={`${import.meta.env.BASE_URL}${path}`}>
                    {/* <img src={ `https://picsum.photos/seed/${name}/512/512` }/> */}
                    <img src={`${import.meta.env.BASE_URL}${path}/screenshot.jpeg`}/>
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
