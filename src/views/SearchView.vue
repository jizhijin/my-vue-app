<!-- src/views/SearchView.vue -->
<script setup lang="ts">
// 变更: 导入 watch 用于监听输入变化
import { ref, reactive, watch } from 'vue'
import { Search, Frown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
    InputGroup,
    InputGroupInput,
    InputGroupText,
    InputGroupAddon,
    InputGroupButton

} from '../components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

import EventCard from '../components/EventCard.vue'
import { getEvents, getSuggest } from '@/api'
import { useFavorites } from '@/composables/useFavorites'
import axios from 'axios'
const { isFavorite, removeFavorite, addFavorite } = useFavorites()


// --- 响应式状态 ---
const searchParams = reactive({
    keywords: '',
    category: 'All',
    location: '',
    autoDetect: false,
    distance: 0,
    latlong: '',
})

const errors = reactive<Record<string, string>>({})



// const selectedCategoryLabel = computed(() => {
//     return categories.find(cat => cat.value === searchParams.category)?.label || 'Select a category'
// })

const isLoading = ref(false)
const hasSearched = ref(false)
const searchResults = ref<any[]>([])


// ======================= 新增：自动补全状态 =======================
// 用于存储从 API 获取的建议
const suggestions = ref<string[]>([])
// 控制建议列表的显示/隐藏
const showSuggestions = ref(false)
// 用于实现防抖的计时器
const debounceTimer = ref<number | null>(null)
// =================================================================


// --- 模拟API数据 ---
// const MOCK_EVENTS = [
//     { id: '1', title: "Kiss 108's ", venue: 'TD Garden', date: 'Jan 14, 2025, 08:00 PM', category: 'Music', image: 'https://s1.ticketm.net/dam/a/c62/0636ff21-e369-4b8c-bee4-214ea0a81c62_1339761_CUSTOM.jpg', isLike: true },
//     { id: '2', title: 'Ed SheeTour', venue: 'Gillette Stadium', date: 'Oct 25, 2025, 05:30 PM', category: 'Music', image: 'https://s1.ticketm.net/dam/a/c81/e57922d5-7b53-43af-8854-c8c36391cc81_1821031_TABLET_LANDSCAPE_LARGE_16_9.jpg', isLike: false },
//     { id: '3', title: 'Ed SheOP Tour', venue: 'Gillette Stadium', date: 'Oct 26, 2025, 05:30 PM', category: 'Music', image: 'https://s1.ticketm.net/dam/a/c81/e57922d5-7b53-43af-8854-c8c36391cc81_1821031_TABLET_LANDSCAPE_LARGE_16_9.jpg', isLike: true },
// ]

// // ======================= 新增：自动补全的模拟数据 =======================
// // 模拟可以从 API 返回的关键词建议
// const MOCK_AUTOCOMPLETE_DATA = [
//     'Taylor Swift Concert',
//     'Ed Sheeran Tour',
//     'Boston Celtics Game',
//     'Hamilton Musical',
//     'Local Art Fair',
//     'Tech Conference 2025',
//     'Jingle Ball',
//     'Comedy Night',
// ]
// ====================================================================


// --- 方法 ---

// ======================= 新增：自动补全相关方法 =======================

const isFinished = ref(true)
/**
 * 模拟从 API 获取关键词建议。
 * @param keyword 用户输入的当前关键词
 */
async function fetchSuggestions(keyword: string) {
    if (!keyword.trim()) {
        suggestions.value = []
        showSuggestions.value = false
        isFinished.value = true
        return
    }

    console.log(`正在为 "${keyword}" 获取建议...`)
    console.log(isFinished.value);


    // --- 在这里替换为真实的 API 调用 ---
    // 例如: const response = await fetch(`/api/suggestions?q=${keyword}`)
    // const data = await response.json()
    // suggestions.value = data
    // ------------------------------------

    // --- MOCK 实现 ---
    // 模拟网络延迟
    // await new Promise(resolve => setTimeout(resolve, 150))
    // 过滤模拟数据
    // const filtered = MOCK_AUTOCOMPLETE_DATA.filter(item =>
    //     item.toLowerCase().includes(keyword.toLowerCase())
    // )
    if (isFinished.value) {
        return
    }

    isFinished.value = true
    const result = await getSuggest(keyword)
    console.log(result);

    suggestions.value = result.data.map((item:any) => item.name)
    showSuggestions.value = suggestions.value.length > 0
    // --- MOCK 结束 ---
}

/**
 * 当用户点击一个建议项时调用。
 * @param suggestion 被选中的建议字符串
 */
function selectSuggestion(suggestion: string) {
    searchParams.keywords = suggestion // 更新输入框的值
    showSuggestions.value = false      // 隐藏建议列表
    suggestions.value = []           // 清空建议
}

const changeDetect = () => {
    console.log('changeDetect');
    searchParams.location = ''
}


