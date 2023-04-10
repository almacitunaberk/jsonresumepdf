const express = require("express")
const populateResumeTemplate = require("../utils/populate-resume-template.js")
const createPdf = require("../create-pdf.js")
const router = express.Router()

const THEMES = [ "kendall", "autumn", "straightforward",
                "eloquent-mod", "stackoverflow", "flat", "srt",
                "contempo", "fresh", "direct", "compact-extended",
                "spartacus-prime", "slickoverflow", "moon", "el-santo",
                "short", "cora", "classy", "dinesh", "rnord", "concise-serif",
                "hydejack", "mocha"]



router.post("/:theme", async (req, res, next) => {
    const theme = req.params.theme
    if (!THEMES.includes(theme)) {
        next(new Error("Theme is not valid"))
    } else {
        const resumeTemplate = populateResumeTemplate(req.body)
        try {
            res.set("Content-Type", "application/pdf")
            res.set("Content-Disposition", "attachment;filename=resume.pdf")
            try {
                const pdf = await createPdf(resumeTemplate, theme)
                res.send(pdf)
            } catch (err) {
                next(err)
            }
        } catch(err) {
            console.log(`Error ocurred in creating PDF: ${err}`)
            next(err)
        }
    }
})


router.all("*", (req, res, next) => {
    next()
})

module.exports = router