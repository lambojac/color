import Contact from "../models/Contact.js";

export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

export const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email)
    return res.status(400).json({ message: "Name and Email required" });

  const newContact = new Contact({ name, email, phone });
  await newContact.save();
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const updated = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  await Contact.findByIdAndDelete(id);
  res.json({ message: "Contact deleted" });
};
