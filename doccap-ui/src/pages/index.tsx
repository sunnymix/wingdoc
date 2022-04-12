import styles from './index.less';
import { Row, Col, Tabs, Select, Space, Typography } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";

import Doc from '@/components/doc/Doc';

const { TabPane } = Tabs;
const { Option } = Select;

export default function Page() {

  return (
    <Router basename='/doccap-ui/'>
      <Switch>
        <Route
          path="/:module?/:p1?/:p2?"
          render={({ match, history }) => {
            return (
              <div
                style={{
                  padding: 10
                }}>
                <Tabs
                  size="middle"
                  defaultActiveKey={match.params.module || "index"}
                  onTabClick={ key => history.push(`/${key}`)}
                >
                  <TabPane tab="Index" key="index">
                    Index
                  </TabPane>
                  <TabPane tab="Doc" key="doc">
                    <Doc id={match.params.p1}/>
                  </TabPane>
                </Tabs>
              </div>
            );
          }}
        />
      </Switch>
    </Router>
  );
};
