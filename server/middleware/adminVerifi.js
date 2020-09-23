module.exports = async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");

  const { admin } = req.body;
  try {
    if (!admin.email || !admin.password) {
      const err = new Error("No Authorization.");
      err.authFailed = true;
      return next(err);
    }

    if (
      admin.email !== process.env.ADMIN_LOGIN &&
      admin.password !== process.env.ADMIN_PASSWORD
    ) {
      const err = new Error("INCORRECT LOGIN OR PASSWORD.");
      err.authFailed = true;
      return next(err);
    }
    console.log(admin);
    return next();
  } catch (error) {
    const err = new Error("No Authorization.");
    err.authFailed = true;
    return next(err);
  }
};
