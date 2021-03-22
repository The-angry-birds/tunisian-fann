const { Artist } = require("../../db/models/artist.js");

exports.getArtist = async function (req, res) {
  try {
    const artists = await Artist.findAll({});
    res.send(artists);
  } catch (err) {
    console.log(err);
  }
};
exports.getbanned = async function (req, res) {
  try {
    const getArtist = await Artist.findOne({where: { id: req.params.id } })


    res.send(getArtist);
  } catch (err) {
    console.log(err);
  }
};


exports.bannedArtist = async function (req, res) {
  try {

    const bannedArtist = await Artist.update(
      {
        banned:true
      
      },
      { where: { id: req.params.id } }
    );
    res.send(bannedArtist);
  } catch (err) {
    console.log(err);
  }
};
