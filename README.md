# Dynamic JSON API Generator Platform

`dynamic-json-api-generator-platform` is a web-based tool built with Next.js and Prisma that enables users to create dynamic JSON data APIs on the fly. It leverages the power of the `dynamic-json-generator` npm package to generate customizable, fake JSON data and automatically exposes these as API endpoints.

## Features

- **Dynamic API Generation:** Create custom JSON data APIs based on user-defined templates.
- **Nested Structures:** Define complex JSON templates with nested objects.
- **Endpoint Creation:** Automatically create API endpoints with the generated data.
- **Preview JSON Data:** Preview the generated JSON data before creating the API.



## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dynamic-json-api-generator-platform.git
   ```

2. Install dependencies:
   ```bash
   cd dynamic-json-api-generator-platform
   npm install
   ```

3. Set up your database connection in the `.env` file:
   ```
   DATABASE_URL="your-database-connection-string"
   ```

4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Access the platform through your browser at `http://localhost:3000`
2. Create a new API by defining your JSON template
3. Customize API settings such as endpoint, number of records, and locale
4. Generate and test your dynamic API

## Create a JSON API:

- Define your JSON structure using the form fields.
- Generate preview data to visualize the JSON format.
- Once satisfied, click "Create API" to generate an API endpoint.
- Copy the API URL and start using it in your application.

## API Endpoints

- `POST /api/generate-json`: Create a new template.
- `GET /api/generate-json/:templateId`: Retrieve all saved templates.
- `GET /api/generate-json/:templateId/:id`: Retrieve a specific generated data.
- `POST /api/generate-json/:templateId/:id`: Create a new generated data.
- `PUT /api/generate-json/:templateId/:id`: Update a generated data.
- `DELETE /api/generate-json/:templateId/:id`: Delete a generated data.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Author

- [@htetko510217](https://www.github.com/htetko510217)

## Related Projects

- [Dynamic JSON npm Package](https://github.com/HtetKo510217/dynamic-json-generator)