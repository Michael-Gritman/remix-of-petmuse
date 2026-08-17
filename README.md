# Remix of PetMuse

请创建一个高完成度、视觉驱动、可真实交互的宠物探索网站原型。

不要做成常见的 AI SaaS 模板，也不要让 Quiz 成为网站主体。

第一版的优先目标不是后端或商业化，而是：

让用户进入网站后立刻被宠物吸引，并愿意持续浏览、点击、收藏和比较。

1. 产品定位

网站名称：

PetMuse

核心 Tagline：

Find a pet that fits your life.

产品定位：

一个以宠物照片探索为核心，帮助用户发现、了解、收藏和比较不同宠物，并最终找到更适合自己生活方式的伴侣动物的网站。

主要体验：

Discover → Explore → Learn → Save → Compare → Decide

不是：

Quiz → AI 决定你应该养什么

Quiz 只是辅助用户缩小选择范围的工具。

PetMuse 应该让用户感觉：

温暖

精致

明亮

有生命感

宠物氛围浓厚

摄影感强

交互丝滑

像成熟的消费级产品

而不是明显由 AI Builder 生成的网站

2. 核心页面结构

第一版做成一个流畅的单页体验：

Sticky Navigation
        ↓
Hero
        ↓
Pet Wall
        ↓
Pet Detail Modal

另外提供：

Saved 状态

Compare 状态

Floating Quiz Button

Quiz Modal

点击 Start Exploring 时，不刷新网页，而是平滑滚动到 Pet Wall。

点击宠物时，不跳转页面，而是在当前照片墙上弹出沉浸式 Pet Detail Modal。

3. 全局视觉方向

色彩

主体：

White

Warm White

Cream

Very Light Warm Gray

文字：

深灰黑

不使用绝对纯黑作为大面积文本

强调色：

选择 1 个主要自然色 + 少量辅助色。

可以考虑：

柔和绿色

暖橙

米黄色

必须低饱和。

不要变成彩虹 UI。

禁止

不要使用：

紫蓝 AI 渐变

深色科技背景

Neon Glow

大量 Glassmorphism

满屏 Gradient

“Powered by AI”

AI 星星装饰到处出现

SaaS Dashboard 风格

传统企业 Landing Page 风格

形状

整体：

大圆角

极轻阴影

充分留白

柔和但不幼稚

建议：

小组件圆角：14–20px

大卡片：24–32px

Modal：28–36px

Typography

标题：

大

清晰

稍有 editorial 感

Medium / Semibold

不要 Extra Bold

正文：

简洁

易读

行距舒适

4. Motion Language

整个网站必须使用统一的动画语言：

Soft · Organic · Responsive · Premium

所有动画都禁止使用明显的 linear 匀速。

动画应该：

快速响应 → 自然移动 → 接近终点时明显减速 → 柔和稳定。

允许非常轻微 spring settle。

禁止明显 bounce。

建议：

Hover：150–220ms

普通状态切换：220–320ms

Filter 重排：300–450ms

Pet Modal：420–520ms

Hero 内容首次入场：650–850ms

优先动画：

transform

opacity

避免大量 layout reflow。

如果项目已有 Motion / Framer Motion，可优先利用；否则使用性能良好的 CSS 动画实现。

支持：

prefers-reduced-motion

开启 Reduced Motion 后应显著减少位移、scale 和复杂动画。

5. Navigation

顶部导航保持极简。

左侧：

PetMuse

右侧：

Discover

Compare

♡ Saved

Take the Quiz

导航栏：

Sticky

Hero 顶部初始可略透明

页面向下滚动后逐渐变为半透明暖白

使用轻微 backdrop blur

不要明显边框

状态变化自然

6. Hero — 总体结构

Hero 高度约：

100vh

Hero 分成两层：

动态宠物摄影背景
        +
白色前景内容岛

用户打开网站时，应首先感受到：

一个正在缓慢流动的宠物世界。

7. Hero 背景 — 动态宠物照片流

背景使用大量真实、高质量宠物摄影。

第一版可以包含：

Dogs

