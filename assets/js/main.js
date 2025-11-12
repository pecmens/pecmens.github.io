/**
 * Aurora主题 - 主JavaScript文件
 * 实现深色/浅色模式切换、交互功能和性能优化
 */

// 主题模式管理
class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme();
    this.init();
  }

  // 初始化主题设置
  init() {
    this.applyTheme(this.currentTheme);
    this.bindEvents();
  }

  // 获取存储的主题偏好
  getStoredTheme() {
    return localStorage.getItem('aurora-theme') || 'auto';
  }

  // 应用主题
  applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'auto') {
      // 根据系统偏好自动设置
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    }
    
    root.setAttribute('data-theme', theme);
    this.currentTheme = theme;
  }

  // 切换主题
  toggleTheme() {
    const themes = ['auto', 'light', 'dark'];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    localStorage.setItem('aurora-theme', nextTheme);
    this.applyTheme(nextTheme);
    
    // 更新主题切换器UI
    this.updateThemeToggle(nextTheme);
  }

  // 更新主题切换器
  updateThemeToggle(theme) {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      const icons = toggle.querySelectorAll('[data-theme]');
      icons.forEach(icon => {
        icon.style.display = icon.getAttribute('data-theme') === theme ? 'inline' : 'none';
      });
    }
  }

  // 绑定事件监听
  bindEvents() {
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.currentTheme === 'auto') {
        this.applyTheme('auto');
      }
    });

    // 绑定主题切换按钮
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleTheme());
    }
  }
}

// 平滑滚动管理
// 平滑滚动管理
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // 为所有内部链接添加平滑滚动
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }
}

// 文章阅读进度管理
class ReadingProgress {
  constructor() {
    this.init();
  }

  init() {
    this.createProgressBar();
    this.bindEvents();
    this.updateProgress();
  }

  createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    
    // 添加进度条样式
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: var(--color-surface);
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    const fill = progressBar.querySelector('.progress-fill');
    fill.style.cssText = `
      height: 100%;
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
      width: 0%;
      transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    this.progressBar = progressBar;
    this.progressFill = fill;
  }

  bindEvents() {
    window.addEventListener('scroll', () => this.updateProgress());
  }

  updateProgress() {
    const article = document.querySelector('article');
    if (!article) return;

    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // 计算阅读进度
    const start = articleTop;
    const end = articleTop + articleHeight - windowHeight;
    const progress = Math.max(0, Math.min(1, (scrollTop - start) / (end - start)));

    // 更新进度条
    this.progressFill.style.width = `${progress * 100}%`;
    this.progressBar.style.opacity = progress > 0 && progress < 1 ? '1' : '0';
  }
}

// 搜索功能管理
class SearchManager {
  constructor() {
    this.searchData = [];
    this.init();
  }

  async init() {
    await this.loadSearchData();
    this.createSearchInterface();
  }

  async loadSearchData() {
    // 加载文章数据用于搜索
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        this.searchData = await response.json();
      }
    } catch (error) {
      // 如果API不可用，使用静态数据
      this.searchData = [
        {
          title: 'Hello World',
          excerpt: '欢迎来到我的个人博客',
          date: '2024-12-30',
          url: '/blog/hello-world.html'
        }
      ];
    }
  }

  createSearchInterface() {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) return;

    const searchInput = searchContainer.querySelector('.search-input');
    const searchResults = searchContainer.querySelector('.search-results');

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      this.performSearch(query, searchResults);
    });
  }

  performSearch(query, resultsContainer) {
    if (query.length < 2) {
      resultsContainer.innerHTML = '';
      return;
    }

    const results = this.searchData.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.excerpt.toLowerCase().includes(query)
    );

    this.displaySearchResults(results, resultsContainer);
  }

  displaySearchResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = '<div class="search-no-results">未找到相关文章</div>';
      return;
    }

    const html = results.map(result => `
      <div class="search-result">
        <h3><a href="${result.url}">${result.title}</a></h3>
        <p>${result.excerpt}</p>
        <time>${result.date}</time>
      </div>
    `).join('');

    container.innerHTML = html;
  }
}

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            domContentLoaded: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            firstInputDelay: 0,
            cumulativeLayoutShift: 0
        };
    }

    init() {
        // 记录关键性能指标
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
        });

        document.addEventListener('DOMContentLoaded', () => {
            this.metrics.domContentLoaded = performance.now();
        });

        // 使用Performance Observer监听关键指标
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    switch (entry.name) {
                        case 'first-contentful-paint':
                            this.metrics.firstContentfulPaint = entry.startTime;
                            break;
                        case 'largest-contentful-paint':
                            this.metrics.largestContentfulPaint = entry.startTime;
                            break;
                        case 'layout-shift':
                            if (!entry.hadRecentInput) {
                                this.metrics.cumulativeLayoutShift += entry.value;
                            }
                            break;
                    }
                }
            });

            observer.observe({ entryTypes: ['paint', 'layout-shift'] });
        }

        // 监控首次输入延迟
        document.addEventListener('keydown', (e) => {
            if (e.isTrusted) {
                this.metrics.firstInputDelay = performance.now();
            }
        });
    }

    getMetrics() {
        return this.metrics;
    }

    logMetrics() {
        console.log('性能指标:', this.metrics);
    }
}

class BlogFeatures {
    constructor() {
        this.posts = [
            {
                id: 1,
                title: "Hello World: 欢迎来到 Aurora 主题博客",
                date: "2024-01-15",
                category: "欢迎",
                excerpt: "欢迎使用 Aurora 主题！这是一个现代化的博客主题...",
                tags: ["欢迎", "主题介绍"],
                url: "/blog/hello-world.html",
                image: "assets/images/hero.jpg"
            },
            {
                id: 2,
                title: "Aurora 主题特性介绍",
                date: "2024-01-16",
                category: "主题",
                excerpt: "Aurora 主题具有丰富的特性和现代化的设计...",
                tags: ["特性", "设计"],
                url: "/blog/aurora-features.html",
                image: "assets/images/aurora-features.jpg"
            },
            {
                id: 3,
                title: "CSS 变量系统详解",
                date: "2024-01-17",
                category: "技术",
                excerpt: "深入了解 Aurora 主题的 CSS 变量系统...",
                tags: ["CSS", "变量", "主题"],
                url: "/blog/css-variables.html",
                image: "assets/images/css-variables.jpg"
            }
        ];
        
        this.categories = [
            { name: "欢迎", icon: "👋", count: 1, url: "/category/welcome/" },
            { name: "主题", icon: "🎨", count: 1, url: "/category/theme/" },
            { name: "技术", icon: "⚡", count: 1, url: "/category/tech/" },
            { name: "教程", icon: "📚", count: 0, url: "/category/tutorial/" },
            { name: "设计", icon: "🎭", count: 0, url: "/category/design/" },
            { name: "开发", icon: "🛠️", count: 0, url: "/category/dev/" }
        ];
    }

    init() {
        this.initSearch();
        this.initCategoryCards();
        this.initStatsSection();
        this.initMobileMenu();
        this.initAnimations();
    }

    initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        const searchResults = document.querySelector('.search-results');

        if (!searchInput || !searchBtn) return;

        const performSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            if (!query) {
                if (searchResults) searchResults.innerHTML = '';
                return;
            }

            const results = this.posts.filter(post => 
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.tags.some(tag => tag.toLowerCase().includes(query)) ||
                post.category.toLowerCase().includes(query)
            );

            this.displaySearchResults(results, query);
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // 实时搜索（防抖）
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(performSearch, 300);
        });
    }

    displaySearchResults(results, query) {
        const searchResults = document.querySelector('.search-results');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `<p class="no-results">没有找到包含 "${query}" 的文章</p>`;
            return;
        }

        const resultsHTML = results.map(post => `
            <article class="search-result">
                <h3><a href="${post.url}">${post.title}</a></h3>
                <p class="search-excerpt">${post.excerpt}</p>
                <div class="search-meta">
                    <span class="category">${post.category}</span>
                    <span class="date">${post.date}</span>
                    <span class="tags">${post.tags.join(', ')}</span>
                </div>
            </article>
        `).join('');

        searchResults.innerHTML = resultsHTML;
    }

    initCategoryCards() {
        const categoryGrid = document.querySelector('.category-grid');
        if (!categoryGrid) return;

        categoryGrid.innerHTML = this.categories.map(category => `
            <a href="${category.url}" class="category-card">
                <div class="category-icon">${category.icon}</div>
                <h3>${category.name}</h3>
                <p>${this.getCategoryDescription(category.name)}</p>
                <span class="post-count">${category.count} 篇文章</span>
            </a>
        `).join('');
    }

    getCategoryDescription(categoryName) {
        const descriptions = {
            "欢迎": "入门指南和主题介绍",
            "主题": "主题设计和自定义相关内容",
            "技术": "技术文章和开发经验分享",
            "教程": "详细的使用教程和指南",
            "设计": "UI/UX 设计理念和技巧",
            "开发": "前端开发最佳实践"
        };
        return descriptions[categoryName] || "精彩内容即将到来";
    }

    initStatsSection() {
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;

        const stats = {
            posts: this.posts.length,
            categories: this.categories.filter(c => c.count > 0).length,
            tags: new Set(this.posts.flatMap(p => p.tags)).size,
            words: this.posts.reduce((total, post) => total + post.excerpt.split(' ').length, 0)
        };

        const statsHTML = `
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">${stats.posts}</div>
                    <div class="stat-label">文章</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.categories}</div>
                    <div class="stat-label">分类</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.tags}</div>
                    <div class="stat-label">标签</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.words}</div>
                    <div class="stat-label">字数</div>
                </div>
            </div>
        `;

        statsSection.innerHTML = statsHTML;
    }

    initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (!mobileMenuToggle || !nav) return;

        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('mobile-open');
        });
    }

    initAnimations() {
        // 初始化极光动画
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const auroraContainer = heroSection.querySelector('.hero-visual');
            if (auroraContainer) {
                auroraContainer.innerHTML = `
                    <div class="aurora-animation">
                        <div class="aurora-layer layer-1"></div>
                        <div class="aurora-layer layer-2"></div>
                        <div class="aurora-layer layer-3"></div>
                    </div>
                `;
            }
        }

        // 添加滚动动画
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // 观察需要动画的元素
        document.querySelectorAll('.category-card, .stat-item, .search-result').forEach(el => {
            observer.observe(el);
        });
    }
}

// 辅助功能管理
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.enhanceKeyboardNavigation();
    this.manageFocus();
    this.setupAriaAttributes();
  }

  enhanceKeyboardNavigation() {
    // 改善键盘导航
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  manageFocus() {
    // 管理焦点可见性
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
      element.addEventListener('focus', (e) => {
        e.target.classList.add('focused');
      });

      element.addEventListener('blur', (e) => {
        e.target.classList.remove('focused');
      });
    });
  }

  setupAriaAttributes() {
    // 设置ARIA属性
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
      if (!button.textContent.trim()) {
        const icon = button.querySelector('svg');
        if (icon) {
          button.setAttribute('aria-label', button.getAttribute('title') || 'Button');
        }
      }
    });
  }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化主题管理
    const themeManager = new ThemeManager();
    themeManager.init();
    
    // 初始化平滑滚动
    const smoothScroll = new SmoothScroll();
    smoothScroll.init();
    
    // 初始化阅读进度
    const readingProgress = new ReadingProgress();
    readingProgress.init();
    
    // 初始化搜索功能
    const searchManager = new SearchManager();
    searchManager.init();
    
    // 初始化性能监控
    const performanceMonitor = new PerformanceMonitor();
    performanceMonitor.init();
    
    // 初始化博客功能
    const blogFeatures = new BlogFeatures();
    blogFeatures.init();
    
    // 辅助功能支持
    const accessibilityManager = new AccessibilityManager();
    accessibilityManager.init();
    
    // 为页面添加加载完成的类
    document.body.classList.add('loaded');
    
    // 输出初始化完成信息
    console.log('Aurora 博客主题已成功初始化！');
});

// 导出全局API（如果需要）
window.Aurora = {
  ThemeManager,
  SmoothScroll,
  ReadingProgress,
  SearchManager,
  PerformanceMonitor,
  AccessibilityManager
};