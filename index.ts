#!/usr/bin/env node

import inquirer from "inquirer"

class Student {
    id: number
    name: string
    course: string[]
    fees: number

    constructor(id: number, name: string, course: string[], fees: number) {
        this.id = id
        this.name = name
        this.course = course
        this.fees = fees
    }
}

let default_id = 10000 + (Math.floor(Math.random() * 1000))
let enrollment_done = true
let student_id: string = ""
let students: Student[] = []

do {
    let action = await inquirer.prompt({
        type: "list",
        name: "b",
        message: "Hello there!\nWhat can we do for you?",
        choices: ["Enroll Student", "View Student Status"]
    })

    if (action.b === "Enroll Student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "action",
            message: "Please enter your name:"
        })

        let studentNameTrimmed = (studentName.action).trim().toLowerCase()
        let checkStudentName = students.map(a => a.name)

        if (studentNameTrimmed !== "") {
            student_id = "GI-AIWMD " + default_id

            console.log("\n\tWelcome to the course, " + studentNameTrimmed)
            console.log("Your id is " + student_id)
        }

        if (!checkStudentName.includes(studentNameTrimmed)) {
           if (studentNameTrimmed !== ""){
                student_id = "GI-AIWMD" + default_id

                console.log("\n\tWelcome to the course, " + studentNameTrimmed)
                console.log("Your id is " + student_id)

                let course_enrollement = await inquirer.prompt({
                    type: "list",
                    name: "c",
                    message: "Please select a course",
                    choices: ["AI development", "Web 3.0", "Metaverse"]
                })

                let course_fee: number = 0

                if (course_enrollement.c === "AI development") {
                    course_fee = 250000
                } else if (course_enrollement.c === "Web 3.0") {
                    course_fee = 175000
                } else {
                    course_fee = 125000
                }

                let confirm_course = await inquirer.prompt({
                    type: "confirm",
                    name: "d",
                    message: "Do you confirm enrollment in this course"
                })

                if (confirm_course.d === true) {
                    let student = new Student(default_id, studentNameTrimmed, [course_enrollement.c], course_fee)

                    students.push(student)
                    console.log("You have enrolled in the GI-AIWMD course")
                } else {
                    console.log("Please add a valid name")
                }

            }

        } else {
            console.log("This name exists")
        }
    } else if (action.b === "View Student Status") {
        if (students.length !== 0) {
            let student_check = students.map(e => e.name)

            let student_selected = await inquirer.prompt({
                type: "list",
                name: "f",
                message: "Please select student",
                choices: student_check
            })

            let recorded_student = students.find(Student => Student.name === student_selected.f)

            console.log("Student Details")
            console.log("\n", recorded_student)
        } else {
            console.log("Student not found")
        }
    }
    let confirm_user = await inquirer.prompt({
        type: "confirm",
        name: "g",
        message: "Do you want to continue"
    })

    if (confirm_user.g === false) {
        enrollment_done = false
    }

} while (enrollment_done)
