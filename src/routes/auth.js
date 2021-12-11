import { Router } from "express";
import passport from 'passport';
import { GmailService } from "../services/gmail";
const router = Router();

router.post('/login',passport.authenticate('login'), function (req,res) {
    res.json(req.user);
});

router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', function (err, data, info) {
      
      if (err) {
        return next(err);
      }
      if (!data) return res.status(401).json({ msg:  'El usuario ya existe' });
  
      res.json({ msg: 'signup OK',data:data });
    })(req, res, next);
  });

  router.get('/logout', (req, res) => {
    
    req.session.destroy(err => {
      if (err) res.status(500).json({ message: 'Ocurrió un error' });
      else {
        res.json({ message: 'Logout exitoso' });
      }
    });
  });
export default router;