const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
        },
        actions: {
            // Fetch all contacts for the agenda
            fetchContacts: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/cafeiguana');
                    const data = await response.json();
                    if (data && Array.isArray(data.contacts)) {
                        setStore({ contacts: data.contacts });
                    } else {
                        console.error("Unexpected data format:", data);
                    }
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                }
            }, // <-- Se agregó una coma aquí para cerrar la función fetchContacts correctamente
            
            // Add a new contact
            addContact: async (contact) => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/cafeiguana/contacts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(contact)
                    });
                    if (response.ok) {
                        const newContact = await response.json();
                        const store = getStore();
                        setStore({ contacts: [...store.contacts, newContact] });
                    }
                } catch (error) {
                    console.error("Error adding contact:", error);
                }
            },
            // Edit a contact
            editContact: async (id, updatedContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/cafeiguana/contacts/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedContact)
                    });
                    if (response.ok) {
                        const store = getStore();
                        setStore({
                            contacts: store.contacts.map(contact => 
                                contact.id === id ? { ...contact, ...updatedContact } : contact
                            )
                        });
                    }
                } catch (error) {
                    console.error("Error editing contact:", error);
                }
            },

            // Delete a contact
            deleteContact: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/cafeiguana/contacts/${id}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        const store = getStore();
                        const filteredContacts = store.contacts.filter(contact => contact.id !== id);
                        setStore({ contacts: filteredContacts });
                    }
                } catch (error) {
                    console.error("Error deleting contact:", error);
                }
            }
        }
    };
};

export default getState;