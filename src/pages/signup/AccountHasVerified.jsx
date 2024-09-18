import React from "react";
import { Link } from "react-router-dom";


export default function AccountHasVerified() {
  return (
  
     <div className="form-page__content lg:py-50">
     <div className="container">
       <div className="row justify-center items-center">
         <div className="col-xl-8 col-lg-9">
           <div className="px-50 py-50 md:px-25 md:py-25 bg-white rounded-16">
             <h3 className="text-30 lh-17 text-center">
             Thank you for confirming!
             </h3>
             <p className="mt-20  text-34  text-center">
             We’ve verified your account with the email  <br></br>
             david.roderos@neu.edu.ph. You're all set!
             </p>

             <p className="mt-15 text-34 text-center">
                To get started, go to{" "}
                <Link to="/pneu-competition" className="text-custom-color text-bold">
                  PNEU Competition
                </Link>{" "}
                and begin your journey!
              </p>
           </div>
         </div>
       </div>
     </div>
   </div>
    
  );
}
