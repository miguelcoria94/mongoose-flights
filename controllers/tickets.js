const Ticket = require("../models/ticket");
const Flight = require("../models/flight");

function newTicket(req, res) {
  res.render("tickets/new", {
    title: "Add Ticket",
    flightId: req.params.id,
    error: "",
  });
}

async function create(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    const ticket = new Ticket(req.body);
    ticket.flight = flight;
    await ticket.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    res.render("tickets/new", {
      title: "Add Ticket",
      flightId: req.params.id,
      error: err.message,
    });

  }
}

module.exports = {
  new: newTicket,
  create,
};
// Path: controllers/flights.js
