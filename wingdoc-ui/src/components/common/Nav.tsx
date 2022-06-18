import { Menu, Dropdown, Space, Button } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { history, useLocation, Link } from "umi";
import { PlusOutlined, CaretDownOutlined } from "@ant-design/icons";
import DocApi from "@/components/doc/api/DocApi";
import "./NavStyle.css";
import moment from "moment";
import MarkTabs from "@/components/mark/MarkTabs";

interface NavItemProps {
  label: ReactNode,
  path?: string,
  key?: string,
};

const handleNewDoc = () => {
  DocApi.addDoc({ title: "", author: "" }, (newDoc: any) => {
    if (newDoc) {
      history.push(`/doc/${newDoc.id}`);
    }
  });
};

const createMenu = (
  <Menu>
    <Menu.Item key="create-doc" onClick={handleNewDoc}>New doc</Menu.Item>
  </Menu>
);

const items: NavItemProps[] = [
  {
    label: "Home",
    path: "/",
    key: "",
  },
  {
    label: "Doc",
    path: "/doc",
    key: "doc",
  },
  {
    label: "Task",
    path: "/task",
    key: "task",
  },
  {
    label: "Calendar",
    path: "/calendar",
    key: "calendar",
  },
  {
    label: "Media",
    path: "/media",
    key: "media",
  }
];

export default (props: any) => {

  // --- active item

  const [activeKey, setActiveKey] = useState<string>("");

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    var key = "";
    if (pathname.startsWith("/doc")) {
      key = "doc";
    } else if (pathname.startsWith("/task")) {
      key = "task";
    } else if (pathname.startsWith("/calendar")) {
      key = "calendar";
    } else if (pathname.startsWith("/media")) {
      key = "media";
    }
    setActiveKey(key);
  }, [pathname]);

  const handleTabClick = (path: any) => {
    if (path) {
      history.push(path);
    }
  };

  // --- ui

  return (
  <div className='nav'>
    {items.map((item: NavItemProps, index: number) => (
      <div key={index} className={`nav_item ${item.key == activeKey ? 'active' : ''}`} onClick={() => handleTabClick(item.path)}>
        <div className='nav_item_active_mask'></div>
        <div style={{zIndex: 2, position: "relative",}}>{item.label}</div></div>
    ))}
    <Dropdown overlay={createMenu} placement="bottomLeft">
      <div className='nav_new_button'>
        <PlusOutlined />
      </div>
    </Dropdown>
  </div>
  )
};
