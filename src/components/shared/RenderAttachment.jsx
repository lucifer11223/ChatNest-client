import { FileOpen as FileOpenIcon } from '@mui/icons-material';
import { transFormImage } from '../../lib/features';

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} preload='none' controls width={"200px"} />;
    case "audio":
      return <audio src={url} preload='none' controls />;
    case "image":
      return <img src={transFormImage(url, 200)} controls width={"200px"} height={"150px"} />;
    default:
      return (
        <FileOpenIcon />
      );
  }
}

export default RenderAttachment