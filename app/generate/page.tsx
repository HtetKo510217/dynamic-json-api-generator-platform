'use client';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Typography,
  Box,
  Snackbar,
  ThemeProvider,
  CssBaseline,
  Container,
} from '@mui/material';
import { AddCircleOutline as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import { generateJson, generateMultipleJson } from 'dynamic-json-generator';
import { Field } from '@/lib/types';
import { FieldList } from '@/components/FieldList';
import { theme } from '@/lib/theme';

const GenerateJsonApiGenerator: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([{ id: uuidv4(), name: '', type: 'uuid' }]);
  const [apiEndpoint, setApiEndpoint] = useState<string>('');
  const [previewData, setPreviewData] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const addField = () => {
    setFields([...fields, { id: uuidv4(), name: '', type: 'uuid' }]);
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)));
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const addSubField = (parentId: string) => {
    setFields(
      fields.map((field) => {
        if (field.id === parentId) {
          return {
            ...field,
            type: 'object',
            subFields: [...(field.subFields || []), { id: uuidv4(), name: '', type: 'uuid' }],
          };
        }
        return field;
      })
    );
  };

  const generateTemplate = async () => {
    const generateSubTemplate = (subFields: Field[] | undefined): any => {
      if (!subFields) return {};
      return subFields.reduce((acc, field) => {
        if (field.name) {
          acc[field.name] = field.type === 'object' ? generateSubTemplate(field.subFields) : field.type;
        }
        return acc;
      }, {} as any);
    };

    const template = fields.reduce((acc, field) => {
      if (field.name) {
        acc[field.name] = field.type === 'object' ? generateSubTemplate(field.subFields) : field.type;
      }
      return acc;
    }, {} as any);

    const generatedData = generateJson(template);
    setPreviewData(generatedData);

    try {
      const response = await axios.post('/api/generate-json', { template });
      const { apiEndpoint } = response.data;
      setApiEndpoint(apiEndpoint);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error generating API endpoint:', error);
    }
  };

  const generateMultiple = () => {
    const generateSubTemplate = (subFields: Field[] | undefined): any => {
      if (!subFields) return {};
      return subFields.reduce((acc, field) => {
        if (field.name) {
          acc[field.name] = field.type === 'object' ? generateSubTemplate(field.subFields) : field.type;
        }
        return acc;
      }, {} as any);
    };

    const template = fields.reduce((acc, field) => {
      if (field.name) {
        acc[field.name] = field.type === 'object' ? generateSubTemplate(field.subFields) : field.type;
      }
      return acc;
    }, {} as any);

    const generatedData = generateMultipleJson(template, 5); // Generates 5 instances of the JSON
    setPreviewData(generatedData);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold', mb: 3 }}>
            Dynamic JSON Generator
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
            Design your API structure by adding fields and nested objects. Once you're done, generate a preview and get a unique API endpoint.
          </Typography>

          <FieldList 
            fields={fields} 
            updateField={updateField} 
            removeField={removeField} 
            addSubField={addSubField} 
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 4 }}>
            <Button onClick={addField} startIcon={<AddIcon />} variant="contained" sx={{ mr: 2 }}>
              Add Field
            </Button>
            <Button onClick={generateTemplate} variant="contained" color="secondary" sx={{ mr: 2 }}>
              Generate API
            </Button>
            <Button onClick={generateMultiple} variant="outlined" color="secondary">
              Generate Multiple JSON
            </Button>
          </Box>

          {previewData && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Preview Data:
              </Typography>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {JSON.stringify(previewData, null, 2)}
              </pre>
            </Box>
          )}

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message={`API endpoint created: ${apiEndpoint}`}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default GenerateJsonApiGenerator;
