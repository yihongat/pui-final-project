import {
  CreatorBase,
  DetailedCreator,
  VideoMetadata,
  VideoUploader,
} from "../common/DataContext/DataContext";

interface InitialVideoMetadata {
  activityControls: string[];
  details?: {
    name: string;
  };
  subtitles?: VideoUploader[];
  time: string;
  title: string;
  titleUrl: string;
}

const addLeadingZero = (n: number) => ("0" + String(n)).slice(-2);

export const preprocessWatchHistoryData = (
  watchHistory: InitialVideoMetadata[]
) => {
  console.log(
    "parse history",
    "2022-12-07T08:14:52.319Z",
    new Date("2022-12-07T08:14:52.319Z")
  );
  return watchHistory.map((video) => ({
    ...video,
    time: new Date(video.time),
  }));
};

export const getVideosForTimeFrame = (
  watchHistory: VideoMetadata[],
  start: Date,
  end: Date
) => {
  const filteredVideos = watchHistory.filter(
    (video) =>
      video.time.getTime() >= start.getTime() &&
      video.time.getTime() <= end.getTime()
  );

  return filteredVideos;
};

export const getVideosWatchedByCreator = (watchHistory: VideoMetadata[]) => {
  const videosWatchedByCreator: { [k: string]: CreatorBase } = {};

  watchHistory.forEach((video) => {
    if (video.subtitles) {
      const creatorName = video.subtitles[0].name;
      const creatorUrl = video.subtitles[0].url;
      if (videosWatchedByCreator[creatorUrl]) {
        videosWatchedByCreator[creatorUrl] = {
          ...videosWatchedByCreator[creatorUrl],
          videosWatched: videosWatchedByCreator[creatorUrl].videosWatched + 1,
        };
      } else {
        videosWatchedByCreator[creatorUrl] = {
          name: creatorName,
          url: creatorUrl,
          videosWatched: 1,
        };
      }
    }
  });
  return videosWatchedByCreator;
};

export const getNumberOfAdsWatched = (watchHistory: VideoMetadata[]) => {
  let adCount = 0;
  watchHistory.forEach((video) => {
    if (video.details) {
      adCount += 1;
    }
  });
  return adCount;
};

export const getVideosWatchedByDay = (
  watchHistory: VideoMetadata[],
  start?: Date,
  end?: Date
) => {
  const videosWatchedByDay: { [k: string]: number } = {};

  if (start && end) {
    const iterateDate = start;
    console.log("iterate", iterateDate);
    while (iterateDate.getTime() <= end.getTime()) {
      const dateString = `${iterateDate.getFullYear()}-${addLeadingZero(
        iterateDate.getMonth() + 1
      )}-${addLeadingZero(iterateDate.getDate())}`;

      videosWatchedByDay[dateString] = 0;
      iterateDate.setDate(iterateDate.getDate() + 1);
    }
  }

  watchHistory.forEach((video) => {
    if (video.subtitles) {
      const dateString = `${video.time.getFullYear()}-${addLeadingZero(
        video.time.getMonth() + 1
      )}-${addLeadingZero(video.time.getDate())}`;
      if (videosWatchedByDay[dateString]) {
        videosWatchedByDay[dateString] += 1;
      } else {
        videosWatchedByDay[dateString] = 1;
      }
    }
  });

  const formattedData = Object.keys(videosWatchedByDay).map((date) => {
    return {
      date: new Date(date),
      videoCount: videosWatchedByDay[date],
    };
  });

  return formattedData;
};

const getIdFromCreatorUrl = (creatorUrl: string) => {
  const creatorUrlParts = creatorUrl.split("/");
  return creatorUrlParts[creatorUrlParts.length - 1];
};

export const getIdsFromCreatorList = (creators: CreatorBase[]) => {
  return creators.map((creator) => getIdFromCreatorUrl(creator.url));
};

