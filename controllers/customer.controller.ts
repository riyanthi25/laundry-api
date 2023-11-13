import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import { CustomerRequestBody } from "../interface/customer";

class CustomerController {

  // getting all customers data
  static async getCustomer(req: Request, res: Response) {
    try {
      const result = await prisma.customer.findMany();
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // get 1 customer data by id
  static async getCustomerById(req: Request, res: Response) {
    try {
      const customerId = Number(req.params.id);
      const result = await prisma.customer.findUnique({
        where: { id: customerId },
      });
      if (result) {
        res.json({ data: result });
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // create new customer 
  static async addCustomer(req: Request, res: Response) {
    try {
      const { name, address, phoneNumber, paymentInfo } = req.body as CustomerRequestBody;

      if (!name || !address || !phoneNumber || !paymentInfo) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const result = await prisma.customer.create({
        data: {
          name,
          address,
          phoneNumber,
          paymentInfo,
        },
      });

      console.log(result);
      res.json({ data: result });
    } catch (error) {
      console.error("Error while adding customer:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // updating customer data
  static async updateCustomer(req: Request, res: Response) {
    try {
      const customerId = Number(req.params.id);
      const existingCustomer = await prisma.customer.findUnique({
        where: { id: customerId },
      });

      if (!existingCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      const { name, address, phoneNumber, paymentInfo } = req.body;

      if (!name || !address || !phoneNumber || !paymentInfo) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const updatedCustomer = await prisma.customer.update({
        where: { id: customerId },
        data: {
          name,
          address,
          phoneNumber,
          paymentInfo,
        },
      });

      res.json({ data: updatedCustomer });
    } catch (error) {
      console.error("Error while updating customer:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // delete 1 customer data
  static async deleteCustomer(req: Request, res: Response) {
    try {
      const customerId = Number(req.params.id);
      const existingGenre = await prisma.customer.findUnique({
        where: { id: customerId },
      });
      if (!existingGenre) {
        return res.status(404).json({ message: "Customer not found" });
      }
      await prisma.customer.delete({
        where: { id: customerId },
      });
      res.json({ message: "Customer Data deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default CustomerController;
