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

const userInvoiceSchema = new mongoose.Schema<IUserInvoice>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, default: null },
    address3: { type: String, default: null },
  },
  {
    _id: false,
  }
);

const itemSchema = new mongoose.Schema<IItems>(
  {
    item_name: { type: String, default: null, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  {
    _id: false,
  }
);
