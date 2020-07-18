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
// Adds course to student card
function appendCourses(data) {
  const courseList = document.querySelector('.course-list')
  const select = document.createElement('select')
  select.innerHTML = `${data[1].map(el =>
    `<option value="${el.name}">${el.name}</option>`)}`
  courseList.appendChild(select)
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
// Creates student cards of users  in database
function createStudentCard(data) {
  const studentSection = document.getElementById('student-section')
  const div = document.createElement('div')

  div.className = 'row'
  div.innerHTML = `${data[0].map(el =>
    `<div class="card col-md-4" style="width: 20rem;">
  <div class="card-body">
    <h5 class="card-title">${el.name} ${el.last_name}</h5>
   <div id="course-options" class="card-text course-list "></div>
    <button data-toggle="collapse" data-target="#course-options" aria-expanded="false"
          aria-controls="course-options" class="btn btn-outline-info card-link">Add Course</button>
    <button class="btn btn-outline-info card-link">Edit Info</button>
  </div>
</div>`)}`

  studentSection.appendChild(div)
}

function getStudents() {
  Promise.all([fetchData(studentURl), fetchData(coursesURL)])
    .then((values) => {
      // console.log(values)
      createStudentCard(values)
    })
    .catch(err => console.log(err))
}
function getCourses() {
  Promise.all([fetchData(studentURl), fetchData(coursesURL)])
    .then((values) => {
      // console.log(values)
      createCourseCard(values)
    })
    .catch(err => console.log(err))
}

studentBtn.addEventListener('click', getStudents)
coursesBtn.addEventListener('click', getCourses)
