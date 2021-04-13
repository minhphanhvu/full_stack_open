import axios from 'axios';
const baseURL = 'http://localhost:3001/api/persons';

const getAllContacts = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data); 
}

const createContact = newContact => {
  const request = axios.post(baseURL, newContact);
  return request.then(response => response.data);
}

const destroyContact = id => {
  const request = axios.delete(baseURL + `/${id}`);
  return request.then(response => response.data);
}

const updateContact = (id, contact) => {
  const request = axios.put(baseURL + `/${id}`, contact);
  return request.then(response => response.data);
}

export default { getAllContacts, createContact, destroyContact, updateContact };