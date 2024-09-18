"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { Code, Copy } from "lucide-react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CopyButton = ({ text }: { text: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Button
      startIcon={<Copy size={16} />}
      onClick={copyToClipboard}
      size="small"
      variant="outlined"
      sx={{ textTransform: "none" }}
    >
      Copy
    </Button>
  );
};

const ExpandableJsonBlock = ({ json }: { json: string }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const formattedJson = JSON.stringify(JSON.parse(json), null, 2);
  const displayedJson = expanded
    ? formattedJson
    : formattedJson.substring(0, 150) + "...";

  return (
    <>
      <Typography
        variant="body2"
        component="pre"
        sx={{
          whiteSpace: "pre-wrap",
          bgcolor: "#f1f1f1",
          p: 2,
          borderRadius: 2,
          border: "1px solid #ccc",
          fontFamily: "monospace",
          fontSize: "0.9rem",
        }}
      >
        {displayedJson}
      </Typography>
      <Button
        size="small"
        startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        onClick={toggleExpand}
        variant="text"
        sx={{ textTransform: "none", mt: 1 }}
      >
        {expanded ? "Show Less" : "Show More"}
      </Button>
    </>
  );
};

const GuidePage = () => {
  const jsonData = [
    {
      id: "8845adef-1f06-47a0-933d-afeff2fd99f1",
      templateId: "a1335cde-58a8-4672-8e39-e82bc82d472e",
      data: {
        id: "d400c2b5-6c0b-498d-8aec-ae48b68c96e9",
        title: "Constans cohibeo delego candidus",
        description:
          "Sublime communis a ocer crur suadeo vito coruscus comedo.",
        body: {
          id: "7a882d3c-532f-4f08-8f06-1033e98f02ca",
          image: "https://loremflickr.com/640/480?lock=8862728009547776",
          gender: true,
        },
      },
      createdAt: "2024-09-08T14:15:05.722Z",
    },
    {
      id: "c15bc712-10da-41c3-bc8f-358592dc44f4",
      templateId: "a1335cde-58a8-4672-8e39-e82bc82d472e",
      data: {
        id: "d400c2b5-6c0b-498d-8aec-ae48b68c96e9",
        title: "generate title",
        description: "Sublime communis a ocer crur suadeo",
        body: {
          id: "7a882d3c-532f-4f08-8f06-1033e98f02ca",
          image: "https://loremflickr.com/640/480?lock=8862728009547776",
          gender: true,
        },
      },
      createdAt: "2024-09-08T14:15:05.780Z",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa", py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          gutterBottom
          color="textPrimary"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Dynamic JSON API Generator Guide
        </Typography>

        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography
            variant="h5"
            gutterBottom
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Getting Started
          </Typography>
          <Typography variant="body1" paragraph>
            Our Dynamic JSON API Generator allows you to create custom API
            endpoints that serve JSON data based on your defined structure.
            Follow these steps to create and use your custom API:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="1. Define Your JSON Structure"
                secondary="Use our visual editor to create your desired JSON structure."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="2. Generate API Endpoint"
                secondary="Click 'Create API' to generate your unique API endpoint."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="3. Use Your API"
                secondary="Use the provided endpoint to interact with your custom API."
              />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography
            variant="h5"
            gutterBottom
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            API Usage Examples
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Base URL
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "#e8f0fe",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 1,
              }}
            >
              <Typography variant="body1" component="code">
                https://dynamic-json-api-generator-platform.vercel.app/api/generate-json/
              </Typography>
              <CopyButton text="https://dynamic-json-api-generator-platform.vercel.app/api/generate-json/" />
            </Paper>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Getting All Resources
            </Typography>
            <Paper
              elevation={0}
              sx={{ p: 2, bgcolor: "#fff", borderRadius: 1 }}
            >
              <Typography
                variant="body2"
                component="pre"
                sx={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                }}
              >
                {`fetch('https://dynamic-json-api-generator-platform.vercel.app/api/generate-json/your-slug')
  .then((response) => response.json())
  .then((json) => console.log(json));`}
              </Typography>
            </Paper>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Example Output:
            </Typography>
            <ExpandableJsonBlock json={JSON.stringify(jsonData)} />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Creating a Resource
            </Typography>
            <Paper
              elevation={0}
              sx={{ p: 2, bgcolor: "#fff", borderRadius: 1 }}
            >
              <Typography
                variant="body2"
                component="pre"
                sx={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                }}
              >
                {`fetch('https://dynamic-json-api-generator-platform.vercel.app/api/generate-json/your-slug', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: {
      id: "d400c2b5-6c0b-498d-8aec-ae48b68c96e9",
      title: "Constans cohibeo delego candidus",
      description: "Sublime communis a ocer crur suadeo vito coruscus comedo."
      body: {
       id: "7a882d3c-532f-4f08-8f06-1033e98f02ca",
      image: "https://loremflickr.com/640/480?lock=8862728009547776",
      gender: true
      },
    }
  })
})
.then((response) => response.json())
.then((json) => console.log(json));`}
              </Typography>
            </Paper>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Example Output:
            </Typography>
            <ExpandableJsonBlock json={JSON.stringify(jsonData[0])} />
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Getting a Specific Resource
            </Typography>
            <Paper
              elevation={0}
              sx={{ p: 2, bgcolor: "#fff", borderRadius: 1 }}
            >
              <Typography
                variant="body2"
                component="pre"
                sx={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                }}
              >
                {`fetch('https://dynamic-json-api-generator-platform.vercel.app/api/generate-json/your-slug/unique-id-1')
  .then((response) => response.json())
  .then((json) => console.log(json));`}
              </Typography>
            </Paper>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Example Output:
            </Typography>
            <ExpandableJsonBlock json={JSON.stringify(jsonData[0])} />
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            color="secondary"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Additional Operations
          </Typography>
          <List>
          <ListItem>
              <ListItemText
                primary="Deleting All Resources (DELETE)"
                secondary="PUT /api/generate-json/your-slug"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Updating a Resource (PUT)"
                secondary="PUT /api/generate-json/your-slug/unique-id"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Deleting a Resource (DELETE)"
                secondary="DELETE /api/generate-json/your-slug/unique-id"
              />
            </ListItem>
          </List>
        </Paper>

        <Divider sx={{ mt: 4, mb: 2 }} />
        <Typography variant="caption" color="textSecondary" align="center">
          &copy; 2024 Dynamic JSON API Generator
        </Typography>
      </Container>
    </Box>
  );
};

export default GuidePage;
