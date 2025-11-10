<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import EventCard from '@/components/EventCard.vue'
import { useFavorites } from '@/composables/useFavorites'

const { favoriteIds, isFavorite, removeFavorite } = useFavorites()
const isLoading = ref(true)

// 从所有事件中筛选出被收藏的事件
const favoriteEvents = computed(() => {
//   return allEvents.filter(event => favoriteIds.value.has(event))
    return favoriteIds.value
})

// 在这个页面，toggle 只会是 "remove"
function handleToggleFavorite(event: any) {
  removeFavorite(event)
}

onMounted(() => {
  // 模拟加载
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold tracking-tight mb-6">
      Favorites
    </h1>

    <div v-if="isLoading" class="text-center text-muted-foreground">
      Loading your favorites...
    </div>

    <!-- ======================= 空状态显示 (核心部分) ======================= -->
    <!-- 当加载完成且 favoriteEvents 数组为空时，显示此模块 -->
    <div v-else-if="favoriteEvents.length === 0" class="text-center py-24">
      <p class="text-lg font-medium text-muted-foreground mb-2">
        No favorite events yet.
      </p>
      <p class="text-muted-foreground">
        Add events to your favorites by clicking the heart icon on any event.
      </p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <EventCard 
        v-for="event in favoriteIds" 
        :key="event.id" 
        :event="event"
        :is-like="isFavorite(event)"
        @toggle-favorite="handleToggleFavorite"
      />
    </div>
  </div>
</template>
