# Aurora主题 - 内容模型规范 v1.0

## 概述

本文档定义了Aurora主题博客的内容模型规范，确保内容的一致性、可维护性和可扩展性。

## 1. 内容结构

### 1.1 文章结构
每篇博客文章应包含以下标准化结构：

```html
<article class="post">
  <!-- 文章头部信息 -->
  <header class="post-header">
    <div class="post-meta">
      <time datetime="2024-12-30">2024年12月30日</time>
      <span class="reading-time">3分钟阅读</span>
      <span class="author">作者姓名</span>
    </div>
    <h1 class="post-title">文章标题</h1>
    <div class="post-tags">
      <span class="tag">标签1</span>
      <span class="tag">标签2</span>
    </div>
  </header>
  
  <!-- 文章摘要 -->
  <div class="post-excerpt">
    <p>文章摘要内容...</p>
  </div>
  
  <!-- 文章正文 -->
  <div class="post-content">
    <!-- 正文内容 -->
  </div>
  
  <!-- 文章尾部 -->
  <footer class="post-footer">
    <div class="post-navigation">
      <a href="#" class="prev-post">上一篇</a>
      <a href="#" class="next-post">下一篇</a>
    </div>
  </footer>
</article>
```

### 1.2 页面类型

#### 1.2.1 首页 (index.html)
- 站点介绍
- 最新文章列表
- 分类导航
- 搜索功能

#### 1.2.2 文章页面 (blog/post-slug.html)
- 完整文章内容
- 相关文章推荐
- 评论系统(可选)

#### 1.2.3 分类页面 (category/category-slug.html)
- 特定分类的文章列表
- 分类描述

#### 1.2.4 标签页面 (tag/tag-slug.html)
- 特定标签的文章列表

## 2. 元数据规范

### 2.1 文章元数据
```json
{
  "title": "文章标题",
  "description": "文章描述(SEO友好)",
  "date": "2024-12-30T10:00:00Z",
  "modified": "2024-12-30T10:00:00Z",
  "author": {
    "name": "作者姓名",
    "bio": "作者简介",
    "avatar": "/assets/images/author-avatar.jpg"
  },
  "categories": ["技术", "前端"],
  "tags": ["JavaScript", "CSS", "HTML"],
  "readingTime": 3,
  "wordCount": 450,
  "coverImage": "/assets/images/post-cover.jpg",
  "excerpt": "文章摘要...",
  "status": "published", // draft, published, archived
  "featured": false,
  "allowComments": true
}
```

### 2.2 SEO元数据
```html
<meta name="description" content="文章描述">
<meta name="keywords" content="关键词1, 关键词2, 关键词3">
<meta name="author" content="作者姓名">

<!-- Open Graph -->
<meta property="og:title" content="文章标题">
<meta property="og:description" content="文章描述">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:url" content="https://example.com/blog/post-slug">
<meta property="og:type" content="article">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="文章标题">
<meta name="twitter:description" content="文章描述">
<meta name="twitter:image" content="https://example.com/twitter-image.jpg">
```

## 3. 内容分类体系

### 3.1 分类(Categories)
一级分类，用于主要的知识领域分类：

- **技术** (Technology)
  - 前端开发
  - 后端开发
  - 移动开发
  - 云计算
- **设计** (Design)
  - UI/UX设计
  - 平面设计
  - 产品设计
- **生活** (Life)
  - 工作日志
  - 旅行游记
  - 读书笔记
- **随笔** (Thoughts)
  - 思考感悟
  - 技术见解
  - 行业观察

### 3.2 标签(Tags)
细粒度标签，用于文章主题标注：

#### 技术标签
- JavaScript, TypeScript, Python, Go
- React, Vue, Angular, Node.js
- CSS, HTML, SCSS, Tailwind CSS
- Docker, Kubernetes, AWS, Linux

#### 内容标签
- 教程, 教程, 最佳实践, 性能优化
- 工具推荐, 资源分享, 面试经验
- 项目总结, 学习笔记, 技术分享

### 3.3 系列(Series)
相关文章的组织方式：

