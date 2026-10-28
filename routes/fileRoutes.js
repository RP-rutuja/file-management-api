const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const controller = require("../controllers/fileController");

router.post("/", upload.single("file"), controller.uploadFile);

router.get("/", controller.getFiles);
router.get("/:id/download", controller.downloadFile);
router.get("/:id", controller.getFile);

router.put("/:id", controller.updateFile);
router.delete("/:id", controller.deleteFile);

module.exports = router;
