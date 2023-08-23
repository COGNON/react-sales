export type SalesData = {
  ORDERNUMBER: number;
  QUANTITYORDERED: number;
  PRICEEACH: number;
  ORDERLINENUMBER: number;
  SALES: number;
  ORDERDATE: string;
  STATUS: Status;
  QTR_ID: Qtr;
  MONTH_ID: Month;
  YEAR_ID: number;
  PRODUCTLINE: ProductLine;
  MSRP: number;
  PRODUCTCODE: string;
  CUSTOMERNAME: string;
  PHONE: string;
  ADDRESSLINE1: string;
  ADDRESSLINE2: string;
  CITY: string;
  STATE: string;
  POSTALCODE: string;
  COUNTRY: string;
  TERRITORY: string;
  CONTACTLASTNAME: string;
  CONTACTFIRSTNAME: string;
  DEALSIZE: Size;
};

export type Status =
  | "Cancelled"
  | "Disputed"
  | "In Process"
  | "On Hold"
  | "Resolved"
  | "Shipped";

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Qtr = 1 | 2 | 3 | 4;

export type ProductLine =
  | "Classic Cars"
  | "Motorcycles"
  | "Planes"
  | "Ships"
  | "Trains"
  | "Trucks and Buses"
  | "Vintage Cars";

export type Size = "Small" | "Medium" | "Large";
