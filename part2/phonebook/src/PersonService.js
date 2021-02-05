import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

function getAll() {
  let request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

function create(newPerson) {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
}

function deletePerson(person) {
  let deleteUrl = baseUrl + `/${person.id}`;
  axios.delete(deleteUrl);
}

function update(person, id) {
  let updateUrl = baseUrl + `/${id}`;
  axios.put(updateUrl, person);
}

export default { create, getAll, deletePerson, update };
