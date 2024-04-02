const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

async function index(req, res) {
  const flights = await Flight.find({}).sort({ departs: "asc" });
  res.render("flights/index", { flights });
}

async function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    departsDate += `-${dt.getDate().toString().padStart(2, "0")}T${dt
      .toTimeString()
      .slice(0, 5)}`;
  res.render("flights/new", { error: "", departsDate });
}

async function create(req, res) {
  try {
    const flight = new Flight(req.body);
    await Flight.create(flight);
    res.redirect("/flights");
  } catch (err) {
    res.render("flights/new", { error: err.message, departsDate: req.body.departs});
  }
}

async function show(req, res) {
  const flight = await Flight.findById(req.params.id);
  const tickets = await Ticket.find({ flight: flight._id });

  res.render("flights/_id", { flight, destinations: flight.destinations, tickets });
}

module.exports = {
  index,
  new: newFlight,
  create,
  show,
};
