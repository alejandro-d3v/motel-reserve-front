import Navbar from "../components/Navbar";

export default function HomeLayout({ children }: any) {
  return (
    <>
      <Navbar /> 
  
      <div>
        {children}
      </div>
    </>
  );
}