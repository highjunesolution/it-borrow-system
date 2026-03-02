import React, { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | IT Assets System";
  }, []);
  return <div>Contact</div>;
};

export default Contact;
