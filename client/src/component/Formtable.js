import React from 'react'
import "../App.css"
export default function Formtable({handleonChange,handleSubmit,handleClose,rest}) {
  return (
    <div className="overlay">
          <div className="form-container">
            <button className="cross-btn" onClick={handleClose}>
              &#10005;
            </button>
            <form className="form" onSubmit={handleSubmit}>
              <h2>Add User</h2>

              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={rest.name} onChange={handleonChange} required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={rest.email} onChange={handleonChange} required />

              <label htmlFor="mobile">Mobile No:</label>
              <input type="tel" id="mobile" name="mobile"  value={rest.mobile}onChange={handleonChange} required />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
  )
}
