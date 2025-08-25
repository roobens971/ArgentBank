import { useState } from "react";

export default function MyForm() {
  const [username, setUsername] = useState("");
  const [firstname] = useState("");
  const [lastname] = useState("");


  return (
    <>
      <div>
        <h1>Edit user info</h1>

        <label htmlFor="username">
          User name:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label htmlFor="firstname">
          First name:
          <input disabled value={firstname} />
        </label>
        
         <label htmlFor="lastname">
          Last name:
          <input disabled value={lastname} />
        </label>
      </div>

      <div>
        <button>Save</button>
        <button>Cancel</button>
      </div>
    </>
  );
}
