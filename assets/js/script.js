'use strict';

class Contact {
  #name;
  #city;
  #email;

  constructor(name, city, email) {
      this.#name = name;
      this.#city = city;
      this.#email = email;
  }

  get name() {
      return this.#name;
  }

  get city() {
      return this.#city;
  }

  get email() {
      return this.#email;
  }
}

const contacts = [];

function addContact() {
  const inputElement = document.querySelector(".contact-input");
  const validationMessageElement = document.querySelector(".validation-message");
  const [name, city, email] = inputElement.value.split(",").map(item => item.trim());

  validationMessageElement.textContent = "";

  if (!name || !city || !email || !validateEmail(email)) {
      validationMessageElement.textContent = "Please enter valid contact info (name, city, email).";
      return;
  }

  const newContact = new Contact(name, city, email);
  contacts.unshift(newContact);
  inputElement.value = "";
  listContacts();
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function listContacts() {
  const contactListElement = document.querySelector(".contact-list");
  contactListElement.innerHTML = "<p>Most recent contact</p>";
  
  contacts.forEach((contact, index) => {
      const contactDiv = document.createElement("div");
      contactDiv.classList.add("contact-card");
      if (index === 0) {
          contactDiv.classList.add("recent");
      }
      contactDiv.innerHTML = `
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>City:</strong> ${contact.city}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
      `;
      contactDiv.onclick = () => deleteContact(index);
      contactListElement.appendChild(contactDiv);
  });

  document.querySelector(".contact-count").textContent = `* ${contacts.length} contacts saved.`;
}

function deleteContact(index) {
  contacts.splice(index, 1);
  listContacts();
}
