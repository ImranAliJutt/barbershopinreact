import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null); // Track the appointment being edited
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    description: '',
  });
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
        alert('Appointment deleted successfully');
      } else {
        alert('Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const replyToEmail = (email, date) => {
    const subject = encodeURIComponent("✂️ Appointment Confirmation with Blakkloud Barber 🗓️");
    const body = encodeURIComponent(
      `Hi there 👋,\n\n` +
      `🎉 We're excited to confirm your appointment at Blakkloud Barber! 🎉\n\n` +
      `📅 **Date:** ${date}\n` +
      `📍 **Location:** Blakkloud Barber,208 Caribou St, Banff, AB T1L 1B9 \n\n` +
      `Thank you for choosing us! If you have any questions, feel free to reach out.\n\n` +
      ` 📞 *PH:** +1 (403) 762-2771\n` +
      `Best Regards,\n` +
      `The Blakkloud Barber Team 💈✂️`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const startEditing = (appointment) => {
    setEditingAppointment(appointment.id);
    setFormData({
      firstName: appointment.firstName,
      lastName: appointment.lastName,
      email: appointment.email,
      phone: appointment.phone,
      date: appointment.date,
      description: appointment.description,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateAppointment = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setAppointments(appointments.map(appointment => 
          appointment.id === id ? { ...appointment, ...formData } : appointment
        ));
        alert('Appointment updated successfully');
        setEditingAppointment(null); // Close the edit form
      } else {
        alert('Failed to update appointment');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('auth'); // Remove authentication token
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard - Appointments</h2>
        <button onClick={handleLogout} className="btn btn-logout">LOGOUT <i className="fa-solid fa-arrow-up-from-bracket"></i></button>
      </div>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.firstName}</td>
              <td>{appointment.lastName}</td>
              <td>{appointment.email}</td>
              <td>{appointment.phone}</td>
              <td>{appointment.date}</td>
              <td>{appointment.description}</td>
              <td>
                <button onClick={() => deleteAppointment(appointment.id)} className="btn btn-delete">
                  Delete <i className="fa-solid fa-trash-can"></i>
                </button>
                <button onClick={() => replyToEmail(appointment.email, appointment.date)} className="btn btn-reply">
                  Reply <i className="fa-regular fa-envelope"></i>
                </button>
                <button onClick={() => startEditing(appointment)} className="btn btn-edit">
                  Edit <i className="fa-regular fa-pen-to-square"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form Modal */}
      {editingAppointment && (
        <div className="edit-form">
          <h3>Edit Appointment</h3>
          <form onSubmit={(e) => { e.preventDefault(); updateAppointment(editingAppointment); }}>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" required />
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" rows="4"></textarea>
            <button type="submit" className="btn btn-save">Save</button>
            <button type="button" onClick={() => setEditingAppointment(null)} className="btn btn-cancel">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
