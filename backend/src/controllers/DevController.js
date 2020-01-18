const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, resp) {
    const devs = await Dev.find();

    return resp.json(devs);
  },
  async store(req, resp) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, bio, avatar_url } = response.data;
      const techArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        name,
        github_username,
        avatar_url,
        bio,
        techs: techArray,
        location
      });
    }

    return resp.json(dev);
  },
  async update(req, resp) {
    const { techs, name, bio, avatar_url, latitude, longitude } = req.body;
    const { id } = req.params;

    const techArray = techs && parseStringAsArray(techs);
    const location =
      longitude && latitude
        ? {
            type: "Point",
            coordinates: [longitude, latitude]
          }
        : undefined;

    const dev = await Dev.findByIdAndUpdate(
      id,
      {
        name,
        avatar_url,
        location,
        bio,
        techs: techArray
      },
      { omitUndefined: true, new: true, useFindAndModify: false }
    );

    return resp.json(dev);
  },
  async destroy(req, resp) {
    const { id } = req.params;
    const dev = await Dev.findByIdAndDelete(id);
    return resp.json(dev);
  }
};