```html
<div class="post-series">
  <h3>JavaScript基础系列</h3>
  <p>这是一个关于JavaScript基础的系列文章</p>
  <ol class="series-posts">
    <li><a href="/blog/js-basics-1.html">变量与数据类型</a></li>
    <li><a href="/blog/js-basics-2.html">函数与作用域</a></li>
    <li><a href="/blog/js-basics-3.html">对象与原型</a></li>
  </ol>
</div>
```

## 4. 写作规范

### 4.1 文章结构要求

#### 标题层次
- H1: 文章主标题(页面唯一)
- H2: 主要章节
- H3: 子章节
- H4: 更细分的段落

#### 段落结构
- 段落之间应保持适当间距
- 重要信息使用加粗或斜体强调
- 代码块使用适当的语法高亮
- 图片应包含描述性alt文本

### 4.2 代码规范

#### 代码块格式
```html
<pre><code class="language-javascript">
function helloWorld() {
  console.log("Hello, Aurora!");
}
</code></pre>
```

#### 行内代码
```html
使用 <code>console.log()</code> 方法输出信息。
```

#### 代码注释
```javascript
/**
 * 这是一个示例函数
 * @param {string} name - 用户姓名
 * @returns {string} 问候语
 */
function greetUser(name) {
  return `Hello, ${name}! Welcome to Aurora theme.`;
}
```

### 4.3 图片规范

#### 图片格式
- **Hero图片**: 1200x630px, JPG/WebP格式
- **文章插图**: 800x450px, JPG/WebP格式
- **头像**: 200x200px, PNG格式

#### 图片命名
- 文件名使用连字符分隔
- 包含描述性信息
- 示例: `javascript-variable-declaration.jpg`

#### 图片属性
```html
<img src="/assets/images/js-variables.jpg" 
     alt="JavaScript变量声明示例图" 
     width="800" 
     height="450" 
     loading="lazy">
```

## 5. 内容模板

### 5.1 教程模板
```markdown
# 教程标题

## 前言
- 教程背景
- 学习目标
- 预备知识

## 准备环境
- 环境要求
- 安装步骤

## 步骤详解
1. 第一步
2. 第二步
3. 第三步

## 总结
- 要点回顾
- 扩展阅读
```

### 5.2 技术分享模板
```markdown
# 技术分享标题

## 问题背景
- 遇到的问题
- 业务场景

## 解决方案
- 实现思路
- 核心代码
- 关键难点

## 效果展示
- 截图演示
- 性能数据

## 总结与思考
- 优缺点分析
- 改进方向
```

### 5.3 生活随笔模板
```markdown
# 随笔标题

## 开篇
- 最近的感受
- 想要分享的内容

## 详细内容
- 具体经历
- 思考过程

## 结语
- 总结感悟
- 展望未来
```

## 6. 内容维护

### 6.1 内容更新流程
1. **草稿阶段**: 标记为`draft`
2. **编辑阶段**: 校对语法和格式
3. **审核阶段**: 确认技术准确性
4. **发布阶段**: 标记为`published`
5. **维护阶段**: 根据反馈更新内容

### 6.2 内容归档策略
- 超过6个月未更新的文章标记为`archived`
- 定期检查并更新过时信息
- 删除过期或无关的内容

### 6.3 版本控制
- 使用Git管理内容版本
- 重要变更前创建备份分支
- 记录重大更新的变更日志

## 7. 合规性要求

### 7.1 W3C标准
- HTML5语义化标签
- 正确的文档结构
- 可访问性标准(WCAG 2.1)

### 7.2 SEO最佳实践
- 良好的URL结构
- 完整的meta信息
- 合理的内部链接结构

### 7.3 性能要求
- 图片优化和懒加载
- CSS/JS文件压缩
- 快速加载时间(<3秒)

## 8. 质量检查清单

### 8.1 内容质量
- [ ] 标题简洁明确
- [ ] 摘要吸引人且准确
- [ ] 内容结构清晰
- [ ] 语法和拼写正确
- [ ] 图片质量和相关性强

### 8.2 技术质量
- [ ] HTML语义化
- [ ] CSS样式规范
- [ ] JavaScript功能正常
- [ ] 响应式设计正常
- [ ] 加载性能良好

### 8.3 用户体验
- [ ] 导航清晰
- [ ] 阅读体验流畅
- [ ] 搜索功能正常
- [ ] 深色模式兼容
- [ ] 移动端友好

---

*本文档将持续更新，请保持与主题规范的同步。*