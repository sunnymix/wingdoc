import Nav from '@/components/common/Nav';
import "./style.css";
import MarkTabs from "@/components/mark/MarkTabs";

export default (props: any) => {

  return (
  <div>
    <div className='header'>
      <Nav />
      <MarkTabs />
    </div>
    <div className='body'>{props.children}</div>
  </div>
  );
}
