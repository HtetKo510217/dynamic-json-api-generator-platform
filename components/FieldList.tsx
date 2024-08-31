import React from 'react';
import { Field } from '@/lib/types';
import { FieldItem } from './FieldItem';

interface FieldListProps {
  fields: Field[];
  updateField: (id: string, updates: Partial<Field>) => void;
  removeField: (id: string) => void;
  addSubField: (id: string) => void;
  depth?: number;
}

export const FieldList: React.FC<FieldListProps> = ({ fields, updateField, removeField, addSubField, depth = 0 }) => {
  return (
    <>
      {fields.map((field, index) => (
        <FieldItem
          key={field.id}
          field={field}
          index={index}
          updateField={updateField}
          removeField={removeField}
          addSubField={addSubField}
          depth={depth}
        />
      ))}
    </>
  );
};
