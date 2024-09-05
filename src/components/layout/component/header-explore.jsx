import React, { useState } from "react";
import { Link } from "react-router-dom";  

export const HeaderExplore = ({ allClasses }) => {
  const [exploreActive, setExploreActive] = useState(false);

  return (
    <>
      <div className={`${allClasses ? allClasses : ""}`}>
        <Link
          to="#"
          onClick={() => setExploreActive((pre) => !pre)}
          className="d-flex items-center"
          data-el-toggle=".js-explore-toggle"
        >
          <i className="icon icon-explore mr-15"></i>
          Explore
        </Link>
      </div>

      <div
        className={`explore-content py-25 rounded-8 bg-white toggle-element js-explore-toggle ${exploreActive ? "-is-el-visible" : ""}`}
      >

        {/* Example of the updated code with correct link usage */}
        <div className="explore__item">
          <Link
            to="#"
            className="d-flex items-center justify-between text-dark-1"
          >
            Overview<div className="icon-chevron-right text-11"></div>
          </Link>
          <div className="explore__subnav rounded-8">
            <Link className="text-dark-1" to="#">
              Introduction to the Platform
            </Link>
            <Link className="text-dark-1" to="#">
              Key Features
            </Link>
            <Link className="text-dark-1" to="#">
              Getting Started Guide
            </Link>
          </div>
        </div>

        <div className="explore__item">
          <Link
            to="#"
            className="d-flex items-center justify-between text-dark-1"
          >
            Learning Materials <div className="icon-chevron-right text-11"></div>
          </Link>
          <div className="explore__subnav rounded-8">
            <Link className="text-dark-1" to="#">
              Introduction to Cybersecurity
            </Link>
            <Link className="text-dark-1" to="#">
              Networking Basics
            </Link>
            <Link className="text-dark-1" to="#">
              Operating Systems
            </Link>
            <Link className="text-dark-1" to="#">
              Web Application Security
            </Link>
            <Link className="text-dark-1" to="#">
              System Exploitation
            </Link>
            <Link className="text-dark-1" to="#">
              Network Security
            </Link>
            <Link className="text-dark-1" to="#">
              Advanced Penetration Testing
            </Link>
            <Link className="text-dark-1" to="#">
              Malware Analysis
            </Link>
            {/* Updated link structure */}
            <Link className="text-purple-1 underline" to="#">
              View All Courses
            </Link>
          </div>
        </div>

        <div className="explore__item">
          <Link
            to="#"
            className="d-flex items-center justify-between text-dark-1"
          >
            Challenge Categories <div className="icon-chevron-right text-11"></div>
          </Link>
          <div className="explore__subnav rounded-8">
            <Link className="text-dark-1" to="#">
              Web Exploitation
            </Link>
            <Link className="text-dark-1" to="#">
              Cryptography
            </Link>
            <Link className="text-dark-1" to="#">
              Forensics
            </Link>
            <Link className="text-dark-1" to="#">
              Reverse Engineering
            </Link>
            {/* Updated link structure */}
            <Link className="text-purple-1 underline" to="#">
              View All Courses
            </Link>
          </div>
        </div>

        <div className="explore__item">
          <Link to="#" className="text-dark-1">
            Capture the Flag (CTF) Competitions
          </Link>
        </div>

        <div className="explore__item">
          <Link to="#" className="text-dark-1">
            Certification Tracks
          </Link>
        </div>

        <div className="explore__item">
          <Link
            to="#"
            className="d-flex items-center justify-between text-dark-1"
          >
            Resources <div className="icon-chevron-right text-11"></div>
          </Link>
          <div className="explore__subnav rounded-8">
            <Link className="text-dark-1" to="#">
              VM Setup Guides
            </Link>
            <Link className="text-dark-1" to="#">
              Recommended Tools List
            </Link>
            <Link className="text-dark-1" to="#">
              Cybersecurity Terms
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};
