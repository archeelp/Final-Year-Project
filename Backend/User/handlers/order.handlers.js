import db from "../models/index.js";

export const buyProduct = (error, event) => {
  if (event.event === 'BuyProduct') {
    if (error) {
      console.log(error);
      return;
    }
    db.Order.create({
      address: event.args.address,
      mobileNumber: event.args.mobileNumber,
      email: event.args.email,
      name: event.args.name,
      productId: event.args.productId
    }).then(() => {
      console.log("Order created");
    }).catch((err) => {
      console.log(err);
    });
  }
};

export default { buyProduct };