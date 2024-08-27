import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import '/src/styles/ContactList.css';

const ContactList = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchContacts();
    }, []);

    return (
        <div className="contact-list">
            <button onClick={() => window.location.href='/add'}>Add new contact</button>
            {store.contacts.length > 0 ? (
                store.contacts.map(contact => (
                    <div key={contact.id} className="contact-card">
                        <img 
                            src="https://thumbs.dreamstime.com/b/perfil-de-usuario-vectorial-avatar-predeterminado-179376714.jpg" // Usar la imagen predeterminada
                            alt="Profile" 
                        />
                        <div className="contact-info">
                            <h3>{contact.full_name}</h3>
                            <p>{contact.address}</p>
                            <p>{contact.phone}</p>
                            <p>{contact.email}</p>
                        </div>
                        <div className="contact-actions">
                            <button onClick={() => window.location.href=`/edit/${contact.id}`}><i className="fa-solid fa-pen-to-square"></i></button>
                            <button onClick={() => actions.deleteContact(contact.id)}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No contacts available</p>
            )}
        </div>
    );
};

export default ContactList;