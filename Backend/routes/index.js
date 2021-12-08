const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
	res.send("Hello User!");
});

router.use("/admin", require("../Admin/admin"));
router.use("/", require("../User/user"));
router.get("*", (req, res) => res.status(404));

module.exports = router;
