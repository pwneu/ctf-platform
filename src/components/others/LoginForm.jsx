import { Link } from "react-router-dom"; 
import React from "react";

export default function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="form-page__content lg:py-90 ">
      
      <div className="container">
        
        <div className="row justify-center items-center">
          <div className="col-xl-7 col-lg-9">
          <div className="px-90 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16 " >
        

              <h3 className="text-30 lh-13">Login</h3>
              <p className="mt-10">
                Don't have an account yet? 
                <Link to="/signup" className="text-purple-1">
                   Sign up for free
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Username Or Email
                  </label>
                  <input required type="text" name="title" placeholder="Name" />
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    name="title"
                    placeholder="Password"
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
