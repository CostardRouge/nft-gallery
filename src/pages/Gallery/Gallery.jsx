import "./Gallery.css";
import { map } from "lodash";

const Gallery = ({ tree }) => {
  return (
    <div>
      <h2>
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
              {map(sketches, ({ name, _path }) => (
                <li key={name}>
                  <a
                    href={`/generative-art-p5js/sketches/${sketchTheme}/${name}`}
                  >
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
