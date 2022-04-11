import styles from './index.less';
import { Row, Col, Tabs, Select, Space, Typography } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";

const { TabPane } = Tabs;
const { Option } = Select;

export default function Page() {
  return (
    <Router basename='/doccap-ui/'>
      <Switch>
        <Route
          path="/:page?"
          render={({ match, history }) => {
            return (
              <div>
                <Tabs
                  centered
                  size="middle"
                  defaultActiveKey={match.params.page || "doc"}
                  onChange={ key => history.push(`/${key}`)}
                >
                  <TabPane tab="Doc" key="doc">
                    Doc
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
