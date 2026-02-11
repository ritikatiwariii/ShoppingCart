import { MdDeleteSweep } from "react-icons/md"
import { useDispatch } from "react-redux";
import { removeFromCartAsync } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(removeFromCartAsync(item.id));
    toast.error("Item Removed");
  }

  return (
    <div className="p-4 border-b-2 last:border-none border-slate-700">

      <div className="flex justify-between py-3.5 px-2.5 gap-14 flex-col md:flex-row">

        <div className="md:w-[30%] w-full flex justify-center items-center">
          <div className="w-[180px] h-[180px] flex justify-center items-center overflow-hidden rounded-xl border border-slate-200 p-0 bg-gray-50 shadow-sm">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-110 transition duration-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800";
              }}
            />
          </div>
        </div>
        <div className="md:w-[70%] w-full flex flex-col gap-5">
          <h1 className="text-xl font-[600] text-slate-700">{item.title}</h1>
          <h1 className="text-slate-700">{
            item.description.split(" ").slice(0, 15).join(" ") + "..."}
          </h1>
          <div className="flex justify-between">
            <p className="font-bold text-[#16a34a] text-lg">${parseFloat(item.price || 0).toFixed(2)}</p>
            <div
              onClick={removeFromCart}
              className="w-10 h-10 rounded-full bg-red-200 flex justify-center items-center
             hover:bg-red-400 group transition-all">
              <MdDeleteSweep fontSize={25} className="group-hover:text-white text-red-800 transition-all" />
            </div>
          </div>

        </div>


      </div>

    </div>
  );
};

export default CartItem;
