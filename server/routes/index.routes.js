// Import the router
const router = require("express").Router()


/**
 * All of the routes are prefixed with /api
 */

router.use('/students', require("./students.routes"))
router.use('/cohorts', require("./cohorts.routes"))



// Export the router
module.exports = router
