import { forwardRef } from "react";
import MediaTable from "@/components/media/MediaTable";



interface MediaFacadeProps {
  id?: string
}

const MediaFacade = forwardRef((props: MediaFacadeProps, ref) => {

  return <>
  <MediaTable></MediaTable>
  </>;
});

export default MediaFacade;
