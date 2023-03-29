const express = require("express")
const populateResumeTemplate = require("../utils/populate-resume-template.js")
const createPdf = require("../create-pdf.js")
const router = express.Router()

router.post("/kendall", async (req, res, next) => {
    const resumeTemplate = populateResumeTemplate(req.body)
    try {
        res.set("Content-Type", "application/pdf")
        res.set("Content-Disposition", "attachment;filename=resume.pdf")
        try {
            const pdf = await createPdf(resumeTemplate, "jsonresume-theme-kendall")
            res.send(pdf)
        } catch (err) {
            next(err)
        }
    } catch(err) {
        console.log(`Error ocurred in Kendall theme: ${err}`)
        next(err)
    }
})

router.post("/autumn", async (req, res, next) => {
    const resumeTemplate = populateResumeTemplate(req.body)
    try {
        res.set("Content-Type", "application/pdf")
        res.set("Content-Disposition", "attachment;filename=resume.pdf")
        try {
            const pdf = await createPdf(resumeTemplate, "jsonresume-theme-autumn")
            res.send(pdf)
        } catch (err) {
            next(err)
        }
    } catch(err) {
        console.log(`Error ocurred in Kendall theme: ${err}`)
        next(err)
    }
})

router.post("/straightforward", async (req, res, next) => {
    const resumeTemplate = populateResumeTemplate(req.body)
    try {
        res.set("Content-Type", "application/pdf")
        res.set("Content-Disposition", "attachment;filename=resume.pdf")
        try {
            const pdf = await createPdf(resumeTemplate, "jsonresume-theme-straightforward")
            res.send(pdf)
        } catch (err) {
            next(err)
        }
    } catch(err) {
        console.log(`Error ocurred in Stackoverflow theme: ${err}`)
        next(err)
    }
})

router.post("/eloquent-mod", async (req, res, next) => {
    const resumeTemplate = populateResumeTemplate(req.body)
    try {
        res.set("Content-Type", "application/pdf")
        res.set("Content-Disposition", "attachment;filename=resume.pdf")
        try {
            const pdf = await createPdf(resumeTemplate, "jsonresume-theme-eloquent-mod")
            res.send(pdf)
        } catch (err) {
            next(err)
        }
    } catch(err) {
        console.log(`Error ocurred in Stackoverflow theme: ${err}`)
        next(err)
    }
})

router.post("/stackoverflow", async (req, res, next) => {
    const resumeTemplate = populateResumeTemplate(req.body)
    try {
        res.set("Content-Type", "application/pdf")
        res.set("Content-Disposition", "attachment;filename=resume.pdf")
        try {
            const pdf = await createPdf(resumeTemplate, "jsonresume-theme-stackoverflow")
            res.send(pdf)
        } catch (err) {
            next(err)
        }
    } catch(err) {
        console.log(`Error ocurred in Stackoverflow theme: ${err}`)
        next(err)
    }
})

router.all("*", (req, res, next) => {
    next()
})

module.exports = router