/**
 * 当输入框失去焦点时，延迟隐藏建议列表。
 * 这样可以确保在隐藏之前，能成功触发建议项的点击事件。
 */
function handleInputBlur() {
    setTimeout(() => {
        showSuggestions.value = false
    }, 150); // 延迟150毫秒
}

const getIpAddress = async () => {
    const ipinfoResponse = await fetch(`https://api.ipinfo.io/lite/me?token=ced7e643532edd`);
    const data = await ipinfoResponse.json(); // e.g., "34.0522,-118.2437"
    return data;
}
function handleToggleFavorite(event: any) {
    if (isFavorite(event)) {
        removeFavorite(event)
    } else {
        addFavorite(event)
    }
}

// function handleToggleFavorite(eventId: string) {
//   // 找到 searchResults 数组中对应的 event
//   const event = searchResults.value.find(e => e.id === eventId);

//   if (event) {
//     // 切换它的 isLike 状态
//     event.isLike = !event.isLike;
//     console.log(`Updated event ${eventId} in parent. New isLike status: ${event.isLike}`);
//   }
// }

const clearKeywords = () => {
    searchParams.keywords = '';
    document.getElementById('keywords')?.focus();
};

// 监听 keywords 输入的变化，并使用防抖来触发 API 调用
watch(() => searchParams.keywords, (newKeyword) => {
    isFinished.value = false;
    // 清除上一个计时器
    if (debounceTimer.value) {
        clearTimeout(debounceTimer.value)
    }
    // 如果输入为空，则不显示建议
    if (!newKeyword.trim()) {
        showSuggestions.value = false
        suggestions.value = []
        isFinished.value = true
        return
    }
    // 设置一个新的计时器，300毫秒后执行搜索
    debounceTimer.value = window.setTimeout(() => {
        if (!isFinished.value) {
            fetchSuggestions(newKeyword)
            isFinished.value = true
            console.log("Fetching suggestions for:", newKeyword);

        }
    }, 300)
})
// ====================================================================

const validateForm = () => {
    Object.keys(errors).forEach(key => delete errors[key])

    if (!searchParams.keywords) {
        errors.keywords = 'Keywords are required.'
    }

    if (!searchParams.autoDetect && !searchParams.location) {
        errors.location = 'Location is required when auto-detect is off.'
    }

    if (!searchParams.distance || searchParams.distance < 1 || searchParams.distance > 19999) {
        errors.distance = 'Distance must be a positive number and between 1 and 19999.'
    }

    return Object.keys(errors).length === 0
}

async function handleSearch() {
    showSuggestions.value = false; // 开始搜索时，隐藏建议
    if (validateForm()) {
        console.log('Form is valid. Searching with:', searchParams)
        // searchResults.value = MOCK_EVENTS
        // hasSearched.value = true
        let ipRes = {ip:''}
        if (searchParams.autoDetect) {
            ipRes = await getIpAddress()
        }else{
            const resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchParams.location)}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
            const {lat, lng} = resp.data.results[0].geometry.location;
            searchParams.latlong = `${lat},${lng}`
        }
        console.log(ipRes);
        

        const data = {
            keyword: searchParams.keywords,
            category: searchParams.category,
            ipAddress: ipRes.ip as string,
            location: searchParams.location,
            latlong: searchParams.latlong,
            autoDetect: searchParams.autoDetect,
            distance: searchParams.distance,
        }
        getEvents(data).then((res) => {
            searchResults.value = res.data
            console.log(res);

            hasSearched.value = true
        })
        // 在这里执行后续的搜索逻辑，例如 API 调用
    } else {
        console.log('Form is invalid. Errors:', errors)
    }
}
</script>

