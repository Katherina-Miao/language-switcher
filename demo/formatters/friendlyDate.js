export function friendlyDate (sTime, language) {
  let dTime, dDay, dYear,
      cTime = Date.parse(new Date()) / 1000

    if (typeof sTime === 'string') {
        //sTime为Y-m-d H:i:s格式的日期字符串
        if (sTime.length === 19) {
            sTime = getUnixTime(sTime)
        }

        sTime = parseInt(sTime)
    }

    //如果是未来时间就显示0
    if(sTime > cTime){
        sTime = cTime
    }

    dTime = cTime - sTime
    dDay = dTime / 3600 / 24;
    dYear = parseInt((new Date(cTime)).getYear()) - parseInt((new Date(sTime)).getYear());

    if (language === 'en-US') {
      if (dTime < 60) {
          return dTime + "seconds ago"
      } else if (dTime < 3600) {
          return parseInt(dTime / 60) + "minutes ago"
      } else if (dTime >= 3600 && dDay <= 1) {
          return parseInt(dTime / 3600) + "hours ago"
      } else if (dDay > 0 && dDay < 7) {
          return parseInt(dDay) + "days ago"
      } else if (dDay >= 7 && dDay < 30) {
          return parseInt(dDay / 7) + 'weeks ago'
      } else if (dDay >= 30 && dDay < 365) {
          return parseInt(dDay / 30) + 'months ago'
      } else if (dDay >= 365) {
          return parseInt(dDay / 365) + 'yeas ago'
      }
    } else {
      if (dTime < 60) {
          return dTime + "秒前"
      } else if (dTime < 3600) {
          return parseInt(dTime / 60) + "分钟前"
      } else if (dTime >= 3600 && dDay <= 1) {
          return parseInt(dTime / 3600) + "小时前"
      } else if (dDay > 0 && dDay < 7) {
          return parseInt(dDay) + "天前"
      } else if (dDay >= 7 && dDay < 30) {
          return parseInt(dDay / 7) + '周前'
      } else if (dDay >= 30 && dDay < 365) {
          return parseInt(dDay / 30) + '个月前'
      } else if (dDay >= 365) {
          return parseInt(dDay / 365) + '年前'
      }
    }
}
