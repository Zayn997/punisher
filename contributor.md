# Contributor Guide

<p>
  <a href="#english">English</a> | <a href="#简体中文">简体中文</a>
</p>

## English

Thanks for contributing to Punisher Pet.

### Ground Rules

- Keep pull requests focused and small.
- Preserve TypeScript type safety.
- Keep UI behavior consistent with existing interaction patterns.
- Test microphone detection changes manually before submitting.

### Development Setup

```bash
npm install
npm run dev
```

### Coding Guidelines

- Use clear names and keep functions short when possible.
- Avoid introducing unrelated formatting-only changes.
- Put reusable constants in `src/constants`.
- Keep detection/reaction logic in `src/hooks/usePunisherPet.ts`.
- Keep presentational logic in `src/components`.

### Testing Checklist

- App starts in dev mode without errors.
- `npm run lint` passes.
- Start/Stop listening works.
- Sensitivity and volume controls work.
- 1x/2x/3x/4x hit behavior maps to expected modes.
- Fallback speech works if an audio clip fails.

### Pull Request Checklist

- Describe what changed and why.
- Include reproduction and validation steps.
- Attach screenshots or short recordings for UI changes.
- Keep commits meaningful and reviewable.

### License

By contributing, you agree your contributions are licensed under MIT.

---

## 简体中文

感谢你为 Punisher Pet 做贡献。

### 基本规则

- 保持 PR 聚焦，尽量小而清晰。
- 保持 TypeScript 类型安全。
- 保持现有交互和 UI 行为一致。
- 提交前请手动验证麦克风检测相关改动。

### 开发环境

```bash
npm install
npm run dev
```

### 代码规范

- 命名清晰，函数尽量保持简短。
- 避免无关的纯格式化改动。
- 可复用常量放到 `src/constants`。
- 检测/反应逻辑集中在 `src/hooks/usePunisherPet.ts`。
- 纯展示逻辑放到 `src/components`。

### 测试清单

- 开发模式可正常启动。
- `npm run lint` 通过。
- Start/Stop listening 按钮可用。
- 灵敏度和音量调节生效。
- 1x/2x/3x/4x 敲击能触发对应模式。
- 音频失败时语音兜底可正常工作。

### PR 提交清单

- 说明改动内容和目的。
- 提供复现与验证步骤。
- UI 改动附截图或录屏。
- 保持提交记录可读、便于审查。

### 许可证

提交代码即表示你同意以 MIT 协议授权你的贡献。
