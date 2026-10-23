// Yemot HaMashiach radio menu.
// Uses the documented read response shape: read=prompt=variable,,max,min,type,block_star
// The chosen station must already exist as a music-on-hold item in the Yemot account.

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

const prompt =
  "t-לבחירת כאן ב הקישו 1. לכאן גימל הקישו 2. לכאן 88 הקישו 3. לגלגלצ הקישו 4. לגלי צהל הקישו 5. לרדיו 103FM הקישו 6. לרדיו תל אביב הקישו 7. לרדיו ירושלים הקישו 8";

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

  if (!selected) {
    return respond(res, `read=${prompt}=Station,,1,1,Digits,yes`);
  }

  const station = stations[selected];
  if (!station) {
    return respond(res, `read=t-הבחירה לא תקינה. ${prompt.slice(2)}=Station,,1,1,Digits,yes`);
  }

  return respond(res, `music_on_hold=${station.yemotName},60`);
};
