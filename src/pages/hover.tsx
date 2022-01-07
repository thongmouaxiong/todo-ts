import React from "react";

const Hover = () => {
  return (
    <div className="hover-wrap">
    <h1>Hover over me</h1>
    <div className="hover-text">
      <h1>title</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum architecto debitis iure minus eveniet vitae ab, quod expedita sapiente, perferendis exercitationem accusantium dolore, quibusdam aliquid itaque dolores. A, reiciendis sit.</p>
    </div>
  </div>
  );
};

export default Hover;

// import React, { useState } from "react";
// import { render } from "react-dom";

// const HoverableDiv = (props:any) => {
//   return (
//     <div onMouseOver={props.handleMouseOver} onMouseOut={props.handleMouseOut}>
//       Hover Me
//     </div>
//   );
// };

// const HoverText = () => {
//   return (
//     <div>
//       Hovering right meow!
//       <span role="img" aria-label="cat">
//         🐱
//       </span>
//     </div>
//   );
// };

// const HoverExample = () => {
//   const [isHovering, setIsHovering] = useState(false);
//   const handleMouseOver = () => {
//     setIsHovering(true);
//   };

//   const handleMouseOut = () => {
//     setIsHovering(false);
//   };

//   return (
//     <div>
//       {/* Hover over this div to hide/show <HoverText /> */}
//       <HoverableDiv
//         handleMouseOver={handleMouseOver}
//         handleMouseOut={handleMouseOut}
//       />
//       {isHovering && <HoverText />}
//     </div>
//   );
// };
