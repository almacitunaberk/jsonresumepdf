const express = require("express")
const cors = require("express")
const morgan = require("morgan")
const resumeSchema = require("./resume_schema.js")
const fs = require("fs").promises
const { v4: uuidv4 } = require("uuid")
const exportResume = require("./resume-cli-master/lib/export-resume.js")
require("dotenv").config()


const path = require('path');
const puppeteer = require('puppeteer');
const btoa = require('btoa');

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./resumes"))

const PORT = process.env.PORT || 8080;

app.get("/", (req, res, next) => {
    res.send("Hello World")
})

// @method: POST
// @url: /api/resume
// @params: JSON object including the required fields

app.post("/resume", async (req, res, next) => {
    // First do validations


    // Parse the incoming req.body and create the new JSON template
    const body = req.body
    const resumeTemplate = {
        ...resumeSchema,
        basics: {
            name: body.personalDetails.name,
            label: body.personalDetails.jobTitle,
            email: body.personalDetails.email,
            phone: body.personalDetails.phone,
            location: {
                address: body.personalDetails.address
            },
            image: body.personalDetails.photo,
            summary: body.personalDetails.birthday
        },
        education: body.educationDetails.length !== 0 && body.educationDetails.map(detail => {
            return {
                institution: detail.schoolName,
                studyType: detail.type,
                endDate: detail.graduationDate,
            }
        })
        ,
        work:
            body.employmentDetails.length !== 0 && body.employmentDetails.map(detail => {
                return {
                    name: detail.employer,
                    position: detail.position,
                    startDate: detail.startDate,
                    endDate: detail.endDate,
                    summary: detail.description
                }
            })
        ,
        references:
            body.referenceDetails.length !== 0 && body.referenceDetails.map(detail => {
                return {
                    name: detail.name,
                    reference: detail.contact
                }
            })
        ,
        certificates:
            body.certificateDetails.length !== 0 && body.certificateDetails.map(detail => {
                return {
                    name: detail.name,
                    issuer: detail.institution,
                    date: detail.certificateDate
                }
            })
        ,
        languages:
            body.languageDetails.length !== 0 && body.languageDetails.map(detail => {
                return {
                    language: detail.language,
                    fluency: detail.level
                }
            })
        ,
        interests:
            body.hobby.length !== 0 && body.hobby.map(item => {
                return {
                    name: item.title
                }
            })
        ,
        skills:
            body.skill.length !== 0 && body.skill.map(item => {
                return {
                    name: item.title
                }
            })
    }
    // Write to the resume.json
    const resumeJSON = JSON.stringify(resumeTemplate)

    await fs.writeFile("resume.json", resumeJSON, "utf8", (err) => {
        if (err) {
            console.log("Something went  wrong file writing the resume.json file")
            console.log(err)
        } else {
            console.log("Resume.json file written successfully")
        }
    })

    // Name the file with a unique ID name
    const id = uuidv4()
    const pdfFileName = `${id}.pdf`
    console.log(pdfFileName)
    const resumeJSONObj = JSON.parse(resumeJSON)
    res.set("Content-Type", "application/pdf")
    res.set("Content-Disposition", "attachment;filename=resume.pdf")
    exportResume({
        resume: resumeJSONObj,
        fileName: pdfFileName,
        theme: "jsonresume-theme-kendall",
    }, (err, buff) => {
        if (err) {
            console.log("Error while creating the PDF")
        } else {
            res.send(buff)
        }
    })
})

// Error Handling
app.all('*', (req, res, next) => {
    // TODO: Add Express Error handling
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong!';
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})