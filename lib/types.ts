export type FieldType =
  | 'uuid'         // Universally unique identifier
  | 'title'        // Sentence title
  | 'description'  // Detailed paragraph description
  | 'message'      // Paragraph message (similar to description)
  | 'firstName'    // First name
  | 'lastName'     // Last name
  | 'fullName'     // Full name (first name + last name)
  | 'street'       // Street address
  | 'city'         // City name
  | 'gender'       // Gender (sex type)
  | 'phone'        // Phone number (string of 10 digits)
  | 'image'        // Image URL
  | 'avatar'       // Avatar image URL
  | 'date'         // Date formatted as 'YYYY-MM-DD'
  | 'weekday'      // Weekday name
  | 'month'        // Month name
  | 'boolean'      // Boolean value (true/false)
  | 'number'       // Numeric value (between 1 and 100)
  | 'object';      // Object for nested fields

export interface Field {
  id: string;
  name: string;
  type: FieldType;
  subFields?: Field[];
}
