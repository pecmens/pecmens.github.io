# Aurora 主题博客

Aurora 是一个现代化的博客主题，专为个人博客设计，具有优雅的设计、完整的功能和优秀的用户体验。

## ✨ 主要特性

### 🎨 主题特性
- **现代化设计**：采用简洁优雅的设计风格
- **响应式布局**：完美适配桌面、平板和移动设备
- **深色/浅色模式**：自动检测用户偏好，支持手动切换
- **极光动画效果**：页面加载时的精美极光动画
- **渐变色彩系统**：基于CSS变量的动态色彩系统

### 🚀 功能特性
- **实时搜索**：快速搜索文章内容和标签
- **分类浏览**：按分类快速浏览相关文章
- **阅读进度**：显示文章阅读进度条
- **性能监控**：内置性能指标监控
- **平滑滚动**：优雅的页面滚动效果
- **辅助功能**：完整的键盘导航和屏幕阅读器支持

### 📱 移动端优化
- **移动优先**：针对移动设备优化的响应式设计
- **触摸友好**：适合触摸操作的界面元素
- **性能优化**：针对移动网络的性能优化

## 📁 项目结构

```
.
├── index.html              # 博客首页
├── blog/                   # 博客文章目录
│   └── hello-world.html    # 示例文章
├── assets/                 # 静态资源目录
│   ├── css/               # 样式文件
│   │   └── main.css       # 主样式文件
│   └── js/                # JavaScript文件
│       └── main.js        # 主JavaScript文件
├── spec/                  # 规范文档目录
│   ├── theme-manifest.v1.json  # 主题配置规范
│   └── content-model.md   # 内容模型规范
└── README.md              # 项目说明文档
```

## 🎯 主题配置

### 色彩系统
主题采用现代化的色彩配置，包括：
- **主色调**：Primary (#6366F1) - 优雅的紫蓝色
- **次要色**：Secondary (#8B5CF6) - 柔和的紫色
- **强调色**：Accent (#06B6D4) - 清新的青色
- **表面色**：Surface 和 Background 完美协调

### 字体系统
- **英文字体**：Inter, system-ui, sans-serif
- **中文字体**：PingFang SC, Microsoft YaHei, sans-serif
- **代码字体**：'Fira Code', 'Monaco', 'Consolas', monospace

### 间距系统
使用8px基准的间距系统：
- `--space-xs`: 4px
- `--space-s`: 8px
- `--space-m`: 16px
- `--space-l`: 24px
- `--space-xl`: 32px
- `--space-xxl`: 48px

## 🛠️ 使用说明

### 1. 本地预览
```bash
# 进入项目目录
cd aurora-theme-blog

# 启动本地服务器
python -m http.server 8080

# 浏览器访问
open http://localhost:8080
```

### 2. 自定义配置
编辑 `spec/theme-manifest.v1.json` 文件来自定义主题配置：

```json
{
  "theme": {
    "name": "Aurora",
    "version": "1.0.0",
    "colors": {
      "primary": "#6366F1",
      "secondary": "#8B5CF6",
      "accent": "#06B6D4"
    }
  }
}
```

### 3. 添加文章
在 `blog/` 目录下创建新的HTML文件，或复制 `hello-world.html` 作为模板。

### 4. 自定义样式
编辑 `assets/css/main.css` 文件来自定义样式，支持CSS变量系统。

## 📋 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 开发指南

### JavaScript 模块
- **ThemeManager**：主题模式管理
- **BlogFeatures**：博客功能管理
- **SearchManager**：搜索功能
- **PerformanceMonitor**：性能监控
- **AccessibilityManager**：辅助功能

### CSS 变量
使用CSS变量实现主题的灵活配置：
```css
:root {
  --color-primary: #6366F1;
  --color-secondary: #8B5CF6;
  --font-size-base: 1rem;
  --radius-md: 8px;
}
```

### 性能优化
- CSS 和 JavaScript 文件压缩
- 图片懒加载
- 关键 CSS 内联
- 字体预加载

## 📈 性能指标

主题内置性能监控功能，包括：
- 页面加载时间
- DOM 加载完成时间
- 首次内容绘制 (FCP)
- 最大内容绘制 (LCP)
- 累积布局偏移 (CLS)
- 首次输入延迟 (FID)

## 🤝 贡献指南

欢迎提交 Issues 和 Pull Requests 来改进主题。

## 📄 许可证

本项目采用 MIT 许可证。

## 🙏 致谢

- 感谢所有为现代Web开发做出贡献的开发者们
- 基于最新的Web标准和最佳实践构建
- 受到极光美景启发的设计理念

---

**Aurora Theme Blog v1.0** - 现代化的博客主题体验
