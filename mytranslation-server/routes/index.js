import express from 'express'
import Translate from '@google-cloud/translate'
import translateThis from '../translate-request'
import Translation from '../models/translation'
import db from '../models/index'
import bodyParser from 'body-parser'

const router = express.Router();
const translate = Translate();

router.use(bodyParser.json());

/* GET home page. */
router.get('/translate', (req, res) => {
  console.log(req.query.myText);
  translate.translate(req.query.myText, translateThis.options)
  .then((result) => {
    console.log(result);
    if (result[1].data.translations[0].translatedText) {
      console.log('in if');
      return res.json({translatedText: result[1].data.translations[0].translatedText});
    }else {
      console.log('in else');
      return res.json({translatedText: req.query.myText});
    }
  })
  .catch((err) => {
    console.error('ERROR: ', err);
  })
});

router.post('/saveText', (req, res) => {
  let textEnFrancais = req.body.data.francais;
  let textEnPerse = req.body.data.perse;
  return db.Translation
    .create({ francais: textEnFrancais, perse: textEnPerse })
    .then(result => {
      return res.status(200).json({message: 'Sauvegarder'});
    })
    .catch(err => {
      return res.json({error: err});
    })
})

router.get('/getText', (req, res) => {
  return db.Translation.findAll()
  .then(result => {
    return res.status(200).json({data: result})
  })
  .catch(err => {
    return res.json({ERROR: 'Quelque a mal tournee'});
  })
})

export default router;
