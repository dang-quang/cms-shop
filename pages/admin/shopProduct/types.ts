import { Column } from 'react-table';
export interface IProduct {
  id: string;
  name: string;
  industry: string;
  trademark: string;
  origin: string;
  status: number;
  create_at: string;
}

export type TableData = Column<{
  product: {
    name: string;
    image: string;
    code: string;
  };
  industry: string;
  unit: string;
  price: number;
  origin: string;
  trademark: {
    id: number;
    name: string;
  };
}>;

export type ColumnData = Column[];

export type TableProps = {
  columnsData: ColumnData;
  tableData: TableData[];
};
