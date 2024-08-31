export type FieldType = 'uuid' | 'title' | 'description' | 'message' | 'fullName' | 'street' | 'city' | 'imageUrl' | 'date' | 'number' | 'boolean' | 'object';

export interface Field {
  id: string;
  name: string;
  type: FieldType;
  subFields?: Field[];
}
