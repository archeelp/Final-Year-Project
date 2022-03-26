import db from "../models/index.js";

export const buyProduct = (event) => {
  if (event.event === 'BuyProduct') {
    db.Order.create({
      address: event.returnValues.deliveryAddress,
      mobileNumber: event.returnValues.mobileNumber,
      email: event.returnValues.email,
      name: event.returnValues.name,
      productId: event.returnValues.productId
    }).then(() => {
      console.log("Order created");
    }).catch((err) => {
      console.log(err);
    });
  }
};

export default { buyProduct };