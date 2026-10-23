// Yemot HaMashiach streaming API
// GET /api/yemot                 -> menu
// GET /api/yemot?item=1          -> MP3 stream
// GET /api/yemot?item=2          -> low-bandwidth MP3 stream
// GET /api/yemot?item=3          -> HLS stream
//
// The included Radio Mast reference streams are licensed for free personal
// and commercial use according to https://www.radiomast.io/reference-streams.
// They are test/reference streams, not Israeli radio stations.

const streams = {
  "1": {
    name: "מוזיקת רקע באיכות גבוהה",
    url: "https://streams.radiomast.io/ref-128k-mp3-stereo",
  },
  "2": {
    name: "מוזיקת רקע חסכונית לשיחות",
    url: "https://streams.radiomast.io/ref-32k-mp3-mono",
  },
  "3": {
    name: "מוזיקת רקע בפורמט HLS",
    url: "https://streams.radiomast.io/ref-128k-mp3-stereo/hls.m3u8",
  },
};

function respond(res, body, status = 200) {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(body);
}

module.exports = (req, res) => {
  const item = String((req.query && req.query.item) || "");
  if (item && streams[item]) {
    // Yemot API response: play the selected remote stream.
    return respond(res, `playfile=${streams[item].url}`);
  }

  if (item) {
    return respond(res, "read=האפשרות לא קיימת. לחזרה לתפריט הקישו כוכבית");
  }

  return respond(
    res,
    "read=להשמעת מוזיקת רקע באיכות גבוהה הקישו 1. למוזיקת רקע חסכונית לשיחות הקישו 2. להשמעה בפורמט HLS הקישו 3"
  );
};
