import { useState } from "react";
import React from "react";
import Api, { responseErrorHandler } from "../utils/Api/Api";
import { toast } from "react-toastify";
import validator from "validator";
import Popup from "./Popup/Popup";
import Input from "./Input";
import Radio from "./Radio";

const AuthModal = ({ setIsAuthenticated, close, isSignIn }) => {
  const [signIn, setSignIn] = useState(isSignIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");

  const submit = async () => {
    if (!validator.isEmail(email)) {
      return toast.error("Invalid Email Address");
    }
    if (!signIn && !validator.isMobilePhone(`+91${mobile}`)) {
      return toast.error("Invalid Mobile Number");
    }
    if (!signIn && name.length < 3) {
      return toast.error("Invalid Name");
    }
    if (password.length < 8) {
      return toast.error("Please Use A Password With Minimum Length 8");
    }
    const toastElement = toast.loading(
      signIn ? "Logging You In" : "Signing You Up"
    );
    try {
      const response = signIn
        ? await Api.auth.signIn({ email, password })
        : await Api.auth.signUp({
          email,
          password,
          mobile,
          name,
          role
        });
      toast.update(toastElement, {
        render: signIn
          ? "Logged In Successfully"
          : "Account Created Successfully",
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      return close();
    } catch (error) {
      responseErrorHandler(error, toastElement);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 modal">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        {signIn ? "Sign In" : "Register"}
      </h2>
      {!signIn && <Input label="Full Name" name="name" setter={setName} />}
      <Input label="Email" type="email" setter={setEmail} />
      {!signIn && (
        <Input label="Mobile Number" type="number" setter={setMobile} />
      )}
      {!signIn && (
        <Radio
          label="Role"
          value={role}
          setter={setRole}
          options={[
            {
              label: "Team",
              value: "team",
              name: "role",
            },
            {
              label: "Athlete",
              value: "athlete",
              name: "role",
            },
          ]}
        />
      )}
      <Input label="Password" type="password" setter={setPassword} />
      <button
        onClick={submit}
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {signIn ? "Sign In" : "Register"}
      </button>
      <div className="text-s text-gray-500 mt-3">
        {signIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={() => setSignIn(!signIn)} className="text-indigo-500">
          {signIn ? "Register" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

const Auth = ({ setIsAuthenticated, isSignIn, className, ...props }) => {
  return (
    <Popup
      Button={
        <button className={className}>
          LogIn
        </button>
      }
      Modal={AuthModal}
      setIsAuthenticated={setIsAuthenticated}
      isSignIn={isSignIn}
      {...props}
    />
  );
};

export default Auth;
