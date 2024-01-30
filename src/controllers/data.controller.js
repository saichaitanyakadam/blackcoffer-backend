import { response } from "express";
import Data from "../models/data.model.js";

const getGraphDataController = async (req, res) => {
  try {
    const result = await Data.aggregate([
      {
        $group: {
          _id: "$region",
          value: { $sum: 1 },
        },
      },
    ]);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
  }
};

const getData = async (req, res) => {
  try {
    const {
      pestle = "",
      sector = "",
      likelihood = 0,
      search = "",
      country = "",
    } = req.query;
    const result = await Data.find({
      sector: { $regex: sector, $options: "i" },
      likelihood:
        Number(likelihood) !== 0 ? Number(likelihood) : { $gte: 1, $lte: 4 },
      pestle: { $regex: pestle, $options: "i" },
      country: { $regex: country, $options: "i" },
      $or: [
        {
          title: { $regex: search, $options: "i" },
        },
        {
          insight: { $regex: search, $options: "i" },
        },
      ],
    });
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};

const yearsData = async (req, res) => {
  const result = await Data.aggregate([
    {
      $match: {
        end_year: { $ne: null },
      },
    },
    {
      $group: {
        _id: {
          $switch: {
            branches: [
              {
                case: {
                  $and: [
                    { $gte: ["$end_year", 2016] },
                    { $lte: ["$end_year", 2020] },
                  ],
                },
                then: "2016-2020",
              },
              {
                case: {
                  $and: [
                    {
                      $gte: ["$end_year", 2021],
                    },
                    { $lte: ["$end_year", 2025] },
                  ],
                },
                then: "2021-2025",
              },
              {
                case: {
                  $and: [
                    {
                      $gte: ["$end_year", 2026],
                    },
                    { $lte: ["$end_year", 2030] },
                  ],
                },
                then: "2026-2030",
              },
              {
                case: {
                  $and: [
                    {
                      $gte: ["$end_year", 2031],
                    },
                    { $lte: ["$end_year", 2035] },
                  ],
                },
                then: "2031-2035",
              },
              {
                case: {
                  $and: [
                    {
                      $gte: ["$end_year", 2036],
                    },
                    { $lte: ["$end_year", 2040] },
                  ],
                },
                then: "2036-2040",
              },
              {
                case: {
                  $and: [
                    {
                      $gte: ["$end_year", 2041],
                    },
                    { $lte: ["$end_year", 2045] },
                  ],
                },
                then: "2041-2045",
              },
              {
                case: {
                  $and: [
                    {
                      $gte: ["$end_year", 2046],
                    },
                    { $lte: ["$end_year", 2050] },
                  ],
                },
                then: "2046-2050",
              },
            ],
            default: "2051-above",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  res.send(result);
};
export { getGraphDataController, getData, yearsData };
