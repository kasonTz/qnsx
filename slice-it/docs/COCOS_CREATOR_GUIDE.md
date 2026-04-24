# Cocos Creator 3.8.8 使用指南

本文档将一步一步教您如何在 Cocos Creator 3.8.8 中创建场景和进行其他操作。

## 1. 打开 Cocos Creator 3.8.8

1. **启动 Cocos Creator 3.8.8**
   - 双击桌面上的 Cocos Creator 3.8.8 图标
   - 或在开始菜单中找到并打开 Cocos Creator 3.8.8

2. **进入项目管理界面**
   - 启动后，您会看到 Cocos Creator 的项目管理界面

## 2. 打开项目

1. **点击 "打开其他项目"** (Open Other Project)
   - 在项目管理界面中，点击 "打开其他项目" 按钮

2. **选择项目文件夹** (Select Folder)
   - 浏览到 `C:\tangzhongkai\IdeaProjects\qnsx\slice-it\client` 目录
   - 点击 "选择文件夹" 按钮

3. **等待项目加载**
   - Cocos Creator 会自动加载项目文件
   - 加载完成后，您会看到编辑器界面

## 3. 创建场景文件

### 3.1 创建 Home.scene

1. **打开资源管理器** (Assets Panel)
   - 在编辑器左侧，找到 "资源管理器" 面板
   - 展开 `assets` 文件夹，找到 `scenes` 文件夹

2. **创建场景**
   - 右键点击 `scenes` 文件夹
   - 在弹出的菜单中选择 "创建" → "Scene" (Create → Scene)
   - 输入场景名称：`Home`
   - 按 Enter 键确认

### 3.2 创建 Game.scene

1. **创建场景**
   - 右键点击 `scenes` 文件夹
   - 在弹出的菜单中选择 "创建" → "Scene" (Create → Scene)
   - 输入场景名称：`Game`
   - 按 Enter 键确认

### 3.3 创建 Result.scene

1. **创建场景**
   - 右键点击 `scenes` 文件夹
   - 在弹出的菜单中选择 "创建" → "Scene" (Create → Scene)
   - 输入场景名称：`Result`
   - 按 Enter 键确认

## 4. 编辑 Home 场景

1. **打开 Home 场景**
   - 在资源管理器中，双击 `scenes` 文件夹下的 `Home.scene` 文件

2. **添加 Canvas 节点**
   - 在层级管理器 (Hierarchy Panel) 中，右键点击 "Scene" 节点
   - 选择 "创建" → "UI" → "Canvas" (Create → UI → Canvas)

3. **添加背景节点**
   - 右键点击 "Canvas" 节点
   - 选择 "创建" → "节点" (Create → Node)
   - 输入节点名称：`Background`

4. **添加标题节点**
   - 右键点击 "Canvas" 节点
   - 选择 "创建" → "UI" → "Label" (Create → UI → Label)
   - 输入节点名称：`Title`
   - 在属性检查器 (Inspector Panel) 中，设置 "String" 为 "切你所想"
   - 设置 "Font Size" 为 64

5. **添加开始按钮**
   - 右键点击 "Canvas" 节点
   - 选择 "创建" → "UI" → "Button" (Create → UI → Button)
   - 输入节点名称：`StartButton`
   - 点击 "Button" 节点下的 "Label" 子节点
   - 在属性检查器中，设置 "String" 为 "开始游戏"

6. **添加 HomeScene 组件**
   - 选中 "Canvas" 节点
   - 在属性检查器中，点击 "添加组件" 按钮 (Add Component)
   - 选择 "自定义脚本" → "HomeScene" (Custom Script → HomeScene)

7. **保存场景**
   - 按快捷键 Ctrl + S
   - 或点击菜单栏 "文件" → "保存场景" (File → Save Scene)

## 5. 编辑 Game 场景

1. **打开 Game 场景**
   - 在资源管理器中，双击 `scenes` 文件夹下的 `Game.scene` 文件

2. **添加 Canvas 节点**
   - 在层级管理器中，右键点击 "Scene" 节点
   - 选择 "创建" → "UI" → "Canvas" (Create → UI → Canvas)

3. **添加游戏层节点**
   - 右键点击 "Canvas" 节点
   - 选择 "创建" → "节点" (Create → Node)
   - 输入节点名称：`GameLayer`

