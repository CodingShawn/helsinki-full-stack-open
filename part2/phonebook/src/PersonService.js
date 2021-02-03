import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

function create(newPerson) {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
}

export default {create};
