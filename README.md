# Image Converter

![Image Converter OG](/og/og-image.png)

**Image Converter** is a web application that allows users to convert PNG images to various formats, including WebP, ICO, and compressed PNG. It provides a simple and intuitive interface for optimizing and converting images with ease.

## Features

- **Convert PNG to WebP**: Convert PNG images to WebP format without compression.
- **Convert PNG to Compressed WebP**: Convert PNG images to WebP format with adjustable quality settings.
- **Convert PNG to ICO**: Convert PNG images to ICO format for favicons.
- **Compress PNG**: Compress PNG images with adjustable quality settings.
- **Drag-and-Drop Support**: Easily upload images by dragging and dropping them into the app.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Real-Time Preview**: Preview the uploaded image before conversion.

## Technologies Used

- [Next 15](https://nextjs.org/) for the framework.
- [Tailwind CSS V4](https://tailwindcss.com/) for the styling.
- [React Dropzone](https://react-dropzone.js.org/) for drag-and-drop functionality.
- [Shadcn](https://ui.shadcn.com/docs) for toast notifications.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/image-converter.git
   ```

2. Navigate to the project directory:

   ```bash
   cd image-converter
   ```

3. Install dependencies:

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit `http://localhost:3000` to view the application.

### Usage

1. **Upload an Image**:
   - Drag and drop a PNG image into the upload area, or click to select a file from your computer.

2. **Select Conversion Format**:
   - Choose the desired format from the tabs:
     - **WebP**: Convert to WebP without compression.
     - **WebP Compressed**: Convert to WebP with adjustable quality.
     - **ICO**: Convert to ICO format.
     - **PNG Compressed**: Compress PNG with adjustable quality.

3. **Adjust Quality (if applicable)**:
   - Use the slider to adjust the quality for compressed formats.

4. **Convert**:
   - Click the "Convert" button to start the conversion process.
   - Once the conversion is complete, the converted image will be downloaded automatically.

5. **Notifications**:
   - Success or error messages will be displayed as toast notifications.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
