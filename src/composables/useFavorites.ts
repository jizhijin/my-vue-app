import { addFavor, deleteFavor, getFavor } from '@/api';
import { ref, computed} from 'vue'
import { toast } from 'vue-sonner'

export interface CardEventData {
    _id:string;
  id: string;
  name: string;
  venue: string;
  date: string;
  time: string;
  category: string;
  image: string;
}

// 在真实应用中，这会从localStorage或API初始化
const favoriteIds = ref<any[]>([])

// --- 模拟后端 API ---
async function apiAddToFavorites(event:any): Promise<void> {
  console.log(`[API] Adding event ${event.id} to favorites...`)
//   await new Promise(resolve => setTimeout(resolve, 300))
    await addFavor(event)
  console.log(`[API] Event ${event.id} added.`)
}

async function apiRemoveFromFavorites(event:any): Promise<void> {
  console.log(`[API] Removing event ${event.id} from favorites...`)
//   await new Promise(resolve => setTimeout(resolve, 300))
  await deleteFavor(event.id)
  console.log(`[API] Event ${event.id} removed.`)
}
// --------------------

export function useFavorites() {

  // 获取收藏
  const getFavorites = async () => {
      getFavor().then(res => {
          console.log(res.data)
          favoriteIds.value = res.data
      })
  }
  getFavorites()
  
  // 添加到收藏
  const addFavorite = async (event:any) => {
    if (favoriteIds.value.find(item => item.id === event.id)) {
        console.log(`[API] Event ${event.id} already exists in favorites.`);
        
        return
    } // 防止重复添加
    console.log(event);
    
    
    // 立即更新UI状态
    favoriteIds.value.push(event)
    toast.success(`'${event.name}'added to favorites!`, {
      description: `You can view it in the Favertes page。`,
    });
    
    // 调用后端API
    try {
      await apiAddToFavorites(event)
    } catch (error) {
      // 如果API失败，回滚UI状态并提示用户
      favoriteIds.value.slice(favoriteIds.value.indexOf(event), 1)
      toast.error('Failed to add favorite. Please try again.')
    }
  }

  // 从收藏中移除 (带Undo功能)
  const removeFavorite = (event: any) => {
    if (!favoriteIds.value.find(item => item.id === event.id)) return

    // 立即提交到数据库并更新本地状态
    favoriteIds.value.slice(favoriteIds.value.findIndex(item => item.id === event.id), 1)
    apiRemoveFromFavorites(event).then(() => {
        // 如果API成功，理论上应该有一个更复杂的重试或错误处理机制
        // 为简单起见，我们先恢复状态并通知用户
        toast.success(`${event.name} removed from favorites!`, {
          action: {
        label: 'Undo',
        onClick: () => {
          // 用户点击Undo，再次调用 "addFavorite" 逻辑
          // addFavorite 会处理UI更新、API调用和成功提示
          addFavorite(event)
          // 覆盖默认的 "add" 提示，给出更明确的上下文
          toast.info(`${event.name }re-added to favorites!`)
        },
      },
      duration: 4000,
        });
        getFavor().then(() => {
            getFavorites()
        })

    }).catch(() => {
        // 如果API失败，理论上应该有一个更复杂的重试或错误处理机制
        // 为简单起见，我们先恢复状态并通知用户
        favoriteIds.value.push(event)
        toast.error('Failed to remove favorite. Please try again.')
    })

    // 显示带Undo的 sonner
    // toast('Removed from Favorites', {
    //   description: event.name,
    //   action: {
    //     label: 'Undo',
    //     onClick: () => {
    //       // 用户点击Undo，再次调用 "addFavorite" 逻辑
    //       // addFavorite 会处理UI更新、API调用和成功提示
    //       addFavorite(event)
    //       // 覆盖默认的 "add" 提示，给出更明确的上下文
    //       toast.info(`${event.name }re-added to favorites!`)
    //     },
    //   },
    //   duration: 4000,
    // })
  }
  
  // 检查某个事件是否被收藏
  const isFavorite = (event: any) => {
    // if(favoriteIds.value.length === 0){
    //     getFavor().then(res => {
    //         favoriteIds.value = res.data
    //     })
    // }
    const res = favoriteIds.value.findIndex(item => item.id === event.id)
    console.log(`Checking if event ${event.id} is favorite: ${res !== -1}`);
    
    return computed(() => res !== -1).value
  }

  return {
    favoriteIds, // 导出一个 ref<Set<string>>
    addFavorite,
    removeFavorite,
    isFavorite,
  }
}
// function removeFavor(id: string) {
//     throw new Error('Function not implemented.');
// }

