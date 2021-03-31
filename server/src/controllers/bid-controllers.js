const { Auction } = require("../../db/models/auction");
const jwt = require("jsonwebtoken");
const config = require("../../db/configArtist");
const { Bid } = require("../../db/models/bid");
const { User } = require("../../db/models/users-model-signup");

module.exports = {
  postOneBid: async (req, res) => {
    try {
      const auction = await Auction.findOne({
        where: { id: req.body.auction_id },
      });
      const user = await User.findOne({ where: { id: req.body.user_id } });
      if (user && auction) {
        const bid = await Bid.create({
          bidValue: req.body.bidValue,
          user_id: user.id,
          auction_id: auction.id,
        });
        res.send("bid created");
      } else {
        res.send("check user id or auction id  ");
      }
    } catch (err) {
      console.log(err);
    }
  },
  getAllBidForoneAuction: async (req, res) => {
    try {
      const bid = await Bid.findAll({
        where: { auction_id: req.params.id },
      });
      res.send(bid);
    } catch (err) {
      console.log(err);
    }
  },
};
