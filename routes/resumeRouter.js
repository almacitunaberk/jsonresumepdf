const express = require("express")
const populateResumeTemplate = require("../utils/populate-resume-template.js")
const createPdf = require("../create-pdf.js")
const router = express.Router()

const THEMES = ["autumn", "straightforward",
                "eloquent-mod", "stackoverflow", "flat", "srt",
                "contempo", "fresh", "direct", "compact-extended",
                "spartacus-prime", "slickoverflow", "moon", "el-santo",
                "short"]

/*

router.post("/:theme", async (req, res, next) => {
    let themePkgName = "jsonresume-theme-"
    const theme = req.params.theme
    if (!THEMES.includes(theme)) {
        next()
    } else {
        themePkgName = themePkgName + theme
        const resumeTemplate = populateResumeTemplate(req.body)
        try {
            res.set("Content-Type", "application/pdf")
            res.set("Content-Disposition", "attachment;filename=resume.pdf")
            try {
                const pdf = await createPdf(resumeTemplate, themePkgName)
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

*/

router.post("/kendall", async (req, res, next) => {
    const resumeTemplate = populateResumeTemplate(req.body)
    try {
        res.set("Content-Type", "application/pdf")
        res.set("Content-Disposition", "attachment;filename=resume.pdf")
        try {
            const pdf = await createPdf(resumeTemplate)
            res.send(pdf)
        } catch (err) {
            next(err)
        }
    } catch(err) {
        console.log(`Error ocurred in Kendall theme: ${err}`)
        next(err)
    }
})

router.all("*", (req, res, next) => {
    next()
})

module.exports = router