const express = require("express");
const router = express.Router();
const ticketsCtrl = require("../controllers/tickets");

// This router is mounted to a "starts with" path of '/'

// GET /performers/new (new functionality)

router.post(
  "/flights/:id/tickets/:ticketId",
  ticketsCtrl.delete
);


router.get("/flights/:id/tickets/new", ticketsCtrl.new);


router.post("/flights/:id/tickets", ticketsCtrl.create);

// delete the ticket


module.exports = router;