Cats

Rabbits

Hamsters

Small birds

Other companion pets

布局类似：

Pinterest / Editorial Collage

不要整齐九宫格。

图片：

高度不同

尺寸略有差异

圆角自然

图片间留有呼吸空间

背景图片：

不可点击

无 hover

不显示名字

不显示按钮

仅用于视觉氛围

背景运动

把照片分成数列。

例如：

Column 1：缓慢向上

Column 2：缓慢向下

Column 3：缓慢向上

Column 4：缓慢向下

不同列速度略有不同。

速度必须非常慢。

不要像：

Carousel

Banner

Marquee

广告跑马灯

用户应该觉得：

图片世界在自然地呼吸和流动。

可覆盖非常轻的白色 overlay 以保证前景文字可读。

不要明显压暗照片。

8. Hero 前景内容岛

在动态照片背景上放置一个大型：

White / Warm White Content Island

它不是普通 Card。

应该像一个宽大的、柔和的前景界面自然浮在宠物世界之上。

特征：

大量留白

大圆角

极轻阴影

无明显边框

视觉重量稳定

与背景形成明显层级

桌面端不要占满屏幕宽度。

保持足够背景照片可见。

9. Hero 首次进入动画【重点】

用户首次进入网站时，前景内容岛不能静态出现在页面中。

需要形成一个高级、自然的 bottom-to-top reveal。

页面开始

背景宠物照片先出现并开始缓慢流动。

让用户先感知照片背景约：

100–200ms

然后前景内容岛开始进入。

内容岛初始状态

建议：

opacity: 0
translateY: 90–120px
scale: 0.975–0.985

最终：

opacity: 1
translateY: 0
scale: 1

持续：

约 650–850ms

动画感觉

绝对不要普通的：

slide-up + ease

更不要：

linear

高速冲入

明显 bounce

夸张 overshoot

需要：

起步响应较快 → 中段自然上升 → 接近终点明显减速 → 最后轻柔 settle。

如果使用 spring：

damping 较高

bounce 极低

settle 几乎不可察觉

内容岛应该给人一种：

有一点真实重量，被自然托起并稳定下来。

而不是：

“一个 DIV 从下面滑上来了。”

10. Hero 内部内容的 Stagger

内容岛出现时，不要标题、正文、按钮同时机械出现。

使用极轻的 stagger：

① Tagline

首先出现。

② Brief Info

比 Tagline 延迟约：

60–100ms

③ CTA

再延迟：

60–100ms

每个元素只需要：

opacity: 0 → 1
translateY: 8–14px → 0

不要让每个元素各自播放夸张动画。

整体应该感觉：

一个完整界面逐渐建立起来。

而不是三个元素分别表演。

11. Hero 内容

Tagline

使用：

Find a pet that fits your life.

这是整个首页最大的文字。

建议：

桌面：

64–80px

移动：

42–52px

不要过粗。

Brief Info

使用：

Discover different companions, understand what life with them is really like, and find one that feels right for you.

控制：

2–3 行。

CTA

使用：

Start Exploring →

建议：

高 52–58px

Pill / large rounded button

清晰但不过分抢眼

Hover：

轻微上浮

背景或阴影轻微变化

Press：

Scale 到约 0.97–0.98

松开自然回弹

点击：

平滑滚动至 Pet Wall

不刷新页面。

12. Hero 动画播放规则

大型 Hero 首次进入动画只在：

初次进入网站

真正重新加载首页

时播放。

不要在：

关闭 Modal

Pet Wall 筛选

从详情返回

Quiz 关闭

之后重复播放完整 Hero 动画。

否则会拖沓。

Reduced Motion 模式下：

取消大幅 translate 和 scale。

改成约：

150–250ms opacity transition

即可。

13. Pet Wall

这是网站真正的核心产品区域。

背景恢复成：

干净的 White / Warm White

顶部先提供筛选器。

14. Pet Filters

分成两个层级。

Category

All

Dogs

Cats

Rabbits

Small Pets

Birds

Lifestyle / Traits

Small

Medium

Large

