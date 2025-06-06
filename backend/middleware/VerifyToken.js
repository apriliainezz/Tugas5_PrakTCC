import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    console.log("TOKEN DECODED:", decoded);

    // ⬇️ Tambahkan ini untuk menyimpan userId ke request
    req.userId = decoded.id;  // <-- PENTING!
    req.email = decoded.email;

    next();
  });
};