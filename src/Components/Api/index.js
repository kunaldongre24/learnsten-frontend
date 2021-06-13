import axios from "axios";

export async function getUserByUsername(username) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/user/${username}`
  );
  return response;
}
export async function getUserById(userId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/user/id/${userId}`
  );
  return response;
}
export async function getSchoolByUserId(userId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/school/user/${userId}`
  );
  return response;
}
export async function getSchoolBySchoolId(schoolId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/school/${schoolId}`
  );
  return response;
}
export async function getCoursesBySchoolId(schoolId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/course/school/${schoolId}`
  );
  return response;
}
export async function getSubjectsByCourseId(courseId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/subjectCourseMap/course/${courseId}`
  );
  return response;
}
export async function getSubjectById(subjectId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/subject/${subjectId}`
  );
  return response;
}
// export async function login(id) {
//   return await resolve(
//     axios.get(`http://some-api.com/users/${id}`).then((res) => res.data)
//   );
