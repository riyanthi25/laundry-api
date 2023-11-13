import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";

class OrderController {
  // getting all order data
  static async getOrder(req: Request, res: Response) {
    try {
      const result = await prisma.order.findMany();
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // get 1 order data by id
  static async getOrderById(req: Request, res: Response) {
    try {
      const orderId = Number(req.params.id);
      const result = await prisma.order.findUnique({
        where: { id: orderId },
      });
      if (result) {
        res.json({ data: result });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // create new order
  static async addOrder(req: Request, res: Response) {
    try {
      const { orderDate, totalCost, paymentMethod, customerId } = req.body;

      if (!orderDate || !totalCost || !paymentMethod || !customerId) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const result = await prisma.order.create({
        data: {
          orderDate,
          totalCost,
          paymentMethod,
          customerId: Number(customerId),
        },
      });

      res.json({ data: result });
    } catch (error) {
      console.error("Error while adding order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // updating order data
  static async updateOrder(req: Request, res: Response) {
    try {
      const orderId = Number(req.params.id);
      const existingOrder = await prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!existingOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      const { orderDate, totalCost, paymentMethod, customerId } = req.body;

      if (!orderDate || !totalCost || !paymentMethod || !customerId) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          orderDate,
          totalCost,
          paymentMethod,
          customerId: Number(customerId),
        },
      });

      res.json({ data: updatedOrder });
    } catch (error) {
      console.error("Error while updating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // delete 1 order data
  static async deleteOrder(req: Request, res: Response) {
    try {
      const orderId = Number(req.params.id);
      const existingOrder = await prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!existingOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      await prisma.order.delete({
        where: { id: orderId },
      });

      res.json({ message: "Order Data deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default OrderController;
