import { useRouteMatch } from "umi";
import Doc from "@/components/doc/Doc";

export default () => {
  const route = useRouteMatch();
  const params: any = route.params;

  return <Doc id={params.docId}/>;
};
