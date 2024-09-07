'use client';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Typography,
  Box,
  Snackbar,
  IconButton,
  CircularProgress,
  ThemeProvider,
  CssBaseline,
  Container,
  TextField,
} from '@mui/material';
import { AddCircleOutline as AddIcon, FileCopy as FileCopyIcon } from '@mui/icons-material';
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
  const [template, setTemplate] = useState<any>(null);
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [slug, setSlug] = useState<string>(''); 

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

  const generateTemplate = () => {
    const generateSubTemplate = (subFields: Field[] | undefined): any => {
      if (!subFields) return {};
      return subFields.reduce((acc, field) => {
        if (field.name) {
          acc[field.name] = field.type === 'object' ? generateSubTemplate(field.subFields) : field.type;
        }
        return acc;
      }, {} as any);
    };

    const newTemplate = fields.reduce((acc, field) => {
      if (field.name) {
        acc[field.name] = field.type === 'object' ? generateSubTemplate(field.subFields) : field.type;
      }
      return acc;
    }, {} as any);

    setTemplate(newTemplate);
    return newTemplate;
  };

  const generatePreview = () => {
    const newTemplate = generateTemplate();
    const generatedData = generateJson(newTemplate);
    setPreviewData(generatedData);
    setIsMultiple(false);
  };

  const createApi = async () => {
    const newTemplate = generateTemplate();
    const generatedData = isMultiple ? generateMultipleJson(newTemplate, 5) : generateJson(newTemplate);
  
    setPreviewData(generatedData);
    if (!generatedData) {
      alert('No preview data available. Please generate a preview first.');
      return;
    }
    
    if (!slug) {
      alert('Please provide a slug for the API endpoint.');
      return;
    }

    setLoading(true);
  
    try {
      const dataToSend = isMultiple ? generatedData : [generatedData];
      const response = await axios.post('/api/generate-json', { data: dataToSend, slug });
      const { apiEndpoint } = response.data;
      setApiEndpoint(apiEndpoint);
      setSnackbarOpen(true);
    } catch (error : any) {
      if (error.response && error.response.status === 400) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        console.error('Error generating API endpoint:', error);
      }  
    } finally {
      setLoading(false);
    }
  };
  

  const generateMultiple = () => {
    const newTemplate = generateTemplate();
    const generatedData = generateMultipleJson(newTemplate, 5); // Generates 5 instances of the JSON
    setPreviewData(generatedData);
    setIsMultiple(true);
  };

  const copyToClipboard = () => {
    if (apiEndpoint) {
      navigator.clipboard.writeText(apiEndpoint);
      setSnackbarOpen(false); 
    }
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
            Design your API structure by adding fields and nested objects. Generate a preview, then create your API endpoint.
          </Typography>

          <TextField
            label="API Slug (e.g. my-api)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)} 
            fullWidth
            sx={{ mb: 4 }}
          />

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
            <Button onClick={generatePreview} variant="contained" color="secondary" sx={{ mr: 2 }}>
              Generate Preview
            </Button>
            <Button onClick={generateMultiple} variant="outlined" color="secondary" sx={{ mr: 2 }}>
              Generate Multiple JSON
            </Button>
            <Button
              onClick={createApi}
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Creating API...' : 'Create API'}
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
            autoHideDuration={15000}
            onClose={() => setSnackbarOpen(false)}
            message={`API endpoint created: ${apiEndpoint}`}
            action={
              <IconButton size="small" color="inherit" onClick={copyToClipboard}>
                <FileCopyIcon fontSize="small" />
              </IconButton>
            }
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default GenerateJsonApiGenerator;