Apartment-friendly

Quiet

Active

Cuddly

Independent

Beginner-friendly

Low-maintenance

筛选按钮：

小型 pill

轻边框或轻背景

选中状态清晰

不用强烈颜色

移动端允许横向滑动。

15. Filter Animation

切换筛选时：

绝对不能：

图片瞬间消失 → 所有内容瞬移。

需要：

不符合条件的卡片淡出

剩余卡片平滑重新布局

新出现卡片淡入

总时长约 300–450ms

使用自然 easing

整个 Masonry 重新排列应保持流畅。

16. Pet Wall Layout

使用：

Masonry / Pinterest-style layout

不要固定九宫格。

桌面：

约 3–4 列。

Tablet：

约 2–3 列。

Mobile：

1–2 列。

图片高度应有变化。

17. Pet Card

Pet Card 主要就是照片。

视觉占比：

图片约占 90%。

要求：

大圆角

不要明显 Card 外框

不要大面积阴影

图片完整成为主体

Hover：

scale 约 1.01–1.025

非常轻

不能跳动

底部可添加非常轻微的黑色透明渐变。

只显示：

Pet Name

以及最多 2–3 个词：

例如：

Golden Retriever
Friendly · Active · Social

不要直接显示：

Energy 8/10

Cost 7/10

Grooming 5/10

大段说明

一堆按钮

照片墙唯一任务：

让用户产生发现欲和点击欲。

18. Pet Detail — 核心交互

点击任意 Pet Card：

不要跳转页面。

参考：

Apple App Store → Today → 点击宣传卡片后的详情展开体验。

用户点击后：

当前 Pet Wall 保留
        ↓
背景柔和模糊
        ↓
中央出现 Pet Detail Modal

这是整个网站最重要的交互之一。

19. Modal Background

Modal 打开时：

Pet Wall：

保持原位置

停止外层滚动

backdrop blur：约 8–14px

brightness 略微降低

加很轻的透明 overlay

例如接近：

rgba(0,0,0,0.10–0.16)

不要黑屏。

用户仍应该隐约感受到背后的宠物世界。

20. Pet Detail Modal Animation【重点】

初始建议：

opacity: 0
scale: 0.94–0.96
translateY: 16–24px

最终：

opacity: 1
scale: 1
translateY: 0

持续：

420–520ms

运动：

快速响应 → 自然展开 → 后半段明显减速 → 轻柔 settle。

禁止：

linear

机械 scale

明显 bounce

夸张弹簧

关闭动画：

约 300–400ms

使用相同 Motion Language 的反向动画。

21. Modal Size

Desktop：

Width：680–800px

Max height：82–88vh

Centered

Border radius：28–36px

Mobile：

接近全屏

保留高级的圆角和展开感

Modal 自己可以：

Vertical Scroll

Modal 外页面：

Scroll Locked

22. Modal Hero Image

Modal 顶部是一张巨大的宠物图片。

要求：

占满 Modal 宽度

无白边

与顶部圆角融合

object-fit: cover

高质量摄影

初始 viewport 中约：

35–45%

由照片占据。

宠物仍然永远是视觉主角。

23. Modal Close

照片右上角：

圆形：

×

样式：

半透明白色

backdrop blur

克制

高对比可见

支持：

×

点击 overlay

ESC

但 Modal 内部滚动不能意外关闭。

24. Pet Header + Save

照片下面：

Golden Retriever

Friendly · Active · Social

然后提供明显但克制的：

♡ Save

点击：

♡ → ♥
Save → Saved

爱心执行：

scale 1
→ 1.15–1.20
→ 1

使用非常轻微 spring。

不要出现：

Successfully saved!

等 Toast。

状态变化本身就是反馈。

再次点击可取消收藏。

V1 使用：

localStorage

保存收藏。

25. Pet Introduction

显示极短介绍。

例如：

Golden Retrievers are affectionate, highly social dogs that thrive when they're closely involved in everyday family life.

最多：

2–4 行

不要写百科文章。

26. Key Metrics

只显示最重要的 6 项：

