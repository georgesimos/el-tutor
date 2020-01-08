/* eslint-disable node/no-unsupported-features/es-syntax */
const mongoose = require('mongoose');
const faker = require('faker');
const chalk = require('chalk');
const dotenv = require('dotenv');
const User = require('./server/models/User');
const Teacher = require('./server/models/Teacher');
const Student = require('./server/models/Student');
const Lesson = require('./server/models/Lesson');
const Grade = require('./server/models/Grade');

// Make all variables from our .env file available in our process
dotenv.config({ path: '.env.example' });
// connect db

const connectDB = async cb => {
  try {
    // MongoDB setup.
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    await mongoose.connect(process.env.MONGODB_URI);
    /* Drop the DB */
    mongoose.connection.db.dropDatabase();
  } catch (e) {
    console.error(e.message);
    console.log(
      '%s MongoDB connection error. Please make sure MongoDB is running.',
      chalk.red('✗')
    );
    // Exit process with failure
    process.exit(1);
  }
  cb();
};

const createUsers = role => {
  console.log(chalk.green('Creating'), role);
  const users = [];
  for (let i = 0; i < 500; i += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const newUser = {
      _id: new mongoose.Types.ObjectId(),
      name: `${firstName} ${lastName}`,
      email,
      password: 'password123',
      role
    };
    users.push(newUser);
  }
  return users;
};

const generateStudentsId = students => {
  const studentsId = [];
  const limit = students.length > 20 ? 20 : students.length;
  for (let i = 0; i < limit; i += 1) {
    studentsId.push(students[i]._id);
  }
  return studentsId;
};

const createLessons = (teachers, students) => {
  console.log(chalk.green('Creating'), 'Lessons');
  const lessons = [];
  const studentsId = generateStudentsId(students);
  teachers.forEach(teacher => {
    const title = faker.name.title();
    const description = faker.lorem.paragraph();
    const newLesson = {
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      _teacher: teacher._id,
      _students: studentsId
    };
    lessons.push(newLesson);
  });
  return lessons;
};

const createGrades = lessons => {
  console.log(chalk.green('Creating'), 'Grades');
  const grades = [];
  lessons.forEach(lesson => {
    const { _students } = lesson;
    const newGrade = {
      grade: Math.floor(Math.random() * 10) + 1,
      _lesson: lesson._id,
      _student: _students[Math.floor(Math.random() * _students.length)]._id
    };
    grades.push(newGrade);
  });

  return grades;
};
const saveAdmin = async () => {
  console.log(chalk.green('Saving'), 'Admin');
  const admin = await new User({
    name: 'super admin',
    email: 'admin@admin.com',
    password: 'password123',
    role: 'admin'
  });
  await admin.save();
};
const saveTeachers = async teachers => {
  console.log(chalk.green('Saving'), 'teachers');
  teachers.forEach(async teacher => {
    const { _id, ...rest } = teacher;
    try {
      const newUser = await new User(rest);
      const newTeacher = await new Teacher({ _id, _user: newUser._id });
      await newUser.save();
      await newTeacher.save();
    } catch (error) {
      console.log(error);
    }
  });
};
const saveStudents = async students => {
  console.log(chalk.green('Saving'), 'student');
  students.forEach(async student => {
    const { _id, ...rest } = student;
    try {
      const newUser = await new User(rest);
      const newStudent = await new Student({ _id, _user: newUser._id });
      await newUser.save();
      await newStudent.save();
    } catch (error) {
      console.log(error);
    }
  });
};

const saveLessons = async lessons => {
  console.log(chalk.green('Saving'), 'Lessons');
  lessons.forEach(async lesson => {
    try {
      const newLesson = await new Lesson(lesson);
      await newLesson.save();
    } catch (error) {
      console.log(error);
    }
  });
};
const saveGrades = async grades => {
  console.log(chalk.green('Saving'), 'Grades');
  grades.forEach(async grade => {
    try {
      const newGrade = await new Grade(grade);
      await newGrade.save();
    } catch (error) {
      console.log(error);
    }
  });
};
const seed = () => {
  console.log(chalk.green('seed'), 'just started');
  saveAdmin();
  const teachers = createUsers('teacher');
  const students = createUsers('student');
  const lessons = createLessons(teachers, students);
  const grades = createGrades(lessons, students);

  setTimeout(() => saveTeachers(teachers), 2000);
  setTimeout(() => saveStudents(students), 2000);
  setTimeout(() => saveLessons(lessons), 2000);
  setTimeout(() => saveGrades(grades), 2000);

  setTimeout(() => {
    console.log(chalk.green('seed'), 'just ended');
    process.exit();
  }, 30000);
};
connectDB(seed);
