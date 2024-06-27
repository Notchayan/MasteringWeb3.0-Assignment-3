import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/dashboard";
      toast.success("User logged in Successfully", {
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
    <div className="flex bg-[#00041f] items-center justify-center min-h-screen">
    <div className="w-full max-w-xs">
      <h3 className="text-3xl text-center text-white mb-4">Login</h3>
        <form className="bg-[#00072d] shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-slate-400 text-sm font-bold mb-2" for="email-id">
                    Email Address
                </label>
                <input
                    className=" bg-[#191f42] shadow appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="email-id" type="text" placeholder="Enter email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-6">
                <label className="block text-slate-400 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input
                    className="bg-[#191f42] shadow appearance-none rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="******************" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-slate-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Sign In
                </button>
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/register">
                    Register Here
                </a>
            </div>
        </form>
        <SignInwithGoogle/>
    </div>
</div>
  );
}

export default Login;
