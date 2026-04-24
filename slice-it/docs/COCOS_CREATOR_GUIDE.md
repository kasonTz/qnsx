# Cocos Creator 3.8.8 使用指南
# Cocos Creator 3.8.8 User Guide

本文档将一步一步教您如何在 Cocos Creator 3.8.8 中创建场景和进行其他操作。
This document will guide you step by step on how to create scenes and perform other operations in Cocos Creator 3.8.8.

## 1. 打开 Cocos Creator 3.8.8
## 1. Open Cocos Creator 3.8.8

1. **启动 Cocos Creator 3.8.8**
   - 双击桌面上的 Cocos Creator 3.8.8 图标
   - 或在开始菜单中找到并打开 Cocos Creator 3.8.8
1. **Launch Cocos Creator 3.8.8**
   - Double-click the Cocos Creator 3.8.8 icon on your desktop
   - Or find and open Cocos Creator 3.8.8 in the Start menu

2. **进入项目管理界面**
   - 启动后，您会看到 Cocos Creator 的项目管理界面
2. **Enter project management interface**
   - After launching, you will see the Cocos Creator project management interface

## 2. 打开项目
## 2. Open Project

1. **点击 "打开其他项目"**
   - 在项目管理界面中，点击 "打开其他项目" 按钮
1. **Click "Open Other Project"**
   - In the project management interface, click the "Open Other Project" button

2. **选择项目文件夹**
   - 浏览到 `C:\tangzhongkai\IdeaProjects\qnsx\slice-it\client` 目录
   - 点击 "选择文件夹" 按钮
2. **Select project folder**
   - Browse to the `C:\tangzhongkai\IdeaProjects\qnsx\slice-it\client` directory
   - Click the "Select Folder" button

3. **等待项目加载**
   - Cocos Creator 会自动加载项目文件
   - 加载完成后，您会看到编辑器界面
3. **Wait for project loading**
   - Cocos Creator will automatically load project files
   - After loading is complete, you will see the editor interface

## 3. 创建场景文件
## 3. Create Scene Files

### 3.1 创建 Home.scene
### 3.1 Create Home.scene

1. **打开资源管理器**
   - 在编辑器左侧，找到 "资源管理器" 面板
   - 展开 `assets` 文件夹，找到 `scenes` 文件夹
1. **Open Assets panel**
   - On the left side of the editor, find the "Assets" panel
   - Expand the `assets` folder, find the `scenes` folder

2. **创建场景**
   - 右键点击 `scenes` 文件夹
   - 在弹出的菜单中选择 "创建" → "Scene"
   - 输入场景名称：`Home`
   - 按 Enter 键确认
2. **Create scene**
   - Right-click the `scenes` folder
   - In the pop-up menu, select "Create" → "Scene"
   - Enter scene name: `Home`
   - Press Enter to confirm

### 3.2 创建 Game.scene
### 3.2 Create Game.scene

1. **创建场景**
   - 右键点击 `scenes` 文件夹
   - 在弹出的菜单中选择 "创建" → "Scene"
   - 输入场景名称：`Game`
   - 按 Enter 键确认
1. **Create scene**
   - Right-click the `scenes` folder
   - In the pop-up menu, select "Create" → "Scene"
   - Enter scene name: `Game`
   - Press Enter to confirm

### 3.3 创建 Result.scene
### 3.3 Create Result.scene

1. **创建场景**
   - 右键点击 `scenes` 文件夹
   - 在弹出的菜单中选择 "创建" → "Scene"
   - 输入场景名称：`Result`
   - 按 Enter 键确认
1. **Create scene**
   - Right-click the `scenes` folder
   - In the pop-up menu, select "Create" → "Scene"
   - Enter scene name: `Result`
   - Press Enter to confirm

## 4. 编辑 Home 场景
## 4. Edit Home Scene

1. **打开 Home 场景**
   - 在资源管理器中，双击 `scenes` 文件夹下的 `Home.scene` 文件
1. **Open Home scene**
   - In the Assets panel, double-click the `Home.scene` file under the `scenes` folder

2. **添加 Canvas 节点**
   - 在层级管理器中，右键点击 "Scene" 节点
   - 选择 "创建" → "UI" → "Canvas"
2. **Add Canvas node**
   - In the Hierarchy panel, right-click the "Scene" node
   - Select "Create" → "UI" → "Canvas"

3. **添加背景节点**
   - 右键点击 "Canvas" 节点
   - 选择 "创建" → "节点"
   - 输入节点名称：`Background`
3. **Add Background node**
   - Right-click the "Canvas" node
   - Select "Create" → "Node"
   - Enter node name: `Background`

4. **添加标题节点**
   - 右键点击 "Canvas" 节点
   - 选择 "创建" → "UI" → "Label"
   - 输入节点名称：`Title`
   - 在属性检查器中，设置 "String" 为 "切你所想"
   - 设置 "Font Size" 为 64
