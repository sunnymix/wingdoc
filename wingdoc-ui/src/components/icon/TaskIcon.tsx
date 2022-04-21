import Icon from '@ant-design/icons';

// ### start ###

const StartSvg = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3848" width="20" height="20"><path d="M512 853.333333c188.522667 0 341.333333-152.810667 341.333333-341.333333S700.522667 170.666667 512 170.666667 170.666667 323.477333 170.666667 512s152.810667 341.333333 341.333333 341.333333z m0 42.666667c-212.074667 0-384-171.925333-384-384S299.925333 128 512 128s384 171.925333 384 384-171.925333 384-384 384z" fill="#333333" p-id="3849"></path></svg>
)

const StartIcon = (props: any) => <Icon component={StartSvg} {...props} />

const TaskIcon = {
  Start: StartIcon
};

export default TaskIcon;
