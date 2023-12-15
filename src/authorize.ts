import { Request, Response, NextFunction } from "express";
import passport from "passport";

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("jwt", { session: false }, (err: Error, user: any) => {
      if (!user || err) {
        res.status(401).json({ msg: "Unauthorized" });
      } else {
        req.user = user;
        next();
      }
    })(req, res, next);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

export default authorize;