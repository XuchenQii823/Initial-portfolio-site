// 从 React 引入两个「钩子」：
// - useState：让组件能记住会变化的数据（例如当前显示第几个职位）
// - useEffect：在特定时机执行副作用（例如监听系统设置、启动定时器）
import { useEffect, useState } from 'react'

// 定义这个组件能从「父组件」接收哪些参数（Props = Properties，属性）
// HomePage 会把 scrollHintHidden 传进来，用来控制底部「Scroll」提示是否隐藏
type HeroWorkPanelProps = {
  scrollHintHidden: boolean
}

// 首页简介里会轮播的三个职位标题（英文展示给用户看）
const heroRoles = ['Product Designer', 'UX Engineer', 'Vibe Coder']
// 在末尾再拼一次第一个职位，形成「无缝循环」用的列表（见下方轮播逻辑）
const heroLoopRoles = [...heroRoles, heroRoles[0]]
// 每隔多少毫秒切换一次职位（2450 ≈ 2.45 秒）
const heroRoleIntervalMs = 2450

// 导出首页「英雄区 / Hero」主面板组件
// 在整页中的位置：HomePage 里 id="home" 的 section 内部，Work / Info 标签下方
// 作用：访客第一眼看到的大名、自我介绍、两个按钮，以及底部的滚动提示
export function HeroWorkPanel({ scrollHintHidden }: HeroWorkPanelProps) {
  // 当前轮播到第几个职位（0 = Product Designer，1 = UX Engineer，2 = Vibe Coder）
  const [activeRoleIndex, setActiveRoleIndex] = useState(0)
  // 是否启用 CSS 过渡动画（循环重置时会短暂关掉，避免闪一下）
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  // 用户系统是否开启了「减少动态效果」（无障碍设置）
  const [reduceMotion, setReduceMotion] = useState(false)

  // —— 副作用 1：读取系统「减少动态」偏好 ——
  // 页面加载时执行一次；用户改系统设置时也会更新
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updatePreference = () => {
      setReduceMotion(media.matches)
    }

    updatePreference()
    media.addEventListener('change', updatePreference)

    // 组件卸载时移除监听，避免内存泄漏
    return () => {
      media.removeEventListener('change', updatePreference)
    }
  }, [])

  // —— 副作用 2：职位文字自动轮播 ——
  // 依赖 reduceMotion：若用户要求减少动画，则停在第一个职位，不启动定时器
  useEffect(() => {
    if (reduceMotion) {
      setActiveRoleIndex(0)
      setTransitionEnabled(false)
      return
    }

    const timer = window.setInterval(() => {
      setTransitionEnabled(true)
      setActiveRoleIndex((previous) => previous + 1)
    }, heroRoleIntervalMs)

    // 清理：离开页面或 reduceMotion 变化时清除定时器
    return () => {
      window.clearInterval(timer)
    }
  }, [reduceMotion])

  // —— 下面 return 的是要画在屏幕上的 HTML 结构（JSX）——
  return (
    // 外层网格容器：在 CSS 里控制 Hero 区域的布局（单列宽版）
    <div className="hero-grid-home hero-grid-home-single">
      {/* 左侧主内容：姓名 + 简介 + 按钮；fade-up-home 配合 CSS 做进入动画 */}
      <div className="hero-left-home hero-left-home-wide fade-up-home">
        {/* 页面主标题（SEO 上通常整站只有一个 h1） */}
        <h1 className="hero-name-home">Xuchen Qi</h1>

        {/* 一段自我介绍；中间嵌入会上下滚动的职位词 */}
        <p className="hero-bio-home">
          A{' '}
          {/* 职位轮播的「窗口」：aria-label 给读屏软件读当前实际职位 */}
          <span
            className="hero-role-slot-home"
            aria-label={heroRoles[activeRoleIndex === heroRoles.length ? 0 : activeRoleIndex]}
          >
            {/* 隐藏但占位：用最长文案撑开宽度，避免轮播时整段文字左右跳动 */}
            <span className="hero-role-measure-home" aria-hidden="true">
              Product Designer
            </span>
            {/* 只显示一行高度的视口，超出部分被裁切 */}
            <span className="hero-role-viewport-home" aria-hidden="true">
              {/* 整条职位列表；用 translateY 向上平移，看起来像翻页 */}
              <span
                className={`hero-role-track-home${reduceMotion ? ' reduced-motion' : ''}${transitionEnabled ? '' : ' no-transition'}`}
                style={{ transform: `translateY(calc(-1 * var(--hero-role-step) * ${activeRoleIndex}))` }}
                onTransitionEnd={() => {
                  // 滚到「复制的第一个」时，无动画跳回 index 0，实现无限循环
                  if (!reduceMotion && activeRoleIndex === heroRoles.length) {
                    setTransitionEnabled(false)
                    setActiveRoleIndex(0)
                  }
                }}
              >
                {heroLoopRoles.map((role, index) => (
                  <span key={`${role}-${index}`} className="hero-role-item-home">
                    {role}
                  </span>
                ))}
              </span>
            </span>
          </span>{' '}
          specialising in <em>complex interactive systems,</em> with 3+ years delivering
          human-centred products from research to production, and{' '}
          <em>leveraging AI to design and ship them directly.</em>
        </p>

        {/* 两个行动按钮：跳转到同页的项目区、联系区（href 以 # 开头 = 页内锚点） */}
        <div className="hero-cta-home">
          <a href="#projects" className="button-home button-home-primary">
            View Work
          </a>
          <a href="#contact" className="button-home button-home-secondary">
            Get in Touch
          </a>
        </div>
      </div>

      {/* 右下角「Scroll ↓」提示；父组件在用户开始滚动后会传 scrollHintHidden=true 并加上 hidden 类 */}
      <div className={scrollHintHidden ? 'hero-scroll-hint-home hidden' : 'hero-scroll-hint-home'}>
        <span aria-hidden="true">↓</span>
        <span>Scroll</span>
      </div>
    </div>
  )
}
