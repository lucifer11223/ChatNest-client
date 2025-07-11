import { AudioFile as AudioFileIcon, Image as ImageIcon, UploadFile as UploadFileIcon, VideoFile as VideoFileIcon } from '@mui/icons-material';
import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useSendAttachmentsMutation } from '../../redux/api/api';
import { setIsFileMenu, setUploadingLoader } from '../../redux/reducers/misc';

const FileMenu = ({ anchorEl, chatId }) => {

  const { isFileMenu } = useSelector(state => state.misc);

  const dispatch = useDispatch();

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachments] = useSendAttachmentsMutation();

  const closeFileMenu = () => {
    dispatch(setIsFileMenu(false));
  }

  const selectImage = () => imageRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length < 0) {
      return;
    }
    if (files.length > 5) {
      return toast.error("You can only upload 5 files at a time");
    }

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading("Uploading...");
    closeFileMenu();

    try {
      const myForm = new FormData();

      myForm.append("chatId", chatId);
      files.forEach(file => myForm.append("files", file));

      const res = await sendAttachments(myForm);

      if (res?.data) {
        toast.success(`${key} sent successfully`, { id: toastId });
      } else toast.error("Failed to send", { id: toastId });
    } catch (error) {
      toast.error(error.message || "Something went wrong", { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  }

  return (
    <Menu open={isFileMenu} anchorEl={anchorEl} onClose={closeFileMenu} >
      <div style={{ width: "10rem" }}>
        <MenuList>
          <MenuItem onClick={selectImage}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input type='file' accept='image/png, image/jpeg, image/gif' multiple style={{ display: "none" }} onChange={(e) => fileChangeHandler(e, "Images")} ref={imageRef} />
          </MenuItem>



          <MenuItem onClick={selectAudio}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input type='file' accept='audio/mpeg , audio/wav' multiple style={{ display: "none" }} onChange={(e) => fileChangeHandler(e, "Audios")} ref={audioRef} />
          </MenuItem>



          <MenuItem onClick={selectVideo}>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input type='file' accept='video/mp4 , video/webm, video/ogg' multiple style={{ display: "none" }} onChange={(e) => fileChangeHandler(e, "Videos")} ref={videoRef} />
          </MenuItem>


          <MenuItem onClick={selectFile}>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input type='file' accept='*' multiple style={{ display: "none" }} onChange={(e) => fileChangeHandler(e, "Files")} ref={fileRef} />
          </MenuItem>
        </MenuList>

      </div >
    </Menu>
  )
}

export default FileMenu