import { useRouteMatch } from "umi";
import Doc from "@/components/doc/Doc";

export default () => {
  const route = useRouteMatch();
  const params: any = route.params;
  const docId = params.docId;

  return <Doc id={docId}/>;
};
