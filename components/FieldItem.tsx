import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  AddCircleOutline as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { Field, FieldType } from '@/lib/types';
import { FieldList } from './FieldList';

interface FieldItemProps {
  field: Field;
  index: number;
  updateField: (id: string, updates: Partial<Field>) => void;
  removeField: (id: string) => void;
  addSubField: (id: string) => void;
  depth?: number;
}

const fieldTypes: FieldType[] = [
  'uuid', 'title', 'description', 'message','firstName', 'lastName', 'fullName',
  'street', 'city', 'gender', 'phone', 'image', 'avatar', 'date', 'weekday', 
  'month', 'boolean', 'number', 'object'
];

export const FieldItem: React.FC<FieldItemProps> = ({ field, index, updateField, removeField, addSubField, depth = 0 }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        ml: depth * 4,
        bgcolor: depth % 2 === 0 ? 'background.paper' : 'grey.100',
        borderLeft: depth > 0 ? '2px solid' : 'none',
        borderColor: 'primary.main',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          value={field.name}
          onChange={(e) => updateField(field.id, { name: e.target.value })}
          placeholder="Field name"
          size="small"
          sx={{ mr: 2, flexGrow: 1 }}
        />
        <Select
          value={field.type}
          onChange={(e) => updateField(field.id, { type: e.target.value as FieldType })}
          size="small"
          sx={{ mr: 2, minWidth: 120 }}
        >
          {fieldTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <IconButton onClick={() => removeField(field.id)} color="error" size="small">
          <DeleteIcon />
        </IconButton>
        {field.type === 'object' && (
          <IconButton onClick={() => setExpanded(!expanded)} size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
      </Box>
      {field.type === 'object' && expanded && (
        <Box sx={{ mt: 2 }}>
          <Button onClick={() => addSubField(field.id)} startIcon={<AddIcon />} variant="outlined" size="small" sx={{ mb: 2 }}>
            Add Sub-field
          </Button>
          {field.subFields && (
            <FieldList
              fields={field.subFields}
              updateField={(subFieldId, updates) => {
                updateField(field.id, {
                  subFields: field.subFields?.map((subField) =>
                    subField.id === subFieldId ? { ...subField, ...updates } : subField
                  ),
                });
              }}
              removeField={(subFieldId) => {
                updateField(field.id, {
                  subFields: field.subFields?.filter((subField) => subField.id !== subFieldId),
                });
              }}
              addSubField={addSubField}
              depth={depth + 1}
            />
          )}
        </Box>
      )}
    </Paper>
  );
};
