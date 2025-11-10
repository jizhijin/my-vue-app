<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Search, Heart, Menu, X } from 'lucide-vue-next' // 1. 导入 X 图标和 ref
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RouterView, useRouter } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
// 2. 创建一个 ref 来追踪菜单的打开/关闭状态
const isMenuOpen = ref(false)
// 定义移动设备的断点，768px 通常是平板电脑的尺寸 (Tailwind 的 'md' 断点)
const MOBILE_BREAKPOINT = 768

// 创建一个响应式引用来存储 Toaster 的位置
// 它的类型是 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
const toasterPosition = ref<'top-center' | 'bottom-right'>('bottom-right')

// 定义一个函数来检查屏幕宽度并更新位置
function updateToasterPosition() {
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    // 在移动设备上，顶部中间通常是最佳选择
    toasterPosition.value = 'top-center' 
  } else {
    // 在桌面设备上，恢复为右下角
    toasterPosition.value = 'bottom-right'
  }
}

const router = useRouter()
const toFavorites = () => {
    router.push({ name: 'Favorites' })
}
const toSearch = () => {
    router.push({ name: 'Search' })
}

// onMounted: 当组件挂载到 DOM 后执行
onMounted(() => {
  // 1. 立即执行一次，设置初始位置
  updateToasterPosition()
  // 2. 添加窗口大小变化的监听器
  window.addEventListener('resize', updateToasterPosition)
})

// onUnmounted: 当组件从 DOM 卸载前执行
onUnmounted(() => {
  // 移除监听器，防止内存泄漏
  window.removeEventListener('resize', updateToasterPosition)
})
</script>

<template>
  <!-- 移除了外层的 justify-center 和 items-center，因为它们会影响sticky header的行为 -->
  <!-- min-h-screen flex flex-col 确保了当内容不足时，页脚也能在底部 -->
  <div class=" bg-background font-sans text-foreground flex flex-col items-center 2xl:w-full">
    <!-- 全局页头 -->
    <header
      class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center w-full">
      <div class=" h-14 flex justify-between px-4 py-2 w-[80vw]">
        <!-- 左侧Logo/标题 -->
        <div class="mr-4 flex items-center ">
          <a class="mr-6 flex items-center space-x-2" href="/search">
            <span class="font-bold" style="font-size: 1.5rem;">Events Around</span>
          </a>
        </div>

        <!-- 右侧导航区域 -->
        <div class="flex flex-1 items-center justify-end">
          <!-- 桌面端导航 -->
          <nav class="hidden md:flex md:items-center md:space-x-1">
            <Button variant="ghost" size="sm" class="gap-1" @click="toSearch">
              <Search class="h-4 w-4" />
              Search
            </Button>
            <Button variant="ghost" size="sm" class="gap-1" @click="toFavorites">
              <Heart class="h-4 w-4" />
              Favorites
            </Button>
          </nav>

          <!-- 移动端菜单 -->
          <div class="md:hidden">
            <!-- 3. 使用 v-model:open 绑定菜单状态 -->
            <DropdownMenu v-model:open="isMenuOpen">
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon">
                  <!-- 4. 根据 isMenuOpen 的状态条件渲染 Menu 或 X 图标 -->
                  <Menu v-if="!isMenuOpen" class="h-5 w-5" />
                  <X v-else class="h-5 w-5" />
                  <span class="sr-only">Toggle Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <!--
                5. 调整 DropdownMenuContent 样式
                - 移除了 align="end"
                - 添加了 w-screen 使其占满屏幕宽度
                - 添加了 mt-2 使其与 header 有一点间距
                - 添加了 border-x-0 rounded-none 移除了水平边框和圆角，使其看起来更像一个全宽区块
              -->
              <DropdownMenuContent class="w-screen mt-2 border-x-0 rounded-none">
                <DropdownMenuItem @click="toSearch"> 
                  <Search class="mr-2 h-4 w-4" />
                  <span>Search</span>
                </DropdownMenuItem>
                <DropdownMenuItem @click="toFavorites">
                  <Heart class="mr-2 h-4 w-4" />
                  <span>Favorites</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>

    <!-- 
      页面内容容器
      flex-1 和 flex 确保它能填满剩余空间
      这使得 RouterView 内部的 m-auto 能够实现垂直居中 
    -->
    <main class=" p-4 w-full flex flex-col items-center">
      <Toaster  :position="toasterPosition"/>
      <RouterView />
    </main>
  </div>
</template>
