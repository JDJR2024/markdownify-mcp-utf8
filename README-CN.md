# Markdownify MCP Server - UTF-8 增强版

这是一个基于 [原始 Markdownify MCP 项目](https://github.com/cursor-ai/markdownify-mcp) 的改进版本，主要添加了更好的 UTF-8 编码支持，优化了对中文内容的处理。

## 主要改进

- 添加了完整的 UTF-8 编码支持
- 优化了中文内容的处理和显示
- 修复了在 Windows 环境下的编码问题
- 改进了错误处理机制

## 与原项目的主要区别

1. 增强的编码支持：
   - 全面的 UTF-8 支持，覆盖所有操作环节
   - 完善的中文、日文、韩文等非 ASCII 字符处理
   - 解决了 Windows 特有的编码问题（cmd.exe 和 PowerShell 兼容性）

2. 改进的错误处理：
   - 中英双语详细错误提示
   - 更好的网络异常处理机制
   - 转换失败时的优雅降级处理

3. 扩展的功能：
   - 新增批量处理多文件支持
   - 增强的 YouTube 视频转录处理
   - 改进的各类文件格式元数据提取
   - 更好地保留文档原有格式

4. 性能优化：
   - 优化大文件转换的内存使用
   - 加快多语言内容处理速度
   - 减少依赖冲突

5. 更好的开发体验：
   - 全面的调试选项
   - 详细的日志系统
   - 环境特定的配置支持
   - 中英双语完整文档

## 功能特性

支持将多种文件类型转换为 Markdown 格式：
- PDF 文件
- 图片（带元数据）
- 音频（带转录）
- Word 文档 (DOCX)
- Excel 表格 (XLSX)
- PowerPoint 演示文稿 (PPTX)
- 网页内容：
  - YouTube 视频转录
  - 搜索结果
  - 普通网页
- 已有的 Markdown 文件

## 环境要求

- Node.js 16.0 或更高版本
- Python 3.8 或更高版本
- pnpm 包管理器
- Git

## 详细安装指南

### 1. 环境配置

1. 安装 Node.js：
   - 从 [Node.js 官网](https://nodejs.org/) 下载
   - 验证安装：`node --version`

2. 安装 pnpm：
   ```bash
   npm install -g pnpm
   pnpm --version
   ```

3. 安装 Python：
   - 从 [Python 官网](https://www.python.org/downloads/) 下载
   - 确保安装时将 Python 添加到 PATH
   - 验证安装：`python --version`

4. (Windows 用户) 配置 UTF-8 支持：
   ```bash
   # 设置系统级 UTF-8
   setx PYTHONIOENCODING UTF-8
   # 设置当前会话 UTF-8
   set PYTHONIOENCODING=UTF-8
   # 启用命令提示符 UTF-8
   chcp 65001
   ```

### 2. 项目设置

1. 克隆仓库：
   ```bash
   git clone https://github.com/JDJR2024/markdownify-mcp-utf8.git
   cd markdownify-mcp-utf8
   ```

2. 创建并激活 Python 虚拟环境：
   ```bash
   # Windows
   python -m venv .venv
   .venv\Scripts\activate

   # Linux/macOS
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. 安装项目依赖：
   ```bash
   # 安装 Node.js 依赖
   pnpm install

   # 安装 Python 依赖（由 setup.sh 处理）
   ./setup.sh
   ```

4. 构建项目：
   ```bash
   pnpm run build
   ```

### 3. 验证安装

1. 启动服务器：
   ```bash
   pnpm start
   ```

2. 测试安装：
   ```bash
   # 转换网页
   python convert_utf8.py "https://example.com"

   # 转换本地文件
   python convert_utf8.py "path/to/your/file.docx"
   ```

## 使用指南

### 基本用法

1. 转换网页：
   ```bash
   python convert_utf8.py "https://example.com"
   ```
   转换后的 markdown 将保存为 `converted_result.md`

2. 转换本地文件：
   ```bash
   # 转换 Word 文档
   python convert_utf8.py "document.docx"

   # 转换 PDF
   python convert_utf8.py "document.pdf"

   # 转换 PowerPoint
   python convert_utf8.py "presentation.pptx"

   # 转换 Excel
   python convert_utf8.py "spreadsheet.xlsx"
   ```

3. 转换 YouTube 视频：
   ```bash
   python convert_utf8.py "https://www.youtube.com/watch?v=VIDEO_ID"
   ```

### 高级用法

1. 环境变量设置：
   ```bash
   # 设置自定义 UV 路径
   export UV_PATH="/custom/path/to/uv"

   # 设置自定义输出目录
   export MARKDOWN_OUTPUT_DIR="/custom/output/path"
   ```

2. 批量处理：
   创建批处理文件（例如 `convert_batch.txt`）包含 URL 或文件路径：
   ```text
   https://example1.com
   https://example2.com
   file1.docx
   file2.pdf
   ```
   然后运行：
   ```bash
   while read -r line; do python convert_utf8.py "$line"; done < convert_batch.txt
   ```

### 故障排除

1. 常见问题：
   - 如果遇到编码错误，确保正确设置了 UTF-8
   - Windows 用户遇到权限问题时，请以管理员身份运行
   - Python 路径问题，确保已激活虚拟环境

2. 调试：
   ```bash
   # 启用调试输出
   export DEBUG=true
   python convert_utf8.py "your_file.docx"
   ```

转换网页到 Markdown：
```bash
python convert_utf8.py "https://example.com"
```

转换本地文件：
```bash
python convert_utf8.py "path/to/your/file.docx"
```

### 在桌面应用中使用

要在桌面应用中集成此服务器，请在应用的服务器配置中添加：

```js
{
  "mcpServers": {
    "markdownify": {
      "command": "node",
      "args": [
        "{项目绝对路径}/dist/index.js"
      ],
      "env": {
        "UV_PATH": "/path/to/uv"
      }
    }
  }
}
```

## 常见问题解决

1. 编码问题
   - 如果遇到中文显示乱码，请确保系统环境变量 `PYTHONIOENCODING` 设置为 `utf-8`
   - Windows 用户可能需要在命令行中执行 `chcp 65001` 来启用 UTF-8 支持

2. 权限问题
   - 确保有足够的文件读写权限
   - 在 Windows 下可能需要以管理员身份运行

## 致谢

本项目基于 Zach Caceres 的原始项目修改而来。感谢原作者的杰出贡献。

## 许可证

本项目继续遵循 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 贡献指南

欢迎提交 Pull Request 来改进项目！在提交之前，请：
1. 确保代码符合项目的编码规范
2. 添加必要的测试和文档
3. 更新 README 中的相关内容

## 联系方式

如有问题或建议，请：
1. 提交 Issue：https://github.com/JDJR2024/markdownify-mcp-utf8/issues
2. 发起 Pull Request：https://github.com/JDJR2024/markdownify-mcp-utf8/pulls
3. 电子邮件：jdidndosmmxmx@gmail.com 