const resumeSchema = require("../resume_schema.js")

const populateResumeTemplate = (body) => {
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
    return resumeTemplate;
}

module.exports = populateResumeTemplate