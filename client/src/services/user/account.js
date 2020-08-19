import { Notify } from "quasar";
import feathersClient from "../../boot/feathersClient";
import axiosInstance from "../../boot/axios";

export async function login(email, password) {
  return feathersClient.service("auth").post({
    strategy: "local",
    email: email,
    password: password
  });
}

export async function signup(firstname, lastname, email, password) {
  return axiosInstance.post("/users", {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password
  });
}

export async function updateProfile(id, user) {
  return feathersClient.service("users").patch(id, user);
}

export async function forgotPassword(email) {
  return axiosInstance.post("/authManagement", {
    action: "sendResetPwd",
    value: { email: email }
  });
}

export async function updatePasswordFromProfile(
  email,
  oldPassword,
  newPassword
) {
  return axiosInstance.post("/authManagement", {
    action: "passwordChange",
    value: {
      user: {
        email: email
      },
      oldPassword: oldPassword,
      password: newPassword
    }
  });
}

export async function updateIdentity(password, currentEmail, updatedEmail) {
  return axiosInstance.post("/authManagement", {
    action: "identityChange",
    value: {
      password: password,
      changes: { email: updatedEmail },
      user: {
        email: currentEmail
      }
    }
  });
}

export async function verifyAccount(token) {
  return axiosInstance.post("/authManagement", {
    action: "verifySignupLong",
    value: token
  });
}

export async function updateUser(user, id) {
  return feathersClient.service("users").patch(id, user);
}

export async function resendVerification(email) {
  return axiosInstance.post("/authManagement", {
    action: "resendVerifySignup",
    value: { email: email }
  });
}

export async function resetPassword(token, password) {
  return axiosInstance.post("/authManagement", {
    action: "resetPwdLong",
    value: { token: token, password: password }
  });
}
