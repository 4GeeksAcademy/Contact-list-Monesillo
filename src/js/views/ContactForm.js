import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import '/src/styles/ContactForm.css';

const ContactForm = ({ contactId }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const contact = store.contacts.find(c => c.id === contactId) || {};
    
    const [formData, setFormData] = useState({
        full_name: contact.full_name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        address: contact.address || '',
        agenda_slug: 'cafeiguana'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (contactId) {
            actions.editContact(contactId, formData);
        } else {
            actions.addContact(formData);
        }
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{contactId ? 'Edit Contact' : 'Add a new contact'}</h2>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
            <button type="submit">Save</button>
            <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </form>
    );
};

export default ContactForm;