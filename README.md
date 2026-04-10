# Punisher Pet

<p>
  <a href="#english">English</a> | <a href="#简体中文">简体中文</a>
</p>

## English

Punisher Pet is a React + Electron desktop app that listens to microphone impacts (like desk taps) and triggers character reactions and voice/audio modes.

### Features

- Live microphone impact detection with adaptive thresholding.
- Combo reaction system:
  - 1x hit: normal reaction
  - 2x quick hits: painful mode
  - 3x quick hits: sexy mode
  - 4x quick hits: sing mode
- Real-time signal meter and adjustable sensitivity.
- Adjustable output/yell volume.
- Audio clips with speech fallback when needed.

### Tech Stack

- React 19 + TypeScript + Vite
- Electron 41
- Web Audio API + Speech Synthesis API

### Quick Start

```bash
npm install
npm run dev
```

This starts both:

- Vite web dev server on `http://localhost:5173`
- Electron window connected to the dev server

### Scripts

- `npm run dev`: run web + electron in development
- `npm run start`: run electron (expects built web files)
- `npm run build`: type-check and build web assets
- `npm run lint`: run eslint
- `npm run preview`: preview built web assets

### Usage

1. Click **Start listening**.
2. Allow microphone permission.
3. Hit/tap quickly to trigger combo modes.
4. Open **Settings** to adjust sensitivity and yell volume.

### Project Structure

- `src/components`: UI components (`FaceStage`, `ControlsPanel`)
- `src/hooks`: detection and reaction logic (`usePunisherPet`)
- `src/constants`: thresholds and audio mapping
- `src/assets/sounds`: local sound assets
- `electron`: electron main/preload process files

### License

MIT. See `LICENSE`.

### Contributing

See `contributor.md`.

---

## 简体中文

Punisher Pet 是一个基于 React + Electron 的桌面应用。它会监听麦克风中的冲击声（例如敲桌子），并触发角色表情与语音/音频模式。

### 功能

- 实时麦克风冲击检测，并带有自适应阈值。
- 连击反应系统：
  - 1 次敲击：普通反应
  - 快速 2 连击：painful 模式
  - 快速 3 连击：sexy 模式
  - 快速 4 连击：sing 模式
- 实时信号强度显示，可调灵敏度。
- 可调输出音量（yell volume）。
- 优先播放本地音频，失败时使用语音合成兜底。

### 技术栈

- React 19 + TypeScript + Vite
- Electron 41
- Web Audio API + Speech Synthesis API

### 快速开始

```bash
npm install
npm run dev
```

启动后会同时运行：

- Vite 开发服务器（`http://localhost:5173`）
- Electron 桌面窗口（连接到开发服务器）

### 常用脚本

- `npm run dev`：开发模式启动 web + electron
- `npm run start`：启动 electron（通常用于打包后文件）
- `npm run build`：类型检查并构建前端资源
- `npm run lint`：执行 eslint
- `npm run preview`：预览构建结果

### 使用说明

1. 点击 **Start listening**。
2. 允许麦克风权限。
3. 通过快速敲击触发连击模式。
4. 在 **Settings** 中调节灵敏度和音量。

### 项目结构

- `src/components`：界面组件（`FaceStage`、`ControlsPanel`）
- `src/hooks`：检测与反应逻辑（`usePunisherPet`）
- `src/constants`：阈值与音频映射
- `src/assets/sounds`：本地声音资源
- `electron`：Electron 主进程和 preload

### 许可证

MIT，详见 `LICENSE`。

### 贡献指南

请查看 `contributor.md`。
