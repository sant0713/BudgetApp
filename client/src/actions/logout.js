import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem } from "../helpers";

export async function logoutAction() {
  //Delete User
  deleteItem({
    key: "userName",
  });
  toast.success("You've deleted your account!");
  // Redirect
  return redirect("/");
}
