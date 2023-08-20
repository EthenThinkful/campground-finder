"use client";
import SimpleForm from "@/components/SimpleForm";
import Testing from "@/components/Testing";

const Home: React.FC = () => {
  const handleSubmit = (inputValue: string) => {
    // Process the form data here, e.g., send it to an API
    console.log("Submitted:", inputValue);
  };
  // return <SimpleForm onSubmit={handleSubmit} />;
  return <Testing />;
};
export default Home;
