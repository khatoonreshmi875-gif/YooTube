import { useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";

const Googlesuccess = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState(".");
  useEffect(() => {
    setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("tokrn", token);
    if (token) {
      console.log("tokrn", token);
      localStorage.setItem("token", token);
        navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="flex h-screen w-full bg-gray-900 justify-center items-center ">
        <div className=" flex w-24 h-24 bg-gradient-to-br from-red-400 via-pink-400 to-purple-700 animate-spin  jusify-center items-center text-white pl-4 "> MINUTE </div>
        <div
          className="lg:text-6xl md:text-4xl sm:text-3xl text-xl  text-gray-400 bg-gradient-to-br from-red-400 via-pink-400 to-purple-700 
                   bg-clip-text text-transparent font-serif p-3"
        >
          Logging you in with Google{dots}
        </div>
      </div>
    </>
  );
};

export default Googlesuccess;
