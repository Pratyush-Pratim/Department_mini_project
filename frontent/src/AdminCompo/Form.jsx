import React, { useState } from "react";
import { api } from "../services/api";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    gender: "",
    dob: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.username || !formData.contact || !formData.password) {
      alert("First name, last name, username, contact and password are required");
      return;
    }

    try {
      const response = await api.post(
        "/auth/signup",
        {
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          gender: formData.gender,
          dob: formData.dob,
          contact: formData.contact,
        }
      );

      alert(response.data.message || "Guard enrolled successfully");
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        gender: "",
        dob: "",
        contact: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      gender: "",
      dob: "",
      contact: "",
    });
  };

  return (
    <div className="min-h-screen  bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl ">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Employee Enrollment
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastname"
              placeholder="Enter Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password  "
              placeholder="Enter the password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Gender */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">Gender</span>
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                <span className="ml-2 text-sm text-gray-600">Male</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                <span className="ml-2 text-sm text-gray-600">Female</span>
              </label>
            </div>
          </div>

          {/* DOB */}
          <div>
            <label htmlFor="DOB" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input 
              type="date" 
              id="DOB"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              id="contact"
              placeholder="+91 9859438383"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="reset"
              onClick={resetForm}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit Enrollment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
