# Markdownify MCP Server - UTF-8 Enhanced

This is an enhanced version of the [original Markdownify MCP project](https://github.com/cursor-ai/markdownify-mcp), with improved UTF-8 encoding support and optimized handling of multilingual content.

[中文文档](README-CN.md)

<a href="https://glama.ai/mcp/servers/51hyoj300s">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/51hyoj300s/badge" alt="Markdownify Server - UTF-8 Enhanced MCP server" />
</a>

## Enhancements

- Added comprehensive UTF-8 encoding support
- Optimized handling of multilingual content
- Fixed encoding issues on Windows systems
- Improved error handling mechanisms

## Key Differences from Original Project

1. Enhanced Encoding Support:
   - Full UTF-8 support across all operations
   - Proper handling of Chinese, Japanese, Korean and other non-ASCII characters
   - Fixed Windows-specific encoding issues (cmd.exe and PowerShell compatibility)

2. Improved Error Handling:
   - Detailed error messages in both English and Chinese
   - Better exception handling for network issues
   - Graceful fallback mechanisms for conversion failures

3. Extended Functionality:
   - Added support for batch processing multiple files
   - Enhanced YouTube video transcript handling
   - Improved metadata extraction from various file formats
   - Better preservation of document formatting

4. Performance Optimizations:
   - Optimized memory usage for large file conversions
   - Faster processing of multilingual content
   - Reduced dependency conflicts

5. Better Development Experience:
   - Comprehensive debugging options
   - Detailed logging system
   - Environment-specific configuration support
   - Clear documentation in both English and Chinese

## Features

Supports converting various file types to Markdown:
- PDF files
- Images (with metadata)
- Audio (with transcription)
- Word documents (DOCX)
- Excel spreadsheets (XLSX)
- PowerPoint presentations (PPTX)
- Web content:
  - YouTube video transcripts
  - Search results
  - General web pages
- Existing Markdown files

## Quick Start

1. Clone this repository:
   ```bash
   git clone https://github.com/JDJR2024/markdownify-mcp-utf8.git
   cd markdownify-mcp-utf8
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```
   Note: This will also install `uv` and related Python dependencies.

3. Build the project:
   ```bash
   pnpm run build
   ```

4. Start the server:
   ```bash
   pnpm start
   ```

## Requirements

- Node.js 16.0 or higher
- Python 3.8 or higher
- pnpm package manager
- Git

## Detailed Installation Guide

### 1. Environment Setup

1. Install Node.js:
   - Download from [Node.js official website](https://nodejs.org/)
   - Verify installation: `node --version`

2. Install pnpm:
   ```bash
   npm install -g pnpm
   pnpm --version
   ```

3. Install Python:
   - Download from [Python official website](https://www.python.org/downloads/)
   - Ensure Python is added to PATH during installation
   - Verify installation: `python --version`

4. (Windows Only) Configure UTF-8 Support:
   ```bash
   # Set system-wide UTF-8
   setx PYTHONIOENCODING UTF-8
   # Set current session UTF-8
   set PYTHONIOENCODING=UTF-8
   # Enable UTF-8 in command prompt
   chcp 65001
   ```

### 2. Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JDJR2024/markdownify-mcp-utf8.git
   cd markdownify-mcp-utf8
   ```

2. Create and activate Python virtual environment:
   ```bash
   # Windows
   python -m venv .venv
   .venv\Scripts\activate

   # Linux/macOS
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install project dependencies:
   ```bash
   # Install Node.js dependencies
   pnpm install

   # Install Python dependencies (will be handled by setup.sh)
   ./setup.sh
   ```

4. Build the project:
   ```bash
   pnpm run build
   ```

### 3. Verification

1. Start the server:
   ```bash
   pnpm start
   ```

2. Test the installation:
   ```bash
   # Convert a web page
   python convert_utf8.py "https://example.com"

   # Convert a local file
   python convert_utf8.py "path/to/your/file.docx"
   ```

## Usage Guide

### Basic Usage

1. Converting Web Pages:
   ```bash
   python convert_utf8.py "https://example.com"
   ```
   The converted markdown will be saved as `converted_result.md`

2. Converting Local Files:
   ```bash
   # Convert DOCX
   python convert_utf8.py "document.docx"

   # Convert PDF
   python convert_utf8.py "document.pdf"

   # Convert PowerPoint
   python convert_utf8.py "presentation.pptx"

   # Convert Excel
   python convert_utf8.py "spreadsheet.xlsx"
   ```

3. Converting YouTube Videos:
   ```bash
   python convert_utf8.py "https://www.youtube.com/watch?v=VIDEO_ID"
   ```

### Advanced Usage

1. Environment Variables:
   ```bash
   # Set custom UV path
   export UV_PATH="/custom/path/to/uv"

   # Set custom output directory
   export MARKDOWN_OUTPUT_DIR="/custom/output/path"
   ```

2. Batch Processing:
   Create a batch file (e.g., `convert_batch.txt`) with URLs or file paths:
   ```text
   https://example1.com
   https://example2.com
   file1.docx
   file2.pdf
   ```
   Then run:
   ```bash
   while read -r line; do python convert_utf8.py "$line"; done < convert_batch.txt
   ```

### Troubleshooting

1. Common Issues:
   - If you see encoding errors, ensure UTF-8 is properly set
   - For permission issues on Windows, run as Administrator
   - For Python path issues, ensure virtual environment is activated

2. Debugging:
   ```bash
   # Enable debug output
   export DEBUG=true
   python convert_utf8.py "your_file.docx"
   ```

## Usage

### Command Line

Convert web page to Markdown:
```bash
python convert_utf8.py "https://example.com"
```

Convert local file:
```bash
python convert_utf8.py "path/to/your/file.docx"
```

### Desktop App Integration

To integrate this server with a desktop app, add the following to your app's server configuration:

```js
{
  "mcpServers": {
    "markdownify": {
      "command": "node",
      "args": [
        "{ABSOLUTE_PATH}/dist/index.js"
      ],
      "env": {
        "UV_PATH": "/path/to/uv"
      }
    }
  }
}
```

## Troubleshooting

1. Encoding Issues
   - If you encounter character encoding issues, ensure the `PYTHONIOENCODING` environment variable is set to `utf-8`
   - Windows users may need to run `chcp 65001` to enable UTF-8 support

2. Permission Issues
   - Ensure you have sufficient file read/write permissions
   - On Windows, you may need to run as administrator

## Acknowledgments

This project is based on the original work by Zach Caceres. Thanks to the original author for their outstanding contribution.

## License

This project continues to be licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Before submitting a Pull Request, please:
1. Ensure your code follows the project's coding standards
2. Add necessary tests and documentation
3. Update relevant sections in the README

## Contact

For issues or suggestions:
1. Submit an Issue: https://github.com/JDJR2024/markdownify-mcp-utf8/issues
2. Create a Pull Request: https://github.com/JDJR2024/markdownify-mcp-utf8/pulls
3. Email: jdidndosmmxmx@gmail.com