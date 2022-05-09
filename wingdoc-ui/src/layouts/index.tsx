import Nav from '@/components/common/Nav';
import { useEffect } from "react";
import { useLocation } from "umi";
import Style from "./style.css";
import MarkTabs from "@/components/mark/MarkTabs";

export default (props: any) => {

  return (<>
  <div>
    <div className={Style.header}>
      <Nav />
      <MarkTabs />
    </div>
    <div className={Style.body}>{props.children}</div>
  </div>
  </>);
}
