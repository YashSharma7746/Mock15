const express = require("express");
const boardRouter = express.Router();
const { boardModel } = require("../model/board.model");

boardRouter.get("/board", async (req, res) => {
  try {
    const board = await boardModel.find();
    res.status(200).send({ msg: "Success", data: board });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

boardRouter.post("/board", async (req, res) => {
  try {
    let newBoard = new boardModel(req.body);
    newBoard.save();
    res.status(200).send({ msg: "Added new task" });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

boardRouter.patch("/board/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await boardModel.findByIdAndUpdate(id, req.body);
    res.status(201).send({ msg: "Updated Successfully" });
  } catch (e) {
    res.status(400).send({ msg: "Something Went Wrong" });
  }
});

boardRouter.delete("/board/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await boardModel.findByIdAndDelete(id);
    res.status(201).send({ msg: "Deleted Successfully" });
  } catch (e) {
    res.status(400).send({ msg: "Something Went Wrong" });
  }
});

module.exports = { boardRouter };
