import { Form } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import illustration from "../assets/illustration.jpeg";

function Intro() {
  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgetting is the secret to financial freedom. Start your
          journey today.
        </p>
        <Form method="POST">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} width={600} alt="Illustration" />
    </div>
  );
}

export default Intro;