Space Need

Daily Attention

Energy

Typical Cost

Grooming

Beginner Friendly

不要只显示：

7/10

优先：

文字等级 + 视觉条

例如：

Energy
High
●●●●○

或者非常简洁的 progress bar。

统一风格。

指标区域必须紧凑。

不要把 Modal 做成几十屏长。

27. Great For

指标下面：

Great for

例如：

✓ Families

✓ Active owners

✓ People who want a social companion

只需：

2–4 项

28. Think Twice If

随后：

Think twice if

例如：

You're away from home most of the day

You want a very low-maintenance pet

Daily exercise is difficult for you

2–4 项。

语气：

客观

温和

负责任

不制造恐惧。

29. Similar Pets

Modal 底部显示：

Similar pets

显示 2–4 个紧凑卡片。

例如 Golden Retriever：

Labrador Retriever

Cocker Spaniel

Bernese Mountain Dog

点击 Similar Pet：

不要关闭 Modal 再重新打开。

应该：

当前内容轻柔淡出

替换宠物数据

Modal 内滚动回顶部

新照片与内容自然进入

保持整个体验连续。

30. Compare

用户可以添加宠物到 Compare。

V1：

最多支持：

2–3 个宠物

只需要建立：

Add to Compare

Remove from Compare

Compare 状态

简单 Comparison UI

不要开发复杂推荐算法。

未来可扩展。

31. Floating Quiz Button

进入 Pet Wall 后，在右下角固定显示：

✨ Find my match

要求：

position: fixed

desktop right：24–32px

bottom：24–32px

小型 pill

暖白背景

极轻阴影

不要像：

Chatbot

Support Button

巨大 CTA

Hover：

非常轻微上浮。

可以偶尔让 ✨ 做极轻动画。

不要一直跳。

Hero 首屏不显示这个 Floating Button。

进入 Pet Wall 后再显示。

32. Quiz

Quiz 只是辅助工具。

点击：

Find my match

打开轻量 Modal。

V1 做：

约 6–10 个问题

例如：

Living space

Daily available time

Budget

Activity level

Noise tolerance

Desired interaction

Experience

Maintenance tolerance

完成后不要告诉用户：

You should get a cat — 91%.

而是生成：

Recommended filters

例如：

Apartment-friendly

Quiet

Beginner-friendly

Lower maintenance

然后提示：

Based on your lifestyle, start exploring these pets.

关闭 Quiz 后：

自动把这些筛选条件应用到 Pet Wall。

核心思想：

Quiz 帮助探索，而不是替用户做最终决定。

33. Saved

V1 不需要账号。

使用 localStorage 保存：

Favorite pet IDs

Compare pet IDs

顶部：

♡ Saved

点击后可以：

显示 Saved pets

或过滤当前 Pet Wall

实现方式保持简单。

34. Mock Data

第一版使用本地 mock data。

不要连接后端。

准备至少：

20–30 个宠物条目

需要有明显多样性。

不要全部都是猫狗。

建议覆盖：

Dogs

Cats

Rabbits

Hamsters

Guinea pigs

Small birds

其他合理 companion pets

每个对象至少包含：

id
name
category
breed
image
shortDescription
size
traits[]
spaceNeed
attentionNeed
energy
typicalCost
grooming
beginnerFriendly
greatFor[]
thinkTwiceIf[]
similarPetIds[]

将数据和 UI 分离。

以后可以方便替换成数据库/API。

35. Photography

摄影决定这个网站成败。

优先使用：

真实、高质量、自然的宠物摄影。

不要明显：

AI-generated

过度磨皮

奇怪肢体

超现实摄影

Stock photo corporate 感

如果当前只能使用占位图片：

确保图片 URL/Data 层可轻松替换。

不要把图片逻辑写死在 UI 组件中。

正式版本以后必须确保：

合法授权

可商用

清晰

来源可靠

36. Performance

这是图片密集型网站。

必须实现：

Lazy loading

Responsive image sizes

合理压缩

WebP / AVIF 优先

首屏图片优先加载

后续按滚动加载

