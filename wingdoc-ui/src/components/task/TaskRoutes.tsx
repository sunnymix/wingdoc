import { forwardRef } from 'react';

import TaskTable from './TaskTable';

const TaskRoutes = forwardRef((props, ref) => {
  return <>
  <TaskTable/>
  </>
});

export default TaskRoutes;
