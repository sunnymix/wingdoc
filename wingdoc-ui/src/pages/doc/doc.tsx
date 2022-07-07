import { useModel, useRouteMatch } from "umi";
import Doc from "@/components/doc/doc/Doc";
import MarkApi from "@/components/mark/MarkApi";

export default () => {
  const route = useRouteMatch();
  const params: any = route.params;

  const { refreshMarks } = useModel("marks", (model: any) => ({
    refreshMarks: model.refreshMarks,
  }));

  MarkApi.addMark(params.docId, () => {
    refreshMarks('/doc/' + params.docId);
  });

  return <Doc id={params.docId}/>;
};
