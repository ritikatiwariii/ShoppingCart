import { useState, useEffect } from "react";
import Product from "../components/Product";
import { products } from "../data";

const Home = () => {
  const API_URL = "https://shoppingcart-backend-5vhc.onrender.com/api/products";
  const [posts, setPosts] = useState(products);

  async function fetchProductData() {
    // Silent background update - no loading state needed for initial render
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);
    }
    catch (error) {
      console.log("Error fetching fresh data, using static backup");
      // No need to clear posts, we keep the static data if fetch fails
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [])

  return (
    <div>
      {
        posts.length > 0 ?
          (<div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5
        gap-y-8 max-w-6xl p-6 mx-auto my-7 min-h-[80vh]">
            {
              posts.map((post) => (
                <Product key={post.id} post={post} />
              ))
            }
          </div>) :
          <div className="w-screen h-screen flex justify-center items-center">
            <p className="font-bold">No Data Found</p>
          </div>
      }
    </div>
  );
};

export default Home;
