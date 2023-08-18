const express = require("express")
const router = express.Router()

const { isAuthenticated } = require("../middlewares/isAuthenticated")

const teamController = require("../controller/team")
const teamServices = require("../services/team")

router.post("/",
    isAuthenticated,
    teamController.postCreateTeam,
    teamServices.postCreateTeam
)

router.get("/:teamId",
    isAuthenticated,
    teamController.getTeam,
    teamServices.getTeam
)

router.put("/:teamId",
    isAuthenticated,
    teamController.putQuestion

)

// router.put("/:teamId/:userId",
//     teamController.putMember,
//     // teamServices.editMember
// )

module.exports = router;