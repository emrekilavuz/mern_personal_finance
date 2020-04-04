import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="contact">
        <div className="container">
            <div className="contact-title">
                <h1>Send Us a Message</h1>
            </div>
            <form>
                <label>First Name</label>
                <input type="text" id="name" name="firstname" placeholder="Enter your first name..."/>

                <label>Last Name</label>
                <input type="text" id="name" name="lastname" placeholder="Enter your last name..."/>

                <label>Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email address..."/>

                <textarea id="subject" name="subject" placeholder="Enter your message..."
                    style={{height:"200px"}}></textarea>

                <button type="submit">Send</button>
            </form>
        </div>
    </section>
    );
};

export default Contact;