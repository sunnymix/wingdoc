import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { history, useLocation } from "umi";
const { TabPane } = Tabs;

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

  const handleTabClick = (key: any) => {
    history.push(`/${key}`);
  };

  return <>
  <Tabs activeKey={activeKey} defaultActiveKey="" onTabClick={handleTabClick}>
    <TabPane tab="Home" key=""></TabPane>
    <TabPane tab="Doc" key="doc"></TabPane>
    <TabPane tab="Task" key="task"></TabPane>
    <TabPane tab="Calendar" key="calendar"></TabPane>
    <TabPane tab="Media" key="media"></TabPane>
  </Tabs>
  </>
};
