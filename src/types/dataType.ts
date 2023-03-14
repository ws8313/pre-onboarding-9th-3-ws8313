export interface ChartKeyType {
  [date: string]: ChartValueType;
}

export interface ChartValueType {
  id: string;
  value_area: number;
  value_bar: number;
}

export interface ChartType {
  date: string;
  id: string;
  line_value: number;
  bar_value: number;
}
