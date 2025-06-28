import moment from "moment";

const fileFormat = (url = "") => {
  const fileExt = url.split('.').pop();

  if (fileExt == "mp4" || fileExt == "webm" || fileExt == "ogg") {
    return "video";
  }
  if (fileExt == "mp3" || fileExt == "wav" || fileExt == "flac") {
    return "audio";
  }
  if (fileExt == "jpg" || fileExt == "jpeg" || fileExt == "png" || fileExt == "gif") {
    return "image";
  }
  return "file";
}

const transFormImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

  return newUrl;

};

const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7Days.unshift(dayName);
  }
  return last7Days
}

const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get) {
    try {
      const item = localStorage.getItem(key);
      if (!item || item === "undefined") return null;
      return JSON.parse(item);
    } catch (error) {
      console.warn(`❌ Failed to parse localStorage item for key "${key}"`, error);
      return null;
    }
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};


export { fileFormat, getLast7Days, getOrSaveFromStorage, transFormImage };
