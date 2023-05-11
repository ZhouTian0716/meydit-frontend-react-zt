import React from "react";
import { useParams } from "react-router-dom";

const ClientProjects = () => {
  const { accountId } = useParams();
  return <div>ClientProjects</div>;
};

export default ClientProjects;
