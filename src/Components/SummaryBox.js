import React from "react";

function SummaryBox(props) {
  const { text, modalHeader, style, img, menuDirection } = props;
  var menuStyle;
  if (menuDirection === "left") {
    menuStyle = { left: 0 };
  } else {
    menuStyle = { right: 0 };
  }
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
        ) : (
          ""
        )}

        <span className="css-truncate css-truncate-target ml-1 ">{text}</span>
        <span className="dropdown-caret"></span>
      </summary>
      <div className="details-menu" style={menuStyle}>
        <div className="select-menu-modal-left border-all border-color-third white">
          <div className="menu-header full-width border-bottom border-color-primary">
            {modalHeader}
          </div>
        </div>
      </div>
    </details>
  );
}

export default SummaryBox;
