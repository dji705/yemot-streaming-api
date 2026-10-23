// Yemot HaMashiach streaming/radio menu.
// The read action follows the documented Yemot API format:
// read=t-prompt=PARAM,,max_digits,min_digits,Digits,yes
//
// IMPORTANT: music_on_hold plays a music/stream name already configured in the
// Yemot account. It does not accept arbitrary public radio URLs. Configure each
// station name in Yemot first, otherwise selecting it may fail/end the call.

const stations = {
  "1": { name: "כאן ב", yemotName: "כאן ב" },
  "2": { name: "כאן גימל", yemotName: "כאן גימל" },
  "3": { name: "כאן 88", yemotName: "כאן 88" },
  "4": { name: "גלגלצ", yemotName: "גלגלצ" },
  "5": { name: "גלי צהל", yemotName: "גלי צהל" },
  "6": { name: "רדיו 103FM", yemotName: "רדיו 103FM" },
  "7": { name: "רדיו תל אביב", yemotName: "רדיו תל אביב" },
  "8": { name: "רדיו ירושלים", yemotName: "רדיו ירושלים" },
};

function respond(res, body, status = 200) {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(body);
}

module.exports = (req, res) => {
  const query = req.query || {};
  const selected = String(
    query.Station ?? query.station ?? query.Digits ?? query.digits ?? ""
  ).trim();

  if (selected) {
    const station = stations[selected];
    if (!station) {
      return respond(
        res,
        "read=t-הבחירה לא תקינה. לבחירת כאן ב הקישו 1. לכאן גימל הקישו 2. לכאן 88 הקישו 3. לגלגלצ הקישו 4. לגלי צהל הקישו 5. לרדיו 103FM הקישו 6. לרדיו תל אביב הקישו 7. לרדיו ירושלים הקישו 8=Station,,1,1,Digits,yes"
      );
    }

    // Must match an actual music/stream name configured in the user's Yemot account.
    return respond(res, `music_on_hold=${station.yemotName},60`);
  }

  return respond(
    res,
    "read=t-לבחירת כאן ב הקישו 1. לכאן גימל הקישו 2. לכאן 88 הקישו 3. לגלגלצ הקישו 4. לגלי צהל הקישו 5. לרדיו 103FM הקישו 6. לרדיו תל אביב הקישו 7. לרדיו ירושלים הקישו 8=Station,,1,1,Digits,yes"
  );
};
