import { z } from "zod";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { Markdownify } from "./Markdownify.js";
import * as tools from "./tools.js";
import { CallToolRequest } from "@modelcontextprotocol/sdk/types.js";

const RequestPayloadSchema = z.object({
  filepath: z.string().optional(),
  url: z.string().optional(),
  projectRoot: z.string().optional(),
  uvPath: z.string().optional(),
});

// 自定义一个MCP工具调用Schema，兼容mcp-client
const McpCallToolRequestSchema = {
  ...CallToolRequestSchema,
  method: z.literal("mcp.tools.call"),
};

export function createServer() {
  const server = new Server(
    {
      name: "mcp-markdownify-server",
      version: "0.1.0",
    },
    {
      capabilities: {
        tools: {},
      },
    },
  );

  // 处理工具列表请求
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.log("Handling tools/list request");
    return {
      tools: Object.values(tools),
    };
  });

  // 也注册mcp.tools.list方法以兼容mcp-client
  server.setRequestHandler({
    ...ListToolsRequestSchema,
    method: z.literal("mcp.tools.list"),
  }, async () => {
    console.log("Handling mcp.tools.list request");
    return {
      tools: Object.values(tools),
    };
  });

  // 处理工具调用的函数 - 将其提取为单独函数以便复用
  const handleToolCall = async (request: CallToolRequest) => {
    console.log(`Handling tool call for: ${request.params.name}`, request.params);
    const { name, arguments: args } = request.params;

    const validatedArgs = RequestPayloadSchema.parse(args);

    try {
      let result;
      switch (name) {
        case tools.YouTubeToMarkdownTool.name:
        case tools.BingSearchResultToMarkdownTool.name:
        case tools.WebpageToMarkdownTool.name:
          if (!validatedArgs.url) {
            throw new Error("URL is required for this tool");
          }
          result = await Markdownify.toMarkdown({
            url: validatedArgs.url,
            projectRoot: validatedArgs.projectRoot,
            uvPath: validatedArgs.uvPath || process.env.UV_PATH,
          });
          break;

        case tools.PDFToMarkdownTool.name:
        case tools.ImageToMarkdownTool.name:
        case tools.AudioToMarkdownTool.name:
        case tools.DocxToMarkdownTool.name:
        case tools.XlsxToMarkdownTool.name:
        case tools.PptxToMarkdownTool.name:
          if (!validatedArgs.filepath) {
            throw new Error("File path is required for this tool");
          }
          result = await Markdownify.toMarkdown({
            filePath: validatedArgs.filepath,
            projectRoot: validatedArgs.projectRoot,
            uvPath: validatedArgs.uvPath || process.env.UV_PATH,
          });
          break;

        case tools.GetMarkdownFileTool.name:
          if (!validatedArgs.filepath) {
            throw new Error("File path is required for this tool");
          }
          result = await Markdownify.get({
            filePath: validatedArgs.filepath,
          });
          break;

        default:
          throw new Error("Tool not found");
      }

      return {
        content: [
          { type: "text", text: `Output file: ${result.path}` },
          { type: "text", text: `Converted content:` },
          { type: "text", text: result.text },
        ],
        isError: false,
      };
    } catch (e) {
      if (e instanceof Error) {
        return {
          content: [{ type: "text", text: `Error: ${e.message}` }],
          isError: true,
        };
      } else {
        console.error(e);
        return {
          content: [{ type: "text", text: `Error: Unknown error occurred` }],
          isError: true,
        };
      }
    }
  };

  // 注册标准工具调用处理程序
  server.setRequestHandler(CallToolRequestSchema, handleToolCall);

  // 注册MCP客户端工具调用处理程序
  server.setRequestHandler(McpCallToolRequestSchema, handleToolCall);

  // 直接为每个工具注册一个方法，以便可以直接调用
  Object.values(tools).forEach((tool) => {
    server.setRequestHandler({
      ...CallToolRequestSchema,
      method: z.literal(tool.name),
    }, async (request: CallToolRequest) => {
      console.log(`Direct tool call for: ${tool.name}`);
      // 修改请求以匹配handleToolCall的预期格式
      const modifiedRequest = {
        ...request,
        params: {
          name: tool.name,
          arguments: request.params.arguments || {},
        },
      };
      return handleToolCall(modifiedRequest);
    });
  });

  return server;
}
