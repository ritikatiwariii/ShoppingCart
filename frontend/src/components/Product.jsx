import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync, removeFromCartAsync } from "../redux/Slices/CartSlice";

const Product = ({ post }) => {

  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addToCartAsync(post));
    toast.success("Item added to Cart");
  }

  const removeFromCart = () => {
    dispatch(removeFromCartAsync(post.id));
    toast.error("Item removed from Cart");
  }

  const imageUrl = post.image;

  return (
    <div className="flex flex-col items-center justify-between w-full gap-3 p-4 rounded-xl 
    border-2 border-slate-100 shadow-lg hover:shadow-2xl hover:scale-[1.03]
    md:hover:scale-[1.05] transition ease-in">
      <div>
        <p className="text-[#1d783e] font-semibold text-lg text-left truncate w-40 mt-1">
          {post.title}
        </p>
      </div>
      <div>
        <p className="w-40 text-gray-400 font-normal text-[10px] text-left">
          {post.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>
      <div className="h-[200px] w-full mt-2 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-0">
        <img
          src={imageUrl}
          className="h-full w-full object-cover hover:scale-110 transition duration-700 ease-in-out"
          alt={post.title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800";
          }}
        />
      </div>

      <div className="flex justify-between items-center w-full mt-5">
        <div>
          <p className="text-green-600 font-semibold">${parseFloat(post.price || 0).toFixed(2)}</p>
        </div>

        {
          cart.some((p) => p.id === post.id || p.productId === post.id) ?
            (<button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in"
              onClick={removeFromCart}>
              Remove&nbsp;Item
            </button>) :
            (<button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in"
              onClick={addToCart}>
              Add&nbsp;to&nbsp;Cart
            </button>)
        }
      </div>


    </div>
  );
};

export default Product;