4. **添加游戏 UI 节点**
   - 右键点击 "Canvas" 节点
   - 选择 "创建" → "节点" (Create → Node)
   - 输入节点名称：`GameUI`

5. **保存场景**
   - 按快捷键 Ctrl + S
   - 或点击菜单栏 "文件" → "保存场景" (File → Save Scene)

## 6. 编辑 Result 场景

1. **打开 Result 场景**
   - 在资源管理器中，双击 `scenes` 文件夹下的 `Result.scene` 文件

2. **添加 Canvas 节点**
   - 在层级管理器中，右键点击 "Scene" 节点
   - 选择 "创建" → "UI" → "Canvas" (Create → UI → Canvas)

3. **添加结果 UI 节点**
   - 右键点击 "Canvas" 节点
   - 选择 "创建" → "节点" (Create → Node)
   - 输入节点名称：`ResultUI`

4. **保存场景**
   - 按快捷键 Ctrl + S
   - 或点击菜单栏 "文件" → "保存场景" (File → Save Scene)

## 7. 运行游戏

1. **选择运行平台**
   - 点击编辑器顶部的 "运行" 按钮旁边的下拉箭头
   - 选择 "微信小游戏" (WeChat Game)

2. **运行游戏**
   - 点击 "运行" 按钮 (Run)
   - Cocos Creator 会编译游戏并启动微信开发者工具

3. **在微信开发者工具中运行**
   - 微信开发者工具会自动打开
   - 点击 "编译" 按钮 (Compile)
   - 点击 "预览" 按钮 (Preview)

## 8. 构建游戏

1. **打开构建面板**
   - 点击菜单栏 "项目" → "构建" (Project → Build)

2. **配置构建选项**
   - 选择 "微信小游戏" 平台 (WeChat Game)
   - 设置 "构建路径" 为 `build/wechatgame` (Build Path)
   - 点击 "构建" 按钮 (Build)

3. **构建完成**
   - 构建完成后，您可以在 `build/wechatgame` 目录中找到构建结果

## 9. 常见问题解决

### 9.1 场景文件无法加载
- **问题**：场景文件显示红色感叹号
- **解决方法**：删除有问题的场景文件，重新创建

### 9.2 脚本组件无法添加
- **问题**：无法找到自定义脚本
- **解决方法**：确保脚本文件存在于 `assets/scripts` 目录中

### 9.3 运行时出现错误
- **问题**：控制台显示错误信息
- **解决方法**：检查脚本代码是否有语法错误，确保所有节点和组件都正确设置

## 10. 项目结构说明

```
slice-it/client/
├── assets/               # 资源文件
│   ├── scenes/          # 场景文件
│   │   ├── Home.scene   # 主页场景
│   │   ├── Game.scene   # 游戏场景
│   │   └── Result.scene # 结果场景
│   ├── scripts/         # 脚本文件
│   │   ├── content/     # 内容相关脚本
│   │   ├── core/        # 核心游戏逻辑
│   │   ├── game/        # 游戏相关脚本
│   │   ├── input/       # 输入处理
│   │   ├── platform/    # 平台相关
│   │   ├── render/      # 渲染相关
│   │   ├── scenes/      # 场景脚本
│   │   └── ui/          # UI 相关脚本
│   └── resources/       # 资源文件
├── settings/            # 项目设置
├── project.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
└── jsconfig.json        # JavaScript 配置
```

## 11. 后续操作

### 11.1 添加资源
- **图片资源**：将图片文件拖拽到 `assets/resources` 目录
- **音频资源**：将音频文件拖拽到 `assets/resources` 目录

### 11.2 编辑脚本
- **打开脚本**：在资源管理器中双击脚本文件
- **编辑脚本**：在代码编辑器中修改脚本内容
- **保存脚本**：按 Ctrl + S 保存更改

### 11.3 同步到 GitHub
1. **提交更改**：
   - 打开命令行工具
   - 进入项目目录：`cd C:\tangzhongkai\IdeaProjects\qnsx\slice-it`
   - 执行命令：`git add .`
   - 执行命令：`git commit -m "描述您的更改"`
   - 执行命令：`git push`

## 12. 联系支持

如果您在使用过程中遇到任何问题，请随时联系我们获取支持。