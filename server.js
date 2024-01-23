const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let students = [
  { id: 10, firstName: "Marty", lastName: "McFly", group: 101, rate: 9.5 },
  { id: 11, firstName: "Squidward", lastName: "Tentakles", group: 102, rate: 6.1 },
  { id: 12, firstName: "Donald", lastName: "Duck", group: 102, rate: 7.2 },
  { id: 13, firstName: "Sarah", lastName: "Connor", group: 101, rate: 8.3 },
  { id: 14, firstName: "Yugin", lastName: "Krabbs", group: 102, rate: 6.8 },
];

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/students/:id', (req, res) => {
  const { id } = req.params;
  const student = req.body;

  if (!student.firstName || !student.lastName) {
    return res.status(400).json({ error: 'firstName and lastName cannot be empty' });
  }

  students.push({ ...student, id: parseInt(id) });
  res.json(students);
});

app.get('/students/:id', (req, res) => {
  const { id } = req.params;
  const student = students.find(s => s.id === parseInt(id));

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.json(student);
});

app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const studentIndex = students.findIndex(s => s.id === parseInt(id));

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const updatedStudent = req.body;

  if (!updatedStudent.firstName || !updatedStudent.lastName) {
    return res.status(400).json({ error: 'firstName and lastName cannot be empty' });
  }

  students[studentIndex] = { ...students[studentIndex], ...updatedStudent };
  res.json(students);
});

app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  students = students.filter(s => s.id !== parseInt(id));
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});