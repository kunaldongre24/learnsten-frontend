import axios from "axios";

export async function getUserByUsername(username) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/user/${username}`,
    {
      withCredentials: true,
    }
  );
  return response;
}
export async function getUserById(userId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/user/id/${userId}`,
    {
      withCredentials: true,
    }
  );
  return response;
}
export async function getSchoolByUserId(userId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/school/user/${userId}`,
    {
      withCredentials: true,
    }
  );
  return response;
}
export async function getSchoolBySchoolId(schoolId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/school/${schoolId}`,
    {
      withCredentials: true,
    }
  );
  return response;
}
// export async function login(id) {
//   return await resolve(
//     axios.get(`http://some-api.com/users/${id}`).then((res) => res.data)
//   );
