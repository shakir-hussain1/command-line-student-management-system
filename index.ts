#! /usr/bin/env node

console.log("*****WELCOME TO STUDENT MANAGEMENT SYSTEM***") //Welcome text will be displayed at the begining
import inquirer from "inquirer"; //module imported

const studentId: number = Math.floor(10000 + Math.random() * 50000); //generate 5 digit random student ID

let myAccountBalance: number = 10000; //account balance in dollar

let studentAnswer = await inquirer.prompt([ //object created
  {
    name: "students",
    type: "input",
    message: "Enter student name:",
    validate: function (value: string) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please enter some value.";
   } ,
  },
  { 
    name: "courses",
    type: "list",
    message: "Select in which course you wish to enroll",
    choices: ["IT", "AI","EnglishLanguage", "CompetativeExams", "MedicalSciences"],
  },
]);

const tutionFee: { [key: string]: number } = { //courses and their fees
  "IT": 5000,
  AI: 4000,
  EnglishLanguage: 1000,
  CompetativeExams: 3000,
  MedicalSciences: 2000,
};

console.log(`\nTution Fees: ${tutionFee[studentAnswer.courses]}/-\n`);
console.log(`Balance: ${myAccountBalance}\n`);

let paymentVia = await inquirer.prompt([ //payment methode
  {
    name: "payment",
    type: "list",
    message: "Select through which bank you wish to send money",
    choices: ["Habib Bank", "Easypaisa", "Jazzcash"],
  },
  {
    name: "amount",
    type: "input",
    message: "Transfer Money:",
    validate: function (value: string) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please enter some value.";
    },
  },
]);

console.log(`\nYou selected ${paymentVia.payment} to send money.\n`);

const tutionFees = tutionFee[studentAnswer.courses];
const paymentAmount = parseFloat(paymentVia.amount);

if (tutionFees === paymentAmount) {
  console.log(
    `Congratulations, you have enrolled in ${studentAnswer.courses} successfully.\n`
  );

  let myAnswer = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "What do you wish to do?",
      choices: ["View Status", "Exit"],
    },
  ]);

  if (myAnswer.select === "View Status") {
    console.log("===STATUS OF STUDENT===");
    console.log(`Student Name: ${studentAnswer.students}`);
    console.log(`Student ID: ${studentId}`);
    console.log(`Course: ${studentAnswer.courses}`);
    console.log(`Tution Fees Paid: ${paymentAmount}`);
    console.log(`Remaining Balance: ${(myAccountBalance -= paymentAmount)}`);
  } else {
    console.log("\nExiting Student Management System\n");
  }
} else {
  console.log("You entered invalid amount for this course\n");
}
process.exit();