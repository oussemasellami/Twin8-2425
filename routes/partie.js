const express = require("express");
const router = express.Router();
//const validate = require("../middll/validate");
const partieController = require("../controller/partieController");

router.post("/newjoueur", partieController.add);
router.get("/getalljoueur", partieController.showjoueur);
router.get("/getjoueur/:id", partieController.showByid);
router.delete("/deletejoueur/:id", partieController.deletejoueur);
router.put("/attaque/:id1/:id2", partieController.attaque);
router.post("/newpartie/:id1/:id2",partieController.newPartie);
router.get("/partie", (req, res) => {
    res.render("partie");
  });
module.exports = router;
