import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";

function SummaryBox(props) {
  const {
    text,
    modalHeader,
    style,
    img,
    menuDirection,
    listArray,
    name,
    c_school,
  } = props;
  const [schoolName, setSchoolName] = useState(c_school);
  const [isOpen, setIsOpen] = useState(false);
  var menuStyle;
  if (menuDirection === "left") {
    menuStyle = { left: 0 };
  } else {
    menuStyle = { right: 0 };
  }
  const handleSelect = (schoolName) => {
    const details = document.querySelectorAll("details");
    details[0].removeAttribute("open");
    setSchoolName(schoolName);
  };
  return (
    <details className="menu noselect">
      <summary
        style={style}
        className="no-underline option-header btn-link color-text-primary text-bold width-full border-all white"
        title="Switch account context"
        data-ga-click="Dashboard, click, Opened account context switcher - context:user"
        aria-haspopup="menu"
        role="button"
      >
        {img ? (
          <img src={img} height="20px" width="20px" className="summary-image" />
        ) : schoolName ? (
          <span
            className="list-image"
            style={{ float: "left", marginLeft: "0", lineHeight: 1.5 }}
          >
            {schoolName.charAt(0)}
          </span>
        ) : (
          ""
        )}

        <span className="css-truncate css-truncate-target ml-1 ">
          {text ? text : schoolName}
        </span>
        <span className="dropdown-caret"></span>
      </summary>
      <div className="details-menu" style={menuStyle}>
        <div className="select-menu-modal-left border-all border-color-third white">
          {modalHeader ? (
            <div className="menu-header full-width border-bottom border-color-primary">
              {modalHeader}
            </div>
          ) : (
            ""
          )}
          <div className="modal-list">
            {listArray
              ? listArray.map((item) => (
                  <label htmlFor={item.id} key={item.id}>
                    <div className="list-item">
                      <span className="checked">
                        <CheckIcon
                          style={{
                            position: "absolute",
                            marginLeft: "4px",
                            width: "18px",
                            display:
                              item.name === schoolName ? "block" : "none",
                          }}
                        />
                      </span>
                      <input
                        type="radio"
                        name={name}
                        id={item.id}
                        value={item.id}
                        defaultChecked={item.name === c_school ? true : false}
                        onClick={() => handleSelect(item.name)}
                        style={{ display: "none" }}
                      />

                      <span className="list-image">{item.name.charAt(0)}</span>
                      <span>{item.name}</span>
                    </div>
                  </label>
                ))
              : ""}
          </div>
        </div>
      </div>
    </details>
  );
}

export default SummaryBox;
