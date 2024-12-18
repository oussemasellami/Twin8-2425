const Joueur = require("../models/joueur");
const Partie = require("../models/partie");

async function add(req, res) {
  try {
    console.log(req.body);
    const user = new Joueur({
      pseudo: req.body.pseudo,
      sante: 100,
      score: 0,
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function showjoueur(req, res) {
  try {
    const user = await Joueur.find();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function showByid(req, res) {
  try {
    const user = await Joueur.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function deletejoueur(req, res) {
  try {
    await Joueur.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted");
  } catch (err) {
    console.log(err);
  }
}
async function attaque(req, res) {
  try {
    const attaquant = await Joueur.findById(req.params.id1);
    const victime = await Joueur.findById(req.params.id2);
    const j1 = (attaquant.score += 10);
    const j2 = (victime.sante -= 20);
    const joueur1 = await Joueur.findByIdAndUpdate(
      req.params.id1,
      { score: j1 },
      {
        new: true,
      }
    );
    const joueur2 = await Joueur.findByIdAndUpdate(
      req.params.id2,
      { sante: j2 },
      {
        new: true,
      }
    );

    res.send(joueur1 + "    " + joueur2);
  } catch (err) {
    console.log(err);
  }
}
async function newPartie(req, res) {
  try {
    console.log(req.body);
    const newpartie = new Partie({
      nom: req.body.nom,
      joueur_1: req.params.id1,
      joueur_2: req.params.id2,
      etat: "en cours",
    });
    await newpartie.save();
    res.status(200).json(newpartie);
  } catch (err) {
    console.log(err);
  }
}

async function newPartiesocket(data) {
  try {
    //console.log(req.body);
    const newpartie = new Partie({
      nom: data.nompartie,
      joueur_1: data.id1,
      joueur_2: data.id2,
      etat: "en cours",
    });
    await newpartie.save();
    // res.status(200).json(newpartie);
  } catch (err) {
    console.log(err);
  }
}


async function affichersocket(data) {
  try {
    const joueur1 = await Joueur.findById(data.id1);
    const joueur2 = await Joueur.findById(data.id2);
    //res.status(200).json(user);
    return {j1:joueur1,j2:joueur2}
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  add,
  showjoueur,
  showByid,
  deletejoueur,
  attaque,
  newPartie,
  newPartiesocket,
  affichersocket
};
