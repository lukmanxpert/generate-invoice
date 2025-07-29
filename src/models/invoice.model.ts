import mongoose from "mongoose";

interface IUserInvoice {
  name: string;
  email: string;
  address1: string;
  address2?: string;
  address3?: string;
}

interface IItems {
  item_name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IInvoice {
  _id: mongoose.Types.ObjectId;
  invoice_no: string;
  invoice_date: Date;
  due_date: Date;
  currency: string;

  // from (current user)
  from: IUserInvoice;

  //   to (client)
  to: IUserInvoice;

  //   items
  items: IItems[];

  sub_total: number;
  discount: number;

  //   tax details
  tax_percentage: number;
  total: number;
  notes?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
