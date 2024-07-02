import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const urlUsers = 'https://6682ae934102471fa4c7cf55.mockapi.io/users';
  const navigate = useNavigate();

  function handleLogin() {
    let valid = true;

    if (inputEmail === '') {
      valid = false;
      setEmailAlert('border-red-400');
    } else if (!/\S+@\S+\.\S+/.test(inputEmail)) {
      valid = false;
      setEmailAlert('border-red-400');
    } else {
      setEmailAlert('');
    }

    if (inputPassword.length < 5) {
      valid = false;
      setPasswordAlert('border-red-400');
    } else {
      setPasswordAlert('');
    }

    if (valid) {
      axios.get(urlUsers).then((response) => {
        console.log(response);

        if (response.data) {
          const dataFound = response.data.find((e) => {
            return e.email === inputEmail && e.password === inputPassword;
          });
          if (dataFound) {
            setInputEmail('');
            setInputPassword('');
            navigate('../home');
            localStorage.setItem('accountName', dataFound.accountName);
            localStorage.setItem('email', dataFound.email);
            localStorage.setItem('id', dataFound.id);
            localStorage.setItem('userName', dataFound.userName);
          }
        }
      });
    }
  }

  return (
    <div className="container">
      <div className="flex justify-center items-center min-h-screen text-center gap-5">
        <div className="w-[40%] max-md:hidden flex flex-row-reverse">
          <svg
            className="w-[60%]"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 512 462.799"
          >
            <path
              fillRule="nonzero"
              d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
            />
          </svg>
        </div>
        <div className="w-[50%] max-md:w-full flex flex-col items-center">
          <svg
            className="w-10 mb-2"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 512 462.799"
          >
            <path
              fillRule="nonzero"
              d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
            />
          </svg>
          <h1 className="text-3xl font-bold mb-4">Login to your account</h1>
          <form className="w-full max-w-sm text-left">
            <div className="mb-4">
              <label
                className="mx-2 block text-dim-100 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`peer w-full bg-transparent outline-none text-base py-3 px-4  rounded-md  border-2 ${
                  emailAlert === '' ? `border-dim-200` : emailAlert
                } focus:border-[#4070f4] focus:shadow-md`}
                id="email"
                type="email"
                placeholder="Your Email"
                onChange={(e) => {
                  setInputEmail(e.target.value);
                }}
                value={inputEmail}
              />
            </div>
            <div className="mb-4">
              <label
                className="mx-2 block text-dim-100 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`peer w-full bg-transparent outline-none text-base py-3 px-4  rounded-md  border-2 ${
                  passwordAlert === '' ? `border-dim-200` : passwordAlert
                } focus:border-[#4070f4] focus:shadow-md`}
                id="password"
                type="password"
                placeholder="Your Password"
                onChange={(e) => {
                  setInputPassword(e.target.value);
                }}
                value={inputPassword}
              />
            </div>
            <p>
              Don't you have an account?{' '}
              <Link to={'../'} className="text-dim-100">
                Sign up
              </Link>
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className="bg-blue-400 w-48 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
