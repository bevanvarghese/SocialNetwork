const { admin, db } = require("./admin");

module.exports = (req, res, next) => {
  //next proceeds to the handler after FBAuth in any respective function
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1]; //gets token
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      console.log(decodedToken);
      return db
        .collection("users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.handle = data.docs[0].data().handle;
      req.user.imageUrl = data.docs[0].data().imageUrl;
      return next(); //allows request to proceed towards parameter after FBAuth
    })
    .catch((err) => {
      console.error("Error while verifying token ", err);
      return res.status(403).json(err);
    });
};