4. **Add Title node**
   - Right-click the "Canvas" node
   - Select "Create" → "UI" → "Label"
   - Enter node name: `Title`
   - In the Inspector panel, set "String" to "切你所想"
   - Set "Font Size" to 64

5. **添加开始按钮**
   - 右键点击 "Canvas" 节点
   - 选择 "创建" → "UI" → "Button"
   - 输入节点名称：`StartButton`
   - 点击 "Button" 节点下的 "Label" 子节点
   - 在属性检查器中，设置 "String" 为 "开始游戏"
5. **Add Start Button**
   - Right-click the "Canvas" node
   - Select "Create" → "UI" → "Button"
   - Enter node name: `StartButton`
   - Click the "Label" child node under the "Button" node
   - In the Inspector panel, set "String" to "开始游戏"

6. **添加 HomeScene 组件**
   - 选中 "Canvas" 节点
   - 在属性检查器中，点击 "添加组件" 按钮
   - 选择 "自定义脚本" → "HomeScene"
6. **Add HomeScene component**
   - Select the "Canvas" node
   - In the Inspector panel, click the "Add Component" button
   - Select "Custom Script" → "HomeScene"

7. **保存场景**
   - 按快捷键 Ctrl + S
   - 或点击菜单栏 "文件" → "保存场景"
7. **Save scene**
   - Press Ctrl + S
   - Or click menu bar "File" → "Save Scene"

## 5. 编辑 Game 场景
## 5. Edit Game Scene

1. **打开 Game 场景**
   - 在资源管理器中，双击 `scenes` 文件夹下的 `Game.scene` 文件
1. **Open Game scene**
   - In the Assets panel, double-click the `Game.scene` file under the `scenes` folder

2. **添加 Canvas 节点**
   - 在层级管理器中，右键点击 "Scene" 节点
   - 选择 "创建" → "UI" → "Canvas"
2. **Add Canvas node**
   - In the Hierarchy panel, right-click the "Scene" node
   - Select "Create" → "UI" → "Canvas"

3. **添加游戏层节点**
   - 右键点击 "Canvas" 节点
   - 选择 "创建" → "节点"
   - 输入节点名称：`GameLayer`
3. **Add GameLayer node**
   - Right-click the "Canvas" node
   - Select "Create" → "Node"
   - Enter node name: `GameLayer`

4. **添加游戏 UI 节点**
   - 右键点击 "Canvas" 节点
   - 选择 "创建" → "节点"
   - 输入节点名称：`GameUI`
4. **Add GameUI node**
   - Right-click the "Canvas" node
   - Select "Create" → "Node"
   - Enter node name: `GameUI`

5. **保存场景**
   - 按快捷键 Ctrl + S
   - 或点击菜单栏 "文件" → "保存场景"
5. **Save scene**
   - Press Ctrl + S
   - Or click menu bar "File" → "Save Scene"

## 6. 编辑 Result 场景
## 6. Edit Result Scene

1. **打开 Result 场景**
   - 在资源管理器中，双击 `scenes` 文件夹下的 `Result.scene` 文件
1. **Open Result scene**
   - In the Assets panel, double-click the `Result.scene` file under the `scenes` folder

2. **添加 Canvas 节点**
   - 在层级管理器中，右键点击 "Scene" 节点
   - 选择 "创建" → "UI" → "Canvas"
2. **Add Canvas node**
   - In the Hierarchy panel, right-click the "Scene" node
   - Select "Create" → "UI" → "Canvas"

3. **添加结果 UI 节点**
   - 右键点击 "Canvas" 节点
   - 选择 "创建" → "节点"
   - 输入节点名称：`ResultUI`
3. **Add ResultUI node**
   - Right-click the "Canvas" node
   - Select "Create" → "Node"
   - Enter node name: `ResultUI`

4. **保存场景**
   - 按快捷键 Ctrl + S
   - 或点击菜单栏 "文件" → "保存场景"
4. **Save scene**
   - Press Ctrl + S
   - Or click menu bar "File" → "Save Scene"

## 7. 运行游戏
## 7. Run Game

1. **选择运行平台**
   - 点击编辑器顶部的 "运行" 按钮旁边的下拉箭头
   - 选择 "微信小游戏"
1. **Select run platform**
   - Click the drop-down arrow next to the "Run" button at the top of the editor
   - Select "WeChat Game"

2. **运行游戏**
   - 点击 "运行" 按钮
   - Cocos Creator 会编译游戏并启动微信开发者工具
2. **Run game**
   - Click the "Run" button
   - Cocos Creator will compile the game and launch WeChat Developer Tools

3. **在微信开发者工具中运行**
   - 微信开发者工具会自动打开
   - 点击 "编译" 按钮
   - 点击 "预览" 按钮
