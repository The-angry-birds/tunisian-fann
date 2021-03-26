const { Auction } = require("../../db/models/auction");
const { Artwork } = require("../../db/models/artwork");

module.exports = {
  createAuction: async (req, res) => {
    try {
      const artworkData = await Auction.findOne({
        where: { artwork_id: req.body.artwork_id },
      });
      if (artworkData) {
        res.send("finished the auction");
      } else {
        const auction = await Auction.create({
          artwork_id: req.body.artwork_id,
          
          startDate: req.body.startDate,
          endDate: "mars 30, 2021 15:37:25",
        });

        res.send("created");
      }
    } catch (err) {
      res.send(err);
    }
  },
  getAllauctions: async function (req, res) {
    try {
      const data = await Auction.findAll({});
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  },
};
