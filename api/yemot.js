// Yemot HaMashiach streaming/radio menu.
// First call: ask the caller to choose a station.
// Follow-up call: Yemot sends the selected value in the "Station" parameter.
//
// IMPORTANT: music_on_hold accepts a station/music name configured in the Yemot
// account. It is not a generic command for playing arbitrary external URLs.
// Ask Yemot support to enable/configure each live stream name before using it.

const stations = {
  "1": { name: "כאן ב", yemotName: "כאן ב" },
  "2": { name: "כאן גימל", yemotName: "כאן גימל" },
  "3": { name: "כאן 88", yemotName: "כאן 88" },
  "4": { name: "גלגלצ", yemotName: "גלגלצ" },
  "5": { name: "גלי צה״ל", yemotName: "גלי צה״ל" },
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
  const selected = String(query.Station ?? query.station ?? query.Digits ?? query.digits ?? "").trim();

  // Selection received from the read action.
  if (selected) {
    const station = stations[selected];
    if (!station) {
      return respond(
        res,
        "read=t-הבחירה לא קיימת. נסו שוב=Station,,1,1,7,Digits,no,no,,,1,Ok"
      );
    }

    // This is the documented Yemot API action for a configured music/live-stream name.
    return respond(res, `music_on_hold=${station.yemotName}`);
  }

  // Ask for a one-digit choice and send it back to this API as "Station".
  return respond(
    res,
    "read=t-לבחירת כאן ב הקישו 1. לכאן גימל הקישו 2. לכאן 88 הקישו 3. לגלגלצ הקישו 4. לגלי צהל הקישו 5. לרדיו 103FM הקישו 6. לרדיו תל אביב הקישו 7. לרדיו ירושלים הקישו 8=Station,,1,1,7,Digits,no,no,,,1,Ok"
  );
};
