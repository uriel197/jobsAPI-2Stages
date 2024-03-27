const notFound = async (req, res) => {
  res.status(404).json({ msg: "Route doesnt exist" });
};
