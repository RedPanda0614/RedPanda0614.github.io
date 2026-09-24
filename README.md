# Sijie Liu — 个人主页

个人网站：[redpanda0614.github.io](https://redpanda0614.github.io/)

静态 HTML / CSS / JavaScript，无需安装依赖或构建。GitHub Pages 从 `main` 分支根目录发布，推送修改后会自动更新。

## 页面内容

- 个人介绍、CMU 学业背景、联系方式、GitHub / LinkedIn / ORCID。
- CIKM 2025 与 SIGIR-AP 2024 两篇论文，完整作者顺序、论文链接、研究贡献。
- 腾讯 IEG、CDG 两段实习，以及简历中的工作成果。
- OC Expression Sheet、People’s Daily RAG、Bird Migration 三个精选项目。
- GitHub 全部公开仓库：3 个精选项目 + 7 个可展开的其他仓库，每个项目只出现一次。
- 教育背景、技能、完整简历 PDF。

## 如何修改内容

- `index.html`：个人资料、论文、经历、精选项目、静态仓库列表。
- `styles.css`：配色、字体、布局与手机适配。
- `app.js`：通过 GitHub 公共 API 刷新所有公开仓库。无需 API 密钥。自动处理分页，全部请求成功后才替换列表。
- `assets/CV_Sijie_Liu.pdf`：替换此文件即可更新可下载简历。
- `assets/avatar.png`：取自本人 GitHub 公开头像，可替换为个人照片。
- `assets/repos-snapshot.json`：交付时的仓库数据备份。

其他仓库列表按 GitHub 更新顺序显示，自动排除上方已展示的精选项目。每次打开页面会尝试获取最新项目；遇到网络问题、API 限流或关闭 JavaScript 时，完整的静态列表仍然可展开查看，并保留快照日期。精选项目和个人经历为人工整理，不会自动改写。

网站保留所有公开仓库，不包含私有仓库、组织名下项目和未提供的其他工作。原始简历原样随站点提供，包含其中的联系方式。

## 内容依据

- 用户提供的 CV_Sijie_Liu.pdf：教育、经历、研究贡献和实验结果。
- https://github.com/RedPanda0614 ：账号与公开仓库。
- https://dl.acm.org/doi/10.1145/3746252.3761197 ：Dense Retrieval for Aggregated Search。
- https://dl.acm.org/doi/10.1145/3673791.3698406 ：Investigating Users' Search Behavior and Outcome with ChatGPT in Learning-oriented Search Tasks。
- 作者顺序、题目与会议信息经 Crossref DOI 元数据核对。
- 项目说明依据公开 README。表情准确率采用简历提供的整体实验结果；People’s Daily README 的不同段落含不同 EM 指标，因此主页未摘取该指标。

网页未使用外部字体、跟踪脚本或第三方分析服务。外部请求仅用于读取 GitHub 公开仓库，点击外部链接时会前往相应网站。

## 字体

全站优先使用访问设备上的 Aptos，其次使用 Calibri；若两者均未安装，则依次回退到 Segoe UI、Arial 和系统无衬线字体。网站不分发字体文件。
