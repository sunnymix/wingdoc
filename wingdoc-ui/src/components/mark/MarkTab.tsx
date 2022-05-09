import { forwardRef } from "react";
import { Mark } from "./MarkTabs";
import { Badge, Dropdown, Menu } from "antd";
import Style from "./MarkTabsStyle.css";
import { Link, history } from "umi";
import MarkApi from "./MarkApi";
import { MoreOutlined, RightOutlined, CloseCircleOutlined, MinusCircleOutlined, MinusSquareOutlined, CloseOutlined, CaretDownOutlined } from "@ant-design/icons";

export interface MarkTabProps {
  mark: Mark,
  onDelete?: Function,
};

export default forwardRef((props: MarkTabProps, ref) => {

  // --- props

  const { mark, onDelete } = props;

  // --- delete mark

  const handleDeleteMark = () => {
    MarkApi.deleteMark(mark.docId, () => {
      onDelete?.call(null, mark);
    });
  };

  const displayTitle = (mark: Mark) => {
    if (mark.docTitle && mark.docTitle.length > 0) {
      return mark.docTitle;
    }
    return "untitled";
  };

  // --- ui more

  const moreMenu = (
    <Menu>
      <Menu.Item key="delete-mark" onClick={handleDeleteMark}>Delete mark</Menu.Item>
    </Menu>
  );

  // --- ui

  return (
    <div className={Style.marks_tabs_item} key={mark.id}>
      <div className={Style.marks_tabs_item_divider}></div>
      {mark.focus && <div className={Style.marks_tabs_item_focus}></div>}
      <Link className={Style.marks_tabs_item_link} to={`/doc/${mark.docId}`} style={{color: mark.focus ? "#333" : "#666"}}>{displayTitle(mark)}</Link>
      <Dropdown overlay={moreMenu} placement="bottomLeft">
        <div className={Style.nav_new_button}>
          <button className={Style.marks_tabs_item_delete}><MoreOutlined /></button>
        </div>
      </Dropdown>
    </div>
  )
});
