<!-- src/components/EventCard.vue -->
<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RouterLink } from 'vue-router'
import { ref, computed} from 'vue'
import { cn } from '@/lib/utils'

// ======================= 1. 定义目标数据结构 =======================
// 这是我们希望在组件内部使用的、干净且扁平化的格式。
// 这也应该是你用来在 MongoDB 中存储数据的格式。
interface CardEventData {
  id: string;
  name: string;
  venue: string;
  date: string;
  time: string;
  category: string;
  image: string;
}

// ======================= 2. 更新 PROPS 和 EMITS =======================
// 组件现在接受 `any` 类型的 event prop，因为它可以是
// 原始的 API 响应，也可以是我们干净的 CardEventData 格式。
const props = defineProps({
  event: {
    type: Object ,
    required: true,
  },
  isLike:{
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits<{
  (e: 'toggle-favorite', id: string): void
}>()

// ======================= 3. 转换逻辑 =======================
// 这个计算属性是解决方案的核心。它将传入的事件数据
// 规范化为我们期望的 `CardEventData` 格式。
const cardData = computed((): any => {
  const rawEvent = props.event;

  // 场景A：数据已经是我们的干净格式（例如，来自收藏页 / MongoDB）
  // 我们可以通过检查我们格式的唯一属性（如 `venue`），
  // 同时确保原始格式的唯一属性（如 `_embedded`）不存在，来检测这一点。
  if (!rawEvent._embedded) {
    return rawEvent as CardEventData;
  }
  console.log(rawEvent);
  

  // 场景B：数据是原始的 Ticketmaster API 格式（来自搜索页）
  // 我们将其转换为我们干净的 `CardEventData` 格式。
  // 使用可选链（?.）可以使转换过程在面对数据缺失时更加健壮。
  return {
    id: rawEvent.id,
    name: rawEvent.name || 'N/A',
    image: rawEvent.images?.find((img: any) => img.ratio === '16_9')?.url || rawEvent.images?.[0]?.url || '/placeholder.png',
    category: rawEvent.classifications?.[0]?.segment?.name ?? 'N/A',
    date: rawEvent.dates?.start?.localDate ?? '',
    time: rawEvent.dates?.start?.localTime ?? '',
    venue: rawEvent._embedded?.venues?.[0]?.name ?? '场馆待定',
  };
});


// ======================= 4. 更新交互逻辑 =======================
// 现在所有的逻辑都使用干净的 `cardData` 计算属性。
const isSubmitting = ref(false)

// async function updateFavoriteStatusAPI(eventId: string, newStatus: boolean) {
//   console.log(`API 调用：正在设置事件 ${eventId} 的收藏状态为 ${newStatus}...`)
//   console.log(`API 成功：事件 ${eventId} 的状态已更新。`);
//   // 在真实应用中，这里会是你的 `axios.post` 或 `fetch` 调用。
//   return true
// }

async function handleToggleFavorite() { 
   emit('toggle-favorite', cardData.value); 
}

// async function handleToggleFavorite() {
//   if (isSubmitting.value) return;

//   const event = cardData.value; // 使用规范化后的数据

//   if (!event.isLike) {
//     // --- 添加到收藏 ---
//     emit('toggle-favorite', event.id);
//     toast.success(`'${event.name}' 已添加到收藏！`, {
//       description: `您可以在“收藏”页面查看它。`,
//     });
//     try {
//       isSubmitting.value = true;
//       await updateFavoriteStatusAPI(event.id, true);
//     } catch (error) {
//       console.error("API 收藏失败:", error);
//       emit('toggle-favorite', event.id); // API 失败时回滚 UI
//       toast.error("添加收藏失败，请重试。");
//     } finally {
//       isSubmitting.value = false;
//     }

//   } else {
//     // --- 从收藏中移除 (带撤销功能) ---
//     emit('toggle-favorite', event.id);

//     const performUnfavorite = async () => {
//       try {
//         isSubmitting.value = true;
//         await updateFavoriteStatusAPI(event.id, false);
//       } catch (error) {
//         console.error("API 取消收藏失败:", error);
//         emit('toggle-favorite', event.id); // API 失败时回滚 UI
//         toast.error("移除收藏失败，状态已恢复。");
//       } finally {
//         isSubmitting.value = false;
//       }
//     };

//     toast(`'${event.name}' 已从收藏中移除。`, {
//       action: {
//         label: '撤销',
//         onClick: () => {
//           emit('toggle-favorite', event.id); // 回滚 UI
//           toast.info(`'${event.name}' 已恢复到收藏夹！`);
//         },
//       },
//       // 当通知在未点击“撤销”的情况下自动关闭时，调用 API。
//       onAutoClose: () => performUnfavorite(),
//       // 当用户手动关闭通知时，也调用 API。
//       onDismiss: (t) => {
//         if (t.userDismissed) {
//           performUnfavorite();
//         }
//       }
//     });
//   }
// }
</script>

<template>
  <!-- ======================= 5. 更新模板 ======================= -->
  <!-- 整个模板现在都可靠地使用 `cardData` 计算属性。 -->
  <Card class="overflow-hidden transition-all hover:shadow-md flex flex-col p-0 group">
    <RouterLink :to="{ name: 'Detail', params: { id: cardData.id } }">
      <div class="relative aspect-[16/9] overflow-hidden bg-muted">
        <img :src="cardData.image" :alt="cardData.name" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <Badge class="absolute top-3 left-3">{{ cardData.category }}</Badge>
        <Badge variant="secondary" class="absolute top-3 right-3 bg-black/50 text-white backdrop-blur-sm">
          {{ cardData.date }} {{ cardData.time }}
        </Badge>
      </div>
    </RouterLink>
    <CardContent class="p-4 flex items-start justify-between flex-grow">
      <div class="flex-1 mr-2">
        <RouterLink :to="{ name: 'Detail', params: { id: cardData.id } }">
          <h3 class="font-semibold leading-snug hover:underline">{{ cardData.name }}</h3>
        </RouterLink>
        <p class="text-sm text-muted-foreground mt-1">{{ cardData.venue }}</p>
      </div>

      <Button
        variant="outline"
        size="icon"
        class="flex-shrink-0"
        @click="handleToggleFavorite"
        :disabled="isSubmitting"
      >
        <Heart :class="cn('h-8 w-8 transition-colors', isLike ? 'text-red-500 fill-red-500' : 'text-muted-foreground hover:text-foreground')" />
      </Button>
    </CardContent>
  </Card>
</template>
