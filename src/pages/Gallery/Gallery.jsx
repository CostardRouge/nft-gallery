import { useEffect, useState, useMemo } from "react";

import "./Gallery.css";
import { map, sortBy, keyBy,forEach } from "lodash";

const Gallery = () => {
  const [tree, setTree] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}tree.json`)
      .then((res) => res.json())
      .then(setTree, console.error);
  }, [])

  const sortedTree = useMemo( () => {
    // const treeKeyByMtime = keyBy( tree, "meta._mtime");
    // const cleanedTree = forEach( treeKeyByMtime, (_, branch) => {
    //   delete treeKeyByMtime[branch]?._mtime;
    // });

    // console.log({cleanedTree});

    return sortBy( tree, "meta._mtime").reverse()
  }, [tree]);

  console.log(sortedTree);

  if (!tree) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>
        <h1 hidden>&lt;Gallery author="costadrouge"/&gt;</h1>
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
