import express from "express";
import Orders from "../models/orderSchema.js";
import { isAuth } from "../utility/utils.js";

const orderRouter = express.Router();

orderRouter.get('/mine',isAuth, async (req, res)=>{

  try{
    const orders = await Orders.find({user: req.user._id});
    res.send(orders);

  }catch (error) {
    error.statusCode = 404;
    error.message = "User with given id Not found";
    next(error);
  }


})


orderRouter.post("/", isAuth, async (req, res, next) => {
  if (req.body.orderItems === undefined) {
    res.status(400).send({ message: "Cart is empty" });
    return;
  } else {
    if (req.body.orderItems.length === 0) {
      //res.status(400).send({ message: "Cart is empty" });
      let err = new Error();
      err.statusCode = 400;
      err.message = "Cart is empty";
      next(err);
    } else {
      try {
        const order = new Orders({
          orderItems: req.body.orderItems,
          shippingAddress: req.body.shippingAddress,
          paymentMethod: req.body.paymentMethod,
          itemsPrice: req.body.itemsPrice,
          shippingPrice: req.body.shippingPrice,
          taxPrice: req.body.taxPrice,
          totalPrice: req.body.totalPrice,
          user: req.user._id,
        });
        const createdOrder = await order.save();
        res
          .status(201)
          .send({ message: "New Order Created", order: createdOrder });
      } catch (error) {
        error.statusCode = 500;
        next(error);
      }
    }
  }
});

orderRouter.get("/:id", isAuth, async (req, res, next) => {
  try {
    const order = await Orders.findById(req.params.id);
    res.status(200).send(order);
  } catch (error) {
    error.statusCode = 404;
    error.message = "Order Not found";
    next(error);
  }
});

orderRouter.put("/:id/pay", isAuth, async (req, res, next)=>{
  try{
    const order = await Orders.findById(req.params.id);
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    }
    const updatedOrder = await order.save();
    res.send({ message:'Order Paid',order:updatedOrder})
  }catch(error){
    error.statusCode = 404;
    error.message = "Order Not found";
    next(error);
  }
});


export default orderRouter;
