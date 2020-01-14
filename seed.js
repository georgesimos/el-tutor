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
  return new Promise((resolve, reject) => {
    const users = [];
    for (let i = 0; i < 5; i += 1) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email(firstName, lastName);
      const roleProps =
        role === 'student'
          ? { _student: new mongoose.Types.ObjectId() }
          : { _teacher: new mongoose.Types.ObjectId() };
      const newUser = {
        _id: new mongoose.Types.ObjectId(),
        name: `${firstName} ${lastName}`,
        email,
        password: 'MySecretPass123',
        role,
        ...roleProps
      };
      users.push(newUser);
    }

    if (users.length) {
      resolve(users);
    } else {
      reject(new Error('Reject: Users not created'));
    }
  });
  // return users;
};

const generateIndexes = (limit, range) => {
  const result = [];
  while (result.length < limit) {
    const random = Math.floor(Math.random() * range);
    if (result.indexOf(random) === -1) result.push(random);
  }
  return result;
};
const generateStudentsId = students => {
  const studentsId = [];
  const limit = students.length > 25 ? 25 : students.length;
  const indexes = generateIndexes(limit, students.length);
  indexes.forEach(i => studentsId.push(students[i]._student));
  return studentsId;
};

const createLessons = (teachers, students) => {
  console.log(chalk.green('Creating'), 'Lessons');
  return new Promise((resolve, reject) => {
    const lessons = [];
    teachers.forEach(teacher => {
      const studentsId = generateStudentsId(students);
      const title = faker.name.title();
      const description = faker.lorem.paragraph();
      const newLesson = {
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        _teacher: teacher._teacher,
        _students: studentsId
      };
      lessons.push(newLesson);
    });
    if (lessons.length) {
      resolve(lessons);
    } else {
      reject(new Error('Reject: Lessons not created'));
    }
  });
};

const createGrades = lessons => {
  console.log(chalk.green('Creating'), 'Grades');
  return new Promise((resolve, reject) => {
    const grades = [];
    lessons.forEach(lesson => {
      const { _students, _teacher } = lesson;
      const newGrade = {
        _id: new mongoose.Types.ObjectId(),
        grade: Math.floor(Math.random() * 10) + 1,
        _lesson: lesson._id,
        _student: _students[Math.floor(Math.random() * _students.length)]._id,
        _teacher
      };
      grades.push(newGrade);
    });
    if (grades.length) {
      resolve(grades);
    } else {
      reject(new Error('Reject: Grades not created'));
    }
  });
};

const saveAdmin = async () => {
  console.log(chalk.green('Saving'), 'Admin');
  const admin = await new User({
    name: 'super admin',
    email: 'admin@admin.com',
    password: 'MySecretPass123',
    role: 'admin'
  });
  await admin.save();
};
async function saveTeachers(teachers, lessons, grades) {
  console.log(chalk.green('Saving'), 'teachers');

  const teachersClone = teachers.map(teacher => ({ ...teacher, _lesson: '', _grades: [] }));

  lessons.forEach(lesson => {
    if (lesson._teacher) {
      const index = teachers.findIndex(teacher => teacher._teacher === lesson._teacher);
      teachersClone[index] = { ...teachersClone[index], _lesson: lesson._id };
    }
  });
  grades.forEach(grade => {
    if (grade._teacher) {
      const index = teachers.findIndex(teacher => teacher._teacher === grade._teacher);
      teachersClone[index] = {
        ...teachersClone[index],
        _grades: [grade._id]
      };
    }
  });

  teachersClone.forEach(async teacher => {
    const { _lesson, _grades, ...rest } = teacher;
    if (!teacher._teacher) return;
    try {
      const newUser = await new User({ ...rest });
      const newTeacher = await new Teacher({
        _id: teacher._teacher,
        _user: newUser._id,
        _lesson,
        _grades
      });
      await newUser.save();
      await newTeacher.save();
    } catch (error) {
      console.log(error);
    }
  });
}
async function saveStudents(students, lessonsArr, gradesArr) {
  console.log(chalk.green('Saving'), 'student');
  const studentsClone = students.map(student => ({ ...student, _lessons: [], _grades: [] }));

  lessonsArr.forEach(lesson => {
    if (lesson._students) {
      lesson._students.forEach(stu => {
        const index = students.findIndex(student => student._student === stu);
        studentsClone[index]._lessons.push(lesson._id);
      });
    }
  });

  gradesArr.forEach(grade => {
    if (grade._student) {
      const studentIndex = students.findIndex(student => student._student === grade._student);
      studentsClone[studentIndex]._grades.push(grade._id);
    }
  });
  studentsClone.forEach(async student => {
    const { _lessons, _grades, ...rest } = student;
    if (!student._student) return;
    try {
      const newUser = await new User({ ...rest });
      const newStudent = await new Student({
        _id: student._student,
        _user: newUser._id,
        _lessons,
        _grades
      });
      await newUser.save();
      await newStudent.save();
    } catch (error) {
      console.log(error);
    }
  });
}

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

const seed = async () => {
  console.log(chalk.green('seed'), 'just started');

  const teachers = await createUsers('teacher');
  const students = await createUsers('student');
  const lessons = await createLessons(teachers, students);
  const grades = await createGrades(lessons, students);

  setTimeout(() => {
    saveTeachers(teachers, lessons, grades);
    saveStudents(students, lessons, grades);
    saveLessons(lessons);
    saveGrades(grades);
  }, 1000);

  setTimeout(() => saveAdmin(), 3000);
  setTimeout(() => {
    console.log(chalk.green('seed'), 'just ended');
    process.exit();
  }, 10000);
};

connectDB(seed);
