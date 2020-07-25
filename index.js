const studentBtn = document.getElementById('students')
const coursesBtn = document.getElementById('courses')
const newStudentBtn = document.getElementById('new_students')
const studentURl =
  'https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json'
const coursesURL =
  'https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json'

// checks that response status is greenlit
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response)
  }
  return Promise.reject(new Error(response.statusText))
}

// takes a url and checks for ok status, then returns json data
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
}
// function updateStudentInfo(student, name){

// }
function addCoursesandStudents(student, course) {
  const selectedCourse = document.getElementById('course-selection').selectedOptions
  const targetStudent = this.students.find(s => s.id === student.id)
  targetStudent.courses.push(course)
  const targetCourse = this.courses.find(c => c.id === course.id)
  targetCourse.students.push(student)
}
// function addCourse(student, course) {
//   if (!student.courses) {
//     student.courses = [course]
//   } else {
//     student.courses.push(course)
//   }
// }


// returns an alert if enrolled in more than 4 classes
function checkCoursesAllowed(student, course) {
  if (student.courses && student.courses.length >= 4) {
    const courseOption = document.getElementById('course-options')

    courseOption.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Sorry!</strong>, you are already assigned to the maximum number of classes.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`
    throw Error('Only allowed to be in 4 classes')
  }
  addCoursesandStudents(student, course)
}

// Adds course to student card
async function appendCard(data) {
  const students = await data[0]
  const courses = await data[1]
  const studentSection = document.getElementById('student-section')
  const div = document.createElement('div')

  div.className = 'row'
  div.innerHTML = `${students.map(el =>
    `<div class="card col-md-4" style="width: 20rem;">
    <div class-"card-header">
    <h5>${el.name} ${el.last_name}</h5>${
  el.status
    ? '<span class="status"></span>'
    : '<span class="status" style="visibility: hidden;"></span>'
}
    </div>
  <div class="card-body">
    <div id="course-options" class="modal" role="dialog" tabindex="-1" aria-hidden="true">
    <div class="modal-header">
      <label for="courses" class="modal-title">Join a course</label>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <fieldset>
    <legend>Choose up to 4 courses</legend>
    ${courses.map(element => `<div>
   <input type="checkbox" id="${element.name}" name="courses" value="${element.name}">
    <label for="${element.name}">${element.name}</label>
    </div>`)}
    </fieldset>
    </div>
    <button data-toggle="modal" data-target="#course-options" class="btn btn-outline-info card-link">Add Course</button>
    <button class="btn btn-outline-info card-link">Edit Info</button>
  </div>
</div>`)}`

  studentSection.appendChild(div)
}
function createCourseCard(data) {
  const courseSection = document.getElementById('course-section')
  const div = document.createElement('div')

  div.className = 'row'
  div.innerHTML = `${data[1].map(el =>
    `<div class="card col-md-4">
      <div class="card-body">
        <h5 class="card-title">${el.name} ${el.duration}</h5>
        <button class="btn btn-outline-info card-link" data-toggle="collapse" data-target="#add-student" aria-expanded="false" aria-controls="add-student">Add student</button>
      </div>
    </div>`)}`

  console.log(data)
  courseSection.appendChild(div)
}

function getStudents() {
  Promise.all([fetchData(studentURl), fetchData(coursesURL)])
    .then((values) => {
      // console.log(values)
      // createStudentCard(values)
      appendCard(values)
    })
    .catch((err) => { throw Error(err) })
}
function getCourses() {
  Promise.all([fetchData(studentURl), fetchData(coursesURL)])
    .then((values) => {
      // console.log(values)
      createCourseCard(values)
    })
    .catch((err) => { throw Error(err) })
}

studentBtn.addEventListener('click', getStudents)
coursesBtn.addEventListener('click', getCourses)
