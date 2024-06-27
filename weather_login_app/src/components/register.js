import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div class="flex bg-[#00041f] items-center justify-center min-h-screen">
      <div class="w-full max-w-xs">
        <h3 class="text-3xl text-white text-center mb-4">Sign Up</h3>
        <form
          class="bg-[#00072d] shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleRegister}
        >
          <div class="mb-4">
            <label
              class="block text-slate-400 text-sm font-bold mb-2"
              for="first-name"
            >
              First name
            </label>
            <input
              class="bg-[#191f42] shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="first-name"
              type="text"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-slate-400 text-sm font-bold mb-2"
              for="last-name"
            >
              Last name
            </label>
            <input
              class="bg-[#191f42] shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="last-name"
              type="text"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-slate-400 text-sm font-bold mb-2"
              for="email-id"
            >
              Email Address
            </label>
            <input
              class="bg-[#191f42] shadow appearance-none rounded w-full py-2 px-3 text-swhite leading-tight focus:outline-none focus:shadow-outline"
              id="email-id"
              type="text"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-slate-400 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="bg-[#191f42] shadow appearance-none rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-slate-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/login"
            >
              Login Here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
