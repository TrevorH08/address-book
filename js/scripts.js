// Business Logic for AddressBook ---------

function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Contact.prototype.addAddresses = function(address) {
//   address.id = this.assignAddressId();
//   this.addresses[address.id] = address;
// };

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.addresses = {};
}

function Addresses(emailAddress, homeAddress, workAddress) {
  this.emailAddress = emailAddress;
  this.homeAddress = homeAddress;
  this.workAddress = workAddress;
  
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

Contact.prototype.addAddresses = function(addresses) {
  this.addresses= addresses;
};

// User Interface Logic ---------
let addressBook = new AddressBook();


function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  const addressList = document.querySelector("div#address-list");
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
  let emailAddressD = document.querySelector(".email-address");
  let homeAddressD = document.querySelector(".home-address");
  let workAddressD = document.querySelector(".work-address");

  emailAddressD.innerText =  contact.addresses.emailAddress;
  homeAddressD.innerText =  contact.addresses.homeAddress;
  workAddressD.innerText =  contact.addresses.workAddress;

}

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmailAddress = document.querySelector("input#new-email-address").value;
  const inputtedHomeAddress = document.querySelector("input#new-home-address").value;
  const inputtedWorkAddress = document.querySelector("input#new-work-address").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
  let contactAddresses = new Addresses(inputtedEmailAddress, inputtedHomeAddress, inputtedWorkAddress);
  newContact.addAddresses(contactAddresses);
  // let home = { Home: inputtedHomeAddress };
  // let work = { Work: inputtedHomeAddress };
  // let email = { Email: inputtedEmailAddress };
  // let address = { name: "Various Addresses", addressType: [home, work, email] };
  addressBook.addContact(newContact);
  listContacts(addressBook);
  console.log(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null;
  document.querySelector("input#new-email-address").value = null;
  document.querySelector("input#new-home-address").value = null;
  document.querySelector("input#new-work-address").value = null;
}

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
});