<template>
    <div class="2xl:w-full items-center flex" style="justify-content: center;">
        <div class="container py-8">
            <form @submit.prevent="handleSearch" class="flex flex-wrap justify-center items-end gap-4 mb-8 w-full">

                <!-- Keywords -->
                <!-- 变更: 在外层 div 上添加 `relative` 以便绝对定位建议列表 -->
                <div class="grow basis-[240px] md:flex-1">
                    <Label for="keywords" :class="cn({ 'text-red-500': errors.keywords })">Keywords <span
                            class="text-red-500">*</span></Label>

                    <!-- 变更: 在 Input 上添加事件处理器和 autocomplete="off" -->
                    <InputGroup class="w-full">
                        <InputGroupInput id="keywords" v-model="searchParams.keywords"
                            placeholder="Search for events..." @blur="handleInputBlur" autocomplete="off" />

                        <!-- 新增: 使用 InputGroupAddon 和 InputGroupButton 来放置清空按钮 -->
                        <!-- v-if 指令确保只在有输入内容时显示清空按钮 -->
                        <InputGroupAddon v-if="searchParams.keywords" align="inline-end">
                            <InputGroupButton aria-label="Clear search" title="Clear search" size="icon-xs"
                                @click="clearKeywords">
                                <!-- 'X' 清空图标 -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="h-4 w-4">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>


                    <!-- 新增: 自动补全建议列表 -->
                    <div v-if="showSuggestions && suggestions.length > 0"
                        class="absolute z-10 w-full mt-1 bg-card border rounded-md shadow-lg">
                        <ul>
                            <li v-for="suggestion in suggestions" :key="suggestion"
                                @click="selectSuggestion(suggestion)"
                                class="px-3 py-2 cursor-pointer hover:bg-muted text-sm">
                                {{ suggestion }}
                            </li>
                        </ul>
                    </div>

                    <div class="h-5 mt-1">
                        <p v-if="errors.keywords" class="text-sm text-red-500">{{ errors.keywords }}</p>
                    </div>
                </div>

                <!-- Category -->
                <div class="grow md:basis-[100px] md:flex-1 !w-full">
                    <Label for="category">Category <span class="text-red-500">*</span></Label>
                    <Select v-model="searchParams.category" class="search-container 2xl:w-full">
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup class="!w-full">
                                <SelectItem class="2xl:w-2rem" value="All">All</SelectItem>
                                <SelectItem class="2xl:w-2rem" value="Music">Music</SelectItem>
                                <SelectItem class="2xl:w-2rem" value="Sports">Sports</SelectItem>
                                <SelectItem class="2xl:w-2rem" value="Arts">Arts & Theater</SelectItem>
                                <SelectItem class="2xl:w-2rem" value="Film">Film</SelectItem>
                                <SelectItem class="2xl:w-2rem" value="Miscellaneous">Miscellaneous</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div class="h-5 mt-1">
                        <p></p>
                    </div>
                </div>

                <!-- Location & Auto-detect -->
                <div class="grow basis-[240px] md:flex-1">
                    <div class="flex justify-between items-center mb-1.5">
                        <Label for="location" :class="cn({ 'text-red-500': errors.location })">Location <span
                                class="text-red-500">*</span></Label>

                        <div class="flex items-center space-x-2">
                            <label for="auto-detect" class="text-sm font-medium leading-none whitespace-nowrap">
                                Auto-detect Location
                            </label>
                            <Switch id="auto-detect" v-model="searchParams.autoDetect" @update:model-value="changeDetect"/>
                        </div>
                    </div>
                    <Input id="location" v-model="searchParams.location" :disabled="searchParams.autoDetect"
                        placeholder="Enter city or district..." />
                    <div class="h-5 mt-1">
                        <p v-if="errors.location" class="text-sm text-red-500">{{ errors.location }}</p>
                    </div>
                </div>

                <!-- Distance -->
                <div class="md:flex-1 grow sm:basis-[150px]">
                    <Label for="distance" :class="cn({ 'text-red-500': errors.distance })">
                        Distance <span class="text-red-500">*</span>
                    </Label>
                    <InputGroup>
                        <InputGroupInput id="distance" type="number" v-model.number="searchParams.distance"
                            :class="cn({ 'border-red-500 focus-visible:ring-red-500 !border-r-0': errors.distance })" />
                        <InputGroupText :class="cn({ 'border-red-500': errors.distance })" class="px-2">
                            miles
                        </InputGroupText>
                    </InputGroup>
                    <div class="h-5 mt-1">
                        <p v-if="errors.distance" class="text-sm text-red-500">{{ errors.distance }}</p>
                    </div>
                </div>


                <!-- Submit Button -->
                <div class="flex-shrink-0 basis-full sm:basis-auto sm:flex-1">
                    <Button type="submit" class="w-full" :disabled="isLoading">
                        <Search class="mr-2 h-4 w-4" />
                        {{ isLoading ? 'Searching...' : 'Search Events' }}
                    </Button>
                    <div class="h-5 mt-1">
                        <p></p>
                    </div>

                </div>
            </form>

            <!-- 结果区域 -->
            <div class="mt-16">
                <!-- 初始空状态, 加载中, 无结果状态 -->
                <div v-if="!hasSearched && !isLoading" class="text-center text-muted-foreground">
                    <Search class="mx-auto h-12 w-12 mb-4" />
                    <p>Enter search criteria and click the Search button to find events.</p>
                </div>
                <div v-if="isLoading" class="text-center">
                    <p>Loading results...</p>
                </div>
                <div v-if="hasSearched && !isLoading && searchResults.length === 0"
                    class="text-center text-muted-foreground">
                    <Frown class="mx-auto h-12 w-12 mb-4" />
                    <p>No events found for your criteria. Try a different search.</p>
                </div>

                <!-- 结果网格 -->
                <div v-if="!isLoading && searchResults.length > 0"
                    class="grid gap-6 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
                    <EventCard v-for="event in searchResults" :key="event.id" :event="event"
                        :is-like="isFavorite(event)" @toggle-favorite="handleToggleFavorite" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-container {
    width: w-full !important;
}
</style>