3. **Run in WeChat Developer Tools**
   - WeChat Developer Tools will open automatically
   - Click the "Compile" button
   - Click the "Preview" button

## 8. 构建游戏
## 8. Build Game

1. **打开构建面板**
   - 点击菜单栏 "项目" → "构建"
1. **Open build panel**
   - Click menu bar "Project" → "Build"

2. **配置构建选项**
   - 选择 "微信小游戏" 平台
   - 设置 "构建路径" 为 `build/wechatgame`
   - 点击 "构建" 按钮
2. **Configure build options**
   - Select "WeChat Game" platform
   - Set "Build Path" to `build/wechatgame`
   - Click the "Build" button

3. **构建完成**
   - 构建完成后，您可以在 `build/wechatgame` 目录中找到构建结果
3. **Build completed**
   - After building is completed, you can find the build result in the `build/wechatgame` directory

## 9. 常见问题解决
## 9. Common Issues and Solutions

### 9.1 场景文件无法加载
- **问题**：场景文件显示红色感叹号
- **解决方法**：删除有问题的场景文件，重新创建
### 9.1 Scene file cannot be loaded
- **Issue**：Scene file shows red exclamation mark
- **Solution**：Delete the problematic scene file and recreate it

### 9.2 脚本组件无法添加
- **问题**：无法找到自定义脚本
- **解决方法**：确保脚本文件存在于 `assets/scripts` 目录中
### 9.2 Script component cannot be added
- **Issue**：Cannot find custom script
- **Solution**：Ensure the script file exists in the `assets/scripts` directory

### 9.3 运行时出现错误
- **问题**：控制台显示错误信息
- **解决方法**：检查脚本代码是否有语法错误，确保所有节点和组件都正确设置
### 9.3 Runtime errors
- **Issue**：Console shows error messages
- **Solution**：Check script code for syntax errors, ensure all nodes and components are correctly set up

## 10. 项目结构说明
## 10. Project Structure

```
slice-it/client/
├── assets/               # 资源文件 / Assets
│   ├── scenes/          # 场景文件 / Scene files
│   │   ├── Home.scene   # 主页场景 / Home scene
│   │   ├── Game.scene   # 游戏场景 / Game scene
│   │   └── Result.scene # 结果场景 / Result scene
│   ├── scripts/         # 脚本文件 / Script files
│   │   ├── content/     # 内容相关脚本 / Content-related scripts
│   │   ├── core/        # 核心游戏逻辑 / Core game logic
│   │   ├── game/        # 游戏相关脚本 / Game-related scripts
│   │   ├── input/       # 输入处理 / Input processing
│   │   ├── platform/    # 平台相关 / Platform-related
│   │   ├── render/      # 渲染相关 / Rendering-related
│   │   ├── scenes/      # 场景脚本 / Scene scripts
│   │   └── ui/          # UI 相关脚本 / UI-related scripts
│   └── resources/       # 资源文件 / Resources
├── settings/            # 项目设置 / Project settings
├── project.json         # 项目配置 / Project configuration
├── tsconfig.json        # TypeScript 配置 / TypeScript configuration
└── jsconfig.json        # JavaScript 配置 / JavaScript configuration
```

## 11. 后续操作
## 11. Follow-up Operations

### 11.1 添加资源
- **图片资源**：将图片文件拖拽到 `assets/resources` 目录
- **音频资源**：将音频文件拖拽到 `assets/resources` 目录
### 11.1 Add resources
- **Image resources**：Drag image files to the `assets/resources` directory
- **Audio resources**：Drag audio files to the `assets/resources` directory

### 11.2 编辑脚本
- **打开脚本**：在资源管理器中双击脚本文件
- **编辑脚本**：在代码编辑器中修改脚本内容
- **保存脚本**：按 Ctrl + S 保存更改
### 11.2 Edit scripts
- **Open script**：Double-click the script file in the Assets panel
- **Edit script**：Modify script content in the code editor
- **Save script**：Press Ctrl + S to save changes

### 11.3 同步到 GitHub
1. **提交更改**：
   - 打开命令行工具
   - 进入项目目录：`cd C:\tangzhongkai\IdeaProjects\qnsx\slice-it`
   - 执行命令：`git add .`
   - 执行命令：`git commit -m "描述您的更改"`
   - 执行命令：`git push`
### 11.3 Sync to GitHub
1. **Commit changes**：
   - Open command line tool
   - Enter project directory：`cd C:\tangzhongkai\IdeaProjects\qnsx\slice-it`
   - Execute command：`git add .`
   - Execute command：`git commit -m "Describe your changes"`
   - Execute command：`git push`

## 12. 联系支持
## 12. Contact Support

如果您在使用过程中遇到任何问题，请随时联系我们获取支持。
If you encounter any issues during use, please feel free to contact us for support.