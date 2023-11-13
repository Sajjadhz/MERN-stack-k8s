const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateJobInput = require("../../utils/job");
// Load User model
const Job = require("../../models/Job");

// @route POST api/jobs/add
// @desc Register user
// @access Public
router.post("/add", (req, res) => {
    // Form validation
    const { errors, isValid } = validateJobInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Job.findOne({ link: req.body.link }).then(job => {
    //     if (job) {
    //         return res.status(400).json({ link: "Link already downloading" });
    //     } else {
    //         const newJob = new Job({
    //             link: req.body.link,
    //             userId: req.body.id
    //         });
    //         newJob
    //             .save()
    //             .then(job => res.json(job))
    //             .catch(err => console.log(err));
    //     }
    // });
});

module.exports = router;