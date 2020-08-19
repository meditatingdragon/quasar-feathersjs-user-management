import { makeAuthPlugin } from "../boot/feathersClient";

export default makeAuthPlugin({ userService: "users" });
