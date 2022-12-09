import React, { useState } from "react";

const HomePage: React.FC = () => {
  const [userId, setUserId] = useState<string>("");

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