避免一次加载大量原始超高清照片

动画优先：

transform

opacity

即使照片较多：

Scroll

Filter

Modal

Hover

都必须保持流畅。

37. Accessibility

至少实现：

图片 alt

键盘操作

ESC 关闭 Modal

Modal focus trap

收藏按钮 aria-label

足够文本对比度

Reduced Motion

合理触控区域

38. Responsive

必须同时优化：

Desktop

完整动态 Hero

3–4 列 Masonry

中央 Modal

Tablet

2–3 列

调整 Hero 内容比例

Mobile

Hero 大标题缩小

动态照片背景简化，避免性能问题

Pet Wall 1–2 列

Filters 横向滚动

Modal 接近全屏

CTA 和收藏区域适合触控

Floating Quiz 不遮挡内容

不要只做 Desktop 然后简单缩放。

39. 技术结构

优先使用当前项目已有的现代前端技术栈。

保持：

Component-based

Data/UI separation

Reusable components

清晰目录

独立 animation logic

易扩展

不过度工程化

建议拆分至少：

Navigation
Hero
HeroPhotoFlow
PetFilters
PetWall
PetCard
PetDetailModal
PetMetrics
SaveButton
Compare
QuizButton
QuizModal

不要把整个网站写在一个巨大组件里。

40. V1 暂时不要实现

不要加入：

Login

Signup

Supabase

Database

Payment

AI API

Chatbot

Social features

Comments

CMS

Ads

Affiliate links

Complex backend

Multilingual system

这些后续再做。

当前唯一目标：

把核心视觉探索体验做得非常优秀。

41. 开发优先级

请按照这个顺序实现：

Priority 1

Hero 动态宠物摄影背景

Priority 2

高级 Hero 内容岛首次入场动画

Priority 3

Pet Wall + Masonry

Priority 4

Filters + 平滑重排

Priority 5

App Store Today 风格 Pet Detail Modal

Priority 6

Save

Priority 7

Floating Quiz

Priority 8

Quiz 基础流程

Priority 9

Compare

不要因为低优先级功能影响前五项的质量。

42. 最终验收标准

完成第一版后，请主动检查以下内容。

首页

首屏是否第一眼就是宠物，而不是 SaaS？

动态图片是否自然缓慢，而不是跑马灯？

前景内容岛是否真的有“被托起”的高级感？

Tagline 是否足够突出？

Start Exploring 是否自然进入照片墙？

Pet Wall

是否有明显 Pinterest / discovery 感？

图片大小是否有变化？

用户是否会想继续往下浏览？

Filter 是否平滑重新排列？

Modal

点击照片后是否完全不跳页？

背景是否柔和 blur？

Modal 动画是否自然，有高级原生 App 感？

图片是否足够突出？

内容是否简洁？

Modal 是否没有过长？

Interaction

Save 是否有自然即时反馈？

Quiz 是否只是辅助，而不是抢夺主体？

动画是否避免 linear 和廉价 bounce？

Mobile 是否真正可用？

Performance

首屏加载是否合理？

Scroll 是否流畅？

Modal 是否不卡顿？

图片是否做了合理优化？

43. 最重要的产品感觉

用户第一次打开网站：

“这里有好多漂亮的宠物，我想看看。”

浏览照片：

“这只好可爱，我想了解一下。”

点击：

“这个展开方式很舒服。”

往下看：

“原来养它意味着这些事情。”

收藏：

“我先把它留下来比较。”

选择太多：

“让 Quiz 帮我缩小一点范围。”

最终 PetMuse 应该表达：

PetMuse 不替用户决定养什么，而是创造一个漂亮、自然、可靠的空间，让用户发现、理解并比较未来可能陪伴自己的宠物。

请优先保证：

视觉吸引力 > 交互流畅度 > 产品结构清晰度 > 功能数量。

如果实现过程中必须做取舍：

宁可少做功能，也不要降低 Hero、Pet Wall、Pet Detail Modal 三个核心体验的质量。

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/552f2bac-2fa8-407f-ba09-e904fe26f57b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
