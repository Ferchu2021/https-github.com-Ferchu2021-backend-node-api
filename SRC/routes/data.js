const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const auth = require("../middleware/authMiddleware");

router.get("/", dataController.getPublic);
router.get("/private", auth, dataController.getPrivate);
router.post("/", auth, dataController.create);
router.put("/:id", auth, dataController.update);
router.delete("/:id", auth, dataController.remove);

module.exports = router;
