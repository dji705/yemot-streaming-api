// Yemot HaMashiach radio menu.
// Response follows the Yemot API read format:
// read=prompt=variable,confirm,max_digits,min_digits,timeout,input_type,
// block_star,block_zero,key_replacement,allowed_keys,retries,no_input_action
//
// Note: station names must be configured as playable music/stream names in Yemot.

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

// Keep every read field in the documented order. One digit, 7-second input window.
// Only digits 1-8 are allowed; no confirmation playback.
const readChoice = `read=${prompt}=Station,no,1,1,7,Digits,yes,no,*/,12345678,3,Ok`;

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

  if (!selected) return respond(res, readChoice);

  const station = stations[selected];
  if (!station) return respond(res, readChoice);

  return respond(res, `music_on_hold=${station.yemotName},60`);
};
