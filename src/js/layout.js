import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/appContext';
import ScrollToTop from './component/scrollToTop';
import ContactList from './views/ContactList';
import ContactForm from './views/ContactForm';


const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<ContactList />} />
                        <Route path="/add" element={<ContactForm />} />
                        <Route path="/edit/:id" element={<ContactForm />} />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
