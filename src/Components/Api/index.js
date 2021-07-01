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
export async function getCourseById(courseId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/course/${courseId}`
  );
  return response;
}
export async function getCoursesByUserId(userId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/course/user/${userId}`
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
export async function suggestSubject(subject) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/subject/suggestions/${subject}`,
    { withCredentials: true }
  );
  return response;
}
export async function getActivityByUserId(userId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/activity/${userId}`
  );
  return response;
}
export async function getAllCategories() {
  const response = await axios.get(`http://localhost:8000/api/v1/category`);
  return response;
}
export async function getSubcategoriesByCategoryId(categoryId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/category/subcategories/${categoryId}`
  );
  return response;
}

// export async function login(id) {
//   return await resolve(
//     axios.get(`http://some-api.com/users/${id}`).then((res) => res.data)
//   );
