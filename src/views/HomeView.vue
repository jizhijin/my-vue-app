<!-- src/views/DashboardPage.vue -->
<script setup lang="ts">
import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  LayoutDashboard,
  Package2,
  Users,
} from 'lucide-vue-next'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <!-- 主容器，使用 Flexbox 实现左右布局 -->
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <!-- 左侧导航栏 -->
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <!-- 导航栏头部 -->
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span class="">Acme Inc</span>
          </a>
        </div>
        <!-- 导航链接 -->
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <a
              href="#"
              class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <LayoutDashboard class="h-4 w-4" />
              Dashboard
            </a>
            <a
              href="#"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users class="h-4 w-4" />
              Customers
            </a>
            <a
              href="#"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <CreditCard class="h-4 w-4" />
              Orders
            </a>
            <a
              href="#"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Activity class="h-4 w-4" />
              Analytics
            </a>
          </nav>
        </div>
      </div>
    </div>

    <!-- 右侧主内容区 -->
    <div class="flex flex-col">
      <!-- 右侧头部 -->
      <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <!-- 这里是移动端菜单按钮，暂时隐藏 -->
        <!-- <Button variant="outline" size="icon" class="shrink-0 md:hidden">
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button> -->
        <div class="w-full flex-1">
          <!-- 可以放一个搜索框 -->
        </div>
        <Button>
          <Download class="mr-2 h-4 w-4" />
          Download
        </Button>
      </header>
      
      <!-- 主要内容区域 -->
      <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h1 class="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <!-- 指标卡片网格 -->
        <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">$45,231.89</div>
              <p class="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">+2350</div>
              <p class="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Sales</CardTitle>
              <CreditCard class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">+12,234</div>
              <p class="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Active Now
              </CardTitle>
              <Activity class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">+573</div>
              <p class="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>

        <!-- 下方图表和列表区域 -->
        <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <!-- 左侧图表卡片 -->
          <Card class="xl:col-span-2">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent class="pl-2">
              <!-- 
                这里是图表区域的占位符。
                实际项目中，你会在这里集成一个图表库 (如 Chart.js, ECharts, ApexCharts)。
                这个 div 将作为图表的容器。
              -->
              <div class="h-[350px] w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <p class="text-muted-foreground">Chart Area Placeholder</p>
              </div>
            </CardContent>
          </Card>

          <!-- 右侧最近销售列表 -->
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent class="grid gap-8">
              <div class="flex items-center gap-4">
                <Avatar class="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div class="grid gap-1">
                  <p class="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p class="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div class="ml-auto font-medium">+$1,999.00</div>
              </div>
              <div class="flex items-center gap-4">
                <Avatar class="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div class="grid gap-1">
                  <p class="text-sm font-medium leading-none">
                    Jackson Lee
                  </p>
                  <p class="text-sm text-muted-foreground">
                    jackson.lee@email.com
                  </p>
                </div>
                <div class="ml-auto font-medium">+$39.00</div>
              </div>
              <!-- 可以继续添加更多条目 -->
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  </div>
</template>
