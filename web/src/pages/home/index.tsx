import React from "react";
import MainLayout from "../../layouts/mainLayouts/mainLayouts";

const HomePage: React.FC = () => {
  return (
    <>
      <MainLayout>
        {
          <h1>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque,
            enim nemo iste laudantium, obcaecati commodi nulla tempore
            reiciendis consectetur ex illo non est mollitia voluptatum a!
            Corrupti temporibus recusandae in.
          </h1>
        }
      </MainLayout>
    </>
  );
};

export default HomePage;
