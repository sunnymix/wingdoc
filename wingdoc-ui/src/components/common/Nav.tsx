import { Tabs } from "antd";
import { history } from "umi";
const { TabPane } = Tabs;

interface NavProps {
  defaultActiveKey: any,
}

export default (props: NavProps) => {

  const handleTabClick = (key: any) => {
    history.push(`/${key}`);
  };

  return <>
  <Tabs defaultActiveKey="" onTabClick={handleTabClick}>
    <TabPane tab="Index" key=""></TabPane>
    <TabPane tab="Doc" key="doc"></TabPane>
    <TabPane tab="Task" key="task"></TabPane>
    <TabPane tab="Media" key="media"></TabPane>
  </Tabs>
  </>
};
