/* eslint-disable node/no-unsupported-features/es-syntax */
const mongoose = require('mongoose');
const faker = require('faker');
const chalk = require('chalk');
const dotenv = require('dotenv');
const User = require('./server/models/User');
const Teacher = require('./server/models/Teacher');
const Student = require('./server/models/Student');
const Lesson = require('./server/models/Lesson');

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
  for (let i = 0; i < 50; i += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const newUser = {
      _id: new mongoose.Types.ObjectId(),
      name: `${firstName} ${lastName}`,
      email,
      password: 'password123',
      role,
    };
    users.push(newUser);
  }
  return users;
};

const createLessons = (teachers, students) => {
  console.log(chalk.green('Creating'), 'Lessons');
  const lessons = [];
  teachers.forEach(teacher => {
    const title = faker.name.title();
    const description = faker.lorem.paragraph();
    const newLesson = {
      title,
      description,
      _teacher: teacher._id,
      _students: [
        students[Math.floor(Math.random() * 50)]._id,
        students[Math.floor(Math.random() * 50)]._id,
      ],
    };
    lessons.push(newLesson);
  });

  return lessons;
};
const saveAdmin = async () => {
  console.log(chalk.green('Saving'), 'Admin');
  const admin = await new User({
    name: 'super admin',
    email: 'admin@admin.com',
    password: 'password123',
    role: 'admin',
  });
  await admin.save();
};
const saveTeachers = async teachers => {
  console.log(chalk.green('Saving'), 'teachers');
  teachers.forEach(async teacher => {
    const { _id, ...rest } = teacher;
    const newUser = await new User(rest);
    const newTeacher = await new Teacher({ _id, _user: newUser._id });
    await newUser.save();
    await newTeacher.save();
  });
};
const saveStudents = async students => {
  console.log(chalk.green('Saving'), 'student');
  students.forEach(async student => {
    const { _id, ...rest } = student;
    const newUser = await new User(rest);
    const newStudent = await new Student({ _id, _user: newUser._id });
    await newUser.save();
    await newStudent.save();
  });
};

const saveLessons = async lessons => {
  console.log(chalk.green('Saving'), 'Lessons');
  lessons.forEach(async lesson => {
    const newLesson = await new Lesson(lesson);
    await newLesson.save();
  });
};

const seed = () => {
  console.log(chalk.green('seed'), 'just started');
  saveAdmin();
  const teachers = createUsers('teacher');
  const students = createUsers('student');
  const lessons = createLessons(teachers, students);
  saveTeachers(teachers);
  saveStudents(students);
  saveLessons(lessons);
  console.log(chalk.green('seed'), 'just ended');
};
connectDB(seed);
