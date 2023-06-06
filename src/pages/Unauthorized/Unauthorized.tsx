import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>Your login user do not have the match role to access the requested page</p>
      <button type="button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}

export default Unauthorized;
