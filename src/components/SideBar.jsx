import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SideBar() {
  const navigate = useNavigate();
  const [user, serUser] = useState([]);
  const userId = localStorage.getItem('id');
  const imagePlaceholder =
    'https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg';
  const urlUsers = 'https://6682ae934102471fa4c7cf55.mockapi.io/users';
  const [imageUrl, setImageUrl] = useState(imagePlaceholder);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios.get(`${urlUsers}/${userId}`).then((response) => {
      setImageUrl(response.data.avatar);
    });
  }

  return (
    <nav className="xl:w-1/5 w-20 h-full flex flex-col xl:pr-4 max-md:hidden gap-2">
      <a
        href="#"
        className="group flex items-center mt-5 py-2 px-2 text-base leading-6 font-extrabold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          fill="white"
          className="h-8 w-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
        </svg>
      </a>
      <Link
        to={'../home'}
        className="group flex items-center ps-2 pe-4 py-2 text-base leading-6 font-extrabold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          className="mr-4 h-6 w-6 "
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
          />
        </svg>
        Home
      </Link>
      <a
        href="#"
        className="group flex items-center ps-2 pe-4 py-2 text-base leading-6 font-extrabold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          className="mr-4 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
        </svg>
        Explore
      </a>
      <a
        href="#"
        className="group flex items-center ps-2 pe-4 py-2 text-base leading-6 font-bold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          className="mr-4 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
        Notifications
      </a>
      <a
        href="#"
        className="group flex items-center ps-2 pe-4 py-2 text-base leading-6 font-bold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          className="mr-4 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        Messages
      </a>
      <a
        href="#"
        className="group flex items-center ps-2 pe-4 py-2 text-base leading-6 font-bold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          className="mr-4 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
        </svg>
        Grok
      </a>
      <a
        href="#"
        className="group flex items-center ps-2 pe-4 py-2 text-base leading-6 font-bold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          className="mr-4 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
        </svg>
        Lists
      </a>
      <a
        href="#"
        className="group flex items-center ps-2 pe-4 py-2 text-base leading-6 font-bold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          className="mr-4 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
        </svg>
        Bookmarks
      </a>

      <a
        href="#"
        className="group flex items-center ps-2 pe-4 py-2 text-base leading-6 font-bold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          className="mr-4 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
        Communities
      </a>

      <a
        href="#"
        className="group flex items-center ps-2 pe-4 py-2 text-base leading-6 font-bold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          className="mr-4 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
        Premium
      </a>
      <a
        href="#"
        className="group flex items-center ps-2 pe-4 py-2 text-base leading-6 font-bold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          className="mr-4 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
        Verified Orgs
      </a>

      <Link
        to={'../profile'}
        className="group flex items-center ps-2 pe-4 py-2 text-base leading-6 font-bold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          className="mr-4 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        Profile
      </Link>
      <a
        href="#"
        className="group flex items-center ps-2 pe-4 py-2 text-base leading-6 font-bold rounded-full hover:bg-gray-900 w-max "
      >
        <svg
          className="mr-4 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        More
      </a>

      <button className="bg-blue-400 w-48 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
        Post
      </button>
      <div className="flex-1 flex flex-col-reverse mb-4">
        <div className="group flex flex-row gap-2 ps-2 pe-7 py-2 text-base leading-6 font-bold rounded-full hover:bg-gray-900 w-max justify-center items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={
              imageUrl ||
              'https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg'
            }
            alt="User Avatar"
          />
          <div className="flex flex-col justify-center items-start">
            <span>{localStorage.getItem('userName')}</span>
            <span className="text-xs">
              @{localStorage.getItem('accountName')}
            </span>
          </div>
          <Link
            onClick={() => {
              localStorage.clear();
              navigate('../');
            }}
          >
            <svg
              fill="white"
              className="w-5 h-5 ml-3 hover:fill-red-500"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 384.971 384.971"
              xmlSpace="preserve"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g id="Sign_Out">
                    <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03 C192.485,366.299,187.095,360.91,180.455,360.91z"></path>
                    <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279 c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179 c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"></path>
                  </g>
                </g>
              </g>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
