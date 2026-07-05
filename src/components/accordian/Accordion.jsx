import React from "react";
import "./Accordion.css";
import AccordionItem from "./AccordionItem";

const Accordion = ({ accname, itemcards = [], downkey, setshowindex, index, showindex }) => {
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={() => index === showindex ? setshowindex(-1) : setshowindex(index)}>
        <h3>{`${accname} (${itemcards.length})`}</h3>
        <span className={`accordion-chevron${downkey ? " open" : ""}`}>▾</span>
      </div>

      {downkey && (
        <div className="accordion-body">
          {itemcards.map((item, idx) => {
            const info = item?.card?.info;
            if (!info) return null;
            return <AccordionItem iteminfo={info} key={info.id || idx} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Accordion;
