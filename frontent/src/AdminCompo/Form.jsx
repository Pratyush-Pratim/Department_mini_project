import React from "react";

function Form() {
  return (
    <div className="min-h-screen  bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl ">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Employee Enrollment
        </h1>

        <form className="space-y-5">
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter First Name"
              name="firstname"
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
              name="lastname"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="Username"
              placeholder="Username"
              name="lastname"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password  "
              placeholder="Enter the password"
              name="lastname"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Gender */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">Gender</span>
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="gender" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                <span className="ml-2 text-sm text-gray-600">Male</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="gender" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
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
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@company.com"
              name="email"
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
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Residential Address</label>
            <input
              type="text"
              id="address"
              placeholder="Street, City, Zip Code"
              name="address"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Photo */}
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Employee Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="reset"
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