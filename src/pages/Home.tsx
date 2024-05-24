import { useNavigate } from "react-router-dom";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useAuth0 } from "@auth0/auth0-react";
import MainProducts from "@/components/MainProducts";

const Home = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  console.log(useAuth0().isAuthenticated);

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md p-6 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl text-black ">Food is just a click away!</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <span className="flex items-center">
        <span className="h-px flex-1 bg-black dark:bg-white"></span>
        <span className="shrink-0 px-6">Our Food</span>
        <span className="h-px flex-1 bg-black dark:bg-white"></span>
      </span>
      <MainProducts />
    </div>
  );
};

export default Home;
