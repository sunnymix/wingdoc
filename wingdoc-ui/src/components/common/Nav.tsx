import { Menu, Dropdown, Space, Button } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { history, useLocation } from "umi";
import { PlusOutlined, CaretDownOutlined } from "@ant-design/icons";
import DocApi from "@/components/doc/DocApi";

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

  const location = useLocation();

  const pathname = location.pathname;

  const [activeKey, setActiveKey] = useState<string>("");

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

  return <>
  <div
    style={{
      display: "flex",
      borderBottom: "1px solid #eee",
    }}>
      {items.map((item: NavItemProps, index: number) => (
        <div
          key={index}
          onClick={() => handleTabClick(item.path)}
          style={{
            cursor: "pointer",
            paddingTop: 10,
            paddingBottom: 10,
            marginRight: 30,
            borderStyle: "solid",
            color: item.key == activeKey ? "#1890ff" : "#333",
            borderColor: item.key == activeKey ? "#1890ff" : "transparent",
            borderWidth: "0 0 2px 0",
          }}>{item.label}</div>
      ))}
      <Dropdown overlay={createMenu} placement="bottomLeft">
        <div
          style={{
            cursor: "pointer",
            padding: 10,
          }}><PlusOutlined/>&nbsp;<CaretDownOutlined/></div>
      </Dropdown>
    </div>
  <div
    style={{
      marginBottom: 15,
      display: "flex",
      borderBottom: "1px solid #eee",
    }}>Doc History</div>
  </>
};
