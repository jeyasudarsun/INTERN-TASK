const students = [
  { name: "JEYA", marks: 95 },
  { name: "SUDARSUN", marks: 80 },
  { name: "KAVIN", marks: 65 },
  { name: "RAHUL", marks: 45 },
  { name: "DHEENA", marks: 25 }
];

function processResults(students) {
  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    let name = student.name;
    let marks = student.marks;

    if (marks >= 90) {
      console.log("Excellent -", name + ";", marks);
      continue;
    }

    if (marks >= 75) {
      console.log("Good -", name + ";", marks);
      continue;
    }

    if (marks >= 50) {
      console.log("Average -", name + ";", marks);
      continue;
    }

    console.log("Needs Improvement -", name + ";", marks);
  }
}


processResults(students);
