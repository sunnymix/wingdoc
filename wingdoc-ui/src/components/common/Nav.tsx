import { Menu, Dropdown, Space, Button } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { history, useLocation } from "umi";
import { MoreOutlined, ClockCircleOutlined, PlusOutlined, CaretDownOutlined } from "@ant-design/icons";
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
      zIndex: 100,
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
    }}>
    <div
      style={{
        display: "flex",
        backgroundColor: "#333",
      }}>
        {items.map((item: NavItemProps, index: number) => (
          <div
            key={index}
            onClick={() => handleTabClick(item.path)}
            style={{
              position: "relative",
              cursor: "pointer",
              padding: "0 15px",
              height: "30px",
              lineHeight: "30px",
              fontWeight: 500,
              color: item.key == activeKey ? "#1890ff" : "#fff",
            }}>
              {item.key == activeKey && <div style={{
                zIndex: 1,
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                borderTop: "2px solid #1890ff",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
              }}></div>}
              <div style={{zIndex: 2, position: "relative",}}>{item.label}</div></div>
        ))}
        <Dropdown overlay={createMenu} placement="bottomLeft">
          <div
            style={{
              cursor: "pointer",
              padding: "0 15px",
              height: "30px",
              lineHeight: "30px",
              color: "#fff",
            }}><PlusOutlined />&nbsp;<CaretDownOutlined /></div>
        </Dropdown>
      </div>
    <div
      style={{
        display: "flex",
        backgroundColor: "#fff",
        padding: "0 15px",
        height: "30px",
        lineHeight: "30px",
        borderBottom: "1px solid #eee",
        marginBottom: 15,
      }}>
        <div>Today</div>
      </div>
  </div>
  </>
};
