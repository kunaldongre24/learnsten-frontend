import React from "react";

function SummaryBox(props) {
  const { text, modalHeader } = props;
  return (
    <details className="menu noselect">
      <summary
        className="no-underline option-header btn-link color-text-primary text-bold width-full border-all border-color-third white"
        title="Switch account context"
        data-ga-click="Dashboard, click, Opened account context switcher - context:user"
        aria-haspopup="menu"
        role="button"
      >
        <span className="css-truncate css-truncate-target ml-1 ">{text}</span>
        <span className="dropdown-caret"></span>
      </summary>
      <div className="details-menu">
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
