import Nav from '@/components/common/Nav';
import styles from './index.less';
import TaskTable from '@/components/task/TaskTable';
import Text from '@/components/common/text/Text';

export default () => {
  return (
  <>
    <Text value='Human beings ... are very much at the mercy of the particular language which has become the medium of expression for their society. It is quite an illusion to imagine that one adjusts to reality essentially without the use of language and that language is merely an incidental means of solving specific problems of communication and reflection. The fact of the matter is that the “real world” is to a large extent unconsciously built up on the language habits of the group.' />
    <br />
    <TaskTable />
  </>);
};
