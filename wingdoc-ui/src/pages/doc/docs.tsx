import DocTable from "@/components/doc/DocTable";
import { useEffect } from "react";
import { useLocation, history } from "umi";
import DocApi from "@/components/doc/DocApi";

export default () => {

  const location: any = useLocation();
  const titleParam = location.query?.title || null;

  useEffect(() => {
    if (titleParam != null) {
      DocApi.getDocByTitle(titleParam, (doc: any) => {
        history.push(`/doc/${doc.id}`);
      });
    }
  }, [titleParam]);

  if (titleParam) {
    // TODO：添加loading状态
    return <>Redirect to: {titleParam}</>;
  } else {
    return <DocTable/>;
  }
};