export const getDetailedCreatorData = async (
  creators: CreatorBase[]
): Promise<DetailedCreator[]> => {
  try {
    const creatorData = await (
      await fetch(
        `/api/channels/list?id=${getIdsFromCreatorList(creators).join(",")}`
      )
    ).json();
    const creatorIdToDataMap: { [k: string]: any } = {};
    creatorData.items.forEach((data: any) => {
      creatorIdToDataMap[data.id] = {
        description: data.snippet.description ?? "",
        imageUrl: data.snippet.thumbnails.medium ?? "",
      };
    });
    const detailedCreators = creators.map((creator) => {
      const details = creatorIdToDataMap[getIdFromCreatorUrl(creator.url)];
      return {
        ...creator,
        description: details.description,
        imageUrl: details.imageUrl,
      };
    });
    return detailedCreators;
  } catch (e) {
    console.error(e);
    return creators.map((c) => ({
      ...c,
      description: "",
      imageUrl: { url: "", width: 0, height: 0 },
    }));
  }
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const DAY_OF_WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
].map((day) => capitalizeFirstLetter(day));

export const getVideosWatchedByDayOfWeek = (
  watchHistory: VideoMetadata[],
  start?: Date,
  end?: Date
) => {
  const numberOfDaysInTimePeriod: { [k: string]: number } = {};
  const videosWatchedByDay: { [k: string]: number } = {};

  if (start && end) {
    const iterateDate = start;
    while (iterateDate.getTime() <= end.getTime()) {
      const dayOfWeek = DAY_OF_WEEK[iterateDate.getDay()];
      if (numberOfDaysInTimePeriod[dayOfWeek]) {
        numberOfDaysInTimePeriod[dayOfWeek] += 1;
      } else {
        numberOfDaysInTimePeriod[dayOfWeek] = 1;
      }
      iterateDate.setDate(iterateDate.getDate() + 1);
    }
  }

  DAY_OF_WEEK.forEach((day) => {
    videosWatchedByDay[day] = 0;
  });

  watchHistory.forEach((video) => {
    if (video.subtitles) {
      const dayOfWeek = DAY_OF_WEEK[video.time.getDay()];
      if (videosWatchedByDay[dayOfWeek]) {
        videosWatchedByDay[dayOfWeek] += 1;
      } else {
        videosWatchedByDay[dayOfWeek] = 1;
      }
    }
  });

  const averageVideosPerDay = DAY_OF_WEEK.map((day) => {
    return {
      day: day,
      videoCount: videosWatchedByDay[day] / numberOfDaysInTimePeriod[day],
    };
  });

  return averageVideosPerDay;
};

const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const getVideosWatchedByMonth = (watchHistory: VideoMetadata[]) => {
  const videosWatchedByMonth: { [k: string]: number } = {};

  MONTH.forEach((month) => {
    videosWatchedByMonth[month] = 0;
  });

  watchHistory.forEach((video) => {
    if (video.subtitles) {
      const month = MONTH[video.time.getMonth()];
      videosWatchedByMonth[month] += 1;
    }
  });

  const videosByMonth = MONTH.map((month, i) => {
    return {
      month: month,
      videoCount: videosWatchedByMonth[month] / daysInMonth(2022, i),
    };
  });

  return videosByMonth;
};

const HOURS = Array.from(Array(24).keys());

export const getVideosWatchedByHour = (watchHistory: VideoMetadata[]) => {
  const videosWatchedByHour: { [k: string]: number } = {};

  HOURS.forEach((hour) => {
    videosWatchedByHour[hour] = 0;
  });

  watchHistory.forEach((video) => {
    if (video.subtitles) {
      videosWatchedByHour[video.time.getHours()] += 1;
    }
  });

  // Get number of days elapsed in year
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const videosByHour = HOURS.map((hour) => {
    return {
      hour: hour,
      videoCount: videosWatchedByHour[hour] / dayOfYear,
    };
  });

  return videosByHour;
};

export const getHighestKey = (
  dict: { [k: string]: any }[],
  key: string,
  valueKey: string
) => {
  const max = dict.reduce(function (prev, current) {
    return prev[valueKey] > current[valueKey] ? prev : current;
  });
  return max[key];
};

export const getNameFromTimeOfDay = (n: number) => {
  if (n <= 6) {
    return "late night";
  }
  if (n <= 12) {
    return "morning";
  }
  if (n <= 18) {
    return "afternoon";
  }
  if (n <= 24) {
    return "night";
  }
};

export const scaleImageHeight = (newWidth: number, imageObj: any) => {
  return (newWidth * imageObj.height) / imageObj.width;
};

export const scaleImageWidth = (newHeight: number, imageObj: any) => {
  return (newHeight * imageObj.width) / imageObj.height;
};
