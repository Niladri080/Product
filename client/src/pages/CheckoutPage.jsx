import { useContext, useEffect, useRef, useState } from "react";
import { MapPin, Package, CreditCard, Truck } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { RiseLoader } from "react-spinners";
import { UserContext } from "../contexts/UserContext";

export default function CheckoutPage() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const name = useRef(null);
  const phone = useRef(null);
  const city = useRef(null);
  const state = useRef(null);
  const pincode = useRef(null);
  const addressLine1 = useRef(null);
  const addressLine2 = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [addressType, setAddressType] = useState("manual");
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [address, setAddress] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        "http://localhost:4000/api/dashboard/show-order",
        { id },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.order.products);
          setTotalAmount(res.data.totalPrice);
          setSubTotal(res.data.subTotalPrice);
          setDelivery(res.data.deliveryCharge);
          // Ensure address is always an object
          setAddress(res.data.address || {});
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Something unexpected happened.");
        setLoading(false);
      });
  }, [id]);

  const CancelOrder = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:4000/api/dashboard/cancel-order",
        { id },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/user/dashboard");
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Something unexpected happened.");
        setLoading(false);
      });
  };

  const handlePlaced = () => {
    let newAddress = {};

    if (addressType === "manual") {
      if (
        !name.current.value ||
        !phone.current.value ||
        !addressLine1.current.value ||
        !city.current.value ||
        !state.current.value ||
        !pincode.current.value
      ) {
        toast.error("Please fill all the required fields.");
        return;
      }
      newAddress = {
        name: name.current.value,
        phone: phone.current.value,
        line1: addressLine1.current.value,
        line2: addressLine2.current.value,
        city: city.current.value,
        state: state.current.value,
        pincode: pincode.current.value,
      };
    }

    setLoading(true);
    axios
      .post(
        "http://localhost:4000/api/dashboard/final-order",
        { id, address: newAddress },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/user/dashboard/checkout/placed");
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Something unexpected happened.");
        setLoading(false);
      });
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const mockAddress = {
            latitude,
            longitude,
            address: "123 Main Street, Downtown Area",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001",
          };

          setCurrentLocation(mockAddress);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get current location. Please enter address manually.");
          setIsLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLoadingLocation(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <RiseLoader />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Package className="h-6 w-6" />
                Checkout
              </h1>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Address Section */}
                  <div className="border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      Delivery Address
                    </h2>

                    {/* Address Type Selection */}
                    <div className="flex gap-4 mb-6">
                      <button
                        onClick={() => setAddressType("manual")}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                          addressType === "manual"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        Enter Manually
                      </button>
                      <button
                        onClick={() => setAddressType("current")}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                          addressType === "current"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        Use Current Location
                      </button>
                    </div>

                    {/* Manual Address Form */}
                    {addressType === "manual" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Full Name *"
                            ref={name}
                            defaultValue={user?.name || ""}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number *"
                            ref={phone}
                            defaultValue={address?.phone || ""}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Address Line 1 *"
                          ref={addressLine1}
                          defaultValue={address?.line1 || ""}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Address Line 2 (Optional)"
                          ref={addressLine2}
                          defaultValue={address?.line2 || ""}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            placeholder="City *"
                            ref={city}
                            defaultValue={address?.city || ""}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="State *"
                            ref={state}
                            defaultValue={address?.state || ""}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="PIN Code *"
                            ref={pincode}
                            defaultValue={address?.pin || ""}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}

                    {/* Current Location */}
                    {addressType === "current" && (
                      <div className="space-y-4">
                        {!currentLocation ? (
                          <button
                            onClick={getCurrentLocation}
                            disabled={isLoadingLocation}
                            className={`w-full py-3 px-4 rounded-lg border-2 border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 transition-all ${
                              isLoadingLocation
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:border-blue-400"
                            }`}
                          >
                            {isLoadingLocation
                              ? "Getting Location..."
                              : "Get Current Location"}
                          </button>
                        ) : (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                              <div>
                                <p className="font-medium text-green-800">
                                  Current Location
                                </p>
                                <p className="text-green-700">
                                  {currentLocation.address}
                                </p>
                                <p className="text-green-700">
                                  {currentLocation.city},{" "}
                                  {currentLocation.state} -{" "}
                                  {currentLocation.pincode}
                                </p>
                                <button
                                  onClick={() => setCurrentLocation(null)}
                                  className="text-sm text-green-600 hover:text-green-800 mt-2"
                                >
                                  Change Location
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      Payment Method
                    </h2>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Truck className="h-6 w-6 text-orange-600" />
                        <div>
                          <p className="font-medium text-orange-800">
                            Cash on Delivery (COD)
                          </p>
                          <p className="text-sm text-orange-700">
                            Pay when your order is delivered
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="space-y-6">
                  <div className="border rounded-lg p-6 sticky top-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    {products.map((product, index) => (
                      <div key={index} className="flex gap-4 mb-6">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-gray-600">Qty: {product.quantity}</p>
                          <p className="font-semibold text-gray-900">
                            ₹{product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="space-y-3 border-t pt-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subTotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span>{delivery === 0 ? "Free" : "₹" + delivery}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-3">
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                      </div>
                    </div>
                    <button
                      onClick={handlePlaced}
                      className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 mt-6"
                    >
                      Place Order - ₹ {totalAmount}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to cancel the order?")) {
                          CancelOrder();
                        }
                      }}
                      className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-all transform hover:scale-105 mt-2"
                    >
                      Cancel Order
                    </button>
                    <p className="text-sm text-gray-600 text-center mt-3">
                      You will pay ₹{totalAmount} when the order is delivered
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
