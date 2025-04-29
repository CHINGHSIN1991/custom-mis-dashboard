<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowDown, ArrowUp, ArrowUpDown, Search, Plus, Download, Filter, RefreshCw } from 'lucide-vue-next';

// 模擬資料
interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  role: string;
  lastLogin: string;
}

// 生成更多的模擬數據
const generateUsers = (count: number): User[] => {
  const users: User[] = [];
  const roles = ['管理員', '編輯', '使用者', '訪客'];
  const statuses: ('active' | 'inactive')[] = ['active', 'inactive'];

  for (let i = 0; i < count; i++) {
    const randomId = Math.random().toString(16).substring(2, 10);
    const randomName = `用戶${i + 1}`;
    const randomEmail = `user${i + 1}@example.com`;
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    // 生成隨機日期 (過去90天內)
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    const randomDate = date.toISOString().split('T')[0];

    users.push({
      id: randomId,
      name: randomName,
      email: randomEmail,
      status: randomStatus,
      role: randomRole,
      lastLogin: randomDate,
    });
  }

  return users;
};

const allUsers = ref<User[]>([
  {
    id: '728ed52f',
    name: '王小明',
    email: 'ming@example.com',
    status: 'active',
    role: '管理員',
    lastLogin: '2023-11-23',
  },
  {
    id: '489e1d42',
    name: '李小花',
    email: 'flower@example.com',
    status: 'active',
    role: '編輯',
    lastLogin: '2023-11-20',
  },
  {
    id: '12a3b456',
    name: '張小強',
    email: 'strong@example.com',
    status: 'inactive',
    role: '使用者',
    lastLogin: '2023-10-15',
  },
  {
    id: '9876c123',
    name: '陳小美',
    email: 'beauty@example.com',
    status: 'active',
    role: '使用者',
    lastLogin: '2023-11-15',
  },
  {
    id: '45d67e89',
    name: '林小峰',
    email: 'peak@example.com',
    status: 'inactive',
    role: '訪客',
    lastLogin: '2023-09-05',
  },
  ...generateUsers(20),
]);

// 搜尋功能
const searchQuery = ref('');
const filteredUsers = computed(() => {
  if (!searchQuery.value) return allUsers.value;

  const query = searchQuery.value.toLowerCase();
  return allUsers.value.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.id.toLowerCase().includes(query) ||
    user.role.toLowerCase().includes(query)
  );
});

// 排序功能
const sortKey = ref<keyof User | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');

const toggleSort = (key: keyof User) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = 'asc';
  }
};

const sortedUsers = computed(() => {
  if (!sortKey.value) return filteredUsers.value;

  return [...filteredUsers.value].sort((a, b) => {
    const aValue = a[sortKey.value!];
    const bValue = b[sortKey.value!];

    if (aValue === bValue) return 0;

    const result = aValue > bValue ? 1 : -1;
    return sortDirection.value === 'asc' ? result : -result;
  });
});

// 取得排序圖標
const getSortIcon = (key: keyof User) => {
  if (sortKey.value !== key) return ArrowUpDown;
  return sortDirection.value === 'asc' ? ArrowUp : ArrowDown;
};

// 分頁功能
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = computed(() => Math.ceil(sortedUsers.value.length / pageSize.value));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return sortedUsers.value.slice(start, end);
});

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

// 重置搜尋和排序
const resetFilters = () => {
  searchQuery.value = '';
  sortKey.value = null;
  currentPage.value = 1;
};
</script>

<template>
  <div class="p-4 flex flex-col h-full">
    <h1 class="text-2xl font-bold mb-4">使用者資料表格</h1>

    <div class="flex flex-col flex-1 space-y-4">
      <!-- 頂部操作區域 -->
      <div class="flex flex-col sm:flex-row justify-between gap-4">
        <div class="flex gap-2">
          <button
            class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Plus class="h-4 w-4" />
            新增用戶
          </button>
          <button
            class="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            <Download class="h-4 w-4" />
            匯出
          </button>
          <button
            class="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            <Filter class="h-4 w-4" />
            篩選
          </button>
          <button
            class="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            @click="resetFilters">
            <RefreshCw class="h-4 w-4" />
            重置
          </button>
        </div>

        <div class="relative w-full sm:w-72">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input type="text" v-model="searchQuery" placeholder="搜尋用戶..."
            class="w-full rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
        </div>
      </div>

      <!-- 表格區域 -->
      <div class="rounded-md border flex-1 overflow-hidden">
        <div class="overflow-auto max-h-[calc(100vh-260px)]">
          <Table>
            <TableCaption>最近活躍的使用者列表</TableCaption>
            <TableHeader class="sticky top-0 bg-muted/50 backdrop-blur-sm">
              <TableRow>
                <TableHead class="w-[100px]" @click="toggleSort('id')" :class="{ 'cursor-pointer': true }">
                  <div class="flex items-center">
                    ID
                    <component :is="getSortIcon('id')" class="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead @click="toggleSort('name')" :class="{ 'cursor-pointer': true }">
                  <div class="flex items-center">
                    姓名
                    <component :is="getSortIcon('name')" class="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead @click="toggleSort('email')" :class="{ 'cursor-pointer': true }">
                  <div class="flex items-center">
                    電子郵件
                    <component :is="getSortIcon('email')" class="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead @click="toggleSort('status')" :class="{ 'cursor-pointer': true }">
                  <div class="flex items-center">
                    狀態
                    <component :is="getSortIcon('status')" class="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead @click="toggleSort('role')" :class="{ 'cursor-pointer': true }">
                  <div class="flex items-center">
                    角色
                    <component :is="getSortIcon('role')" class="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead @click="toggleSort('lastLogin')" :class="{ 'cursor-pointer': true }">
                  <div class="flex items-center">
                    最後登入
                    <component :is="getSortIcon('lastLogin')" class="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead class="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="user in paginatedUsers" :key="user.id">
                <TableCell class="font-medium">{{ user.id }}</TableCell>
                <TableCell>{{ user.name }}</TableCell>
                <TableCell>{{ user.email }}</TableCell>
                <TableCell>
                  <span :class="{
                    'px-2 py-1 rounded text-xs font-medium': true,
                    'bg-green-100 text-green-800': user.status === 'active',
                    'bg-gray-100 text-gray-800': user.status === 'inactive'
                  }">
                    {{ user.status === 'active' ? '啟用' : '停用' }}
                  </span>
                </TableCell>
                <TableCell>{{ user.role }}</TableCell>
                <TableCell>{{ user.lastLogin }}</TableCell>
                <TableCell class="text-right">
                  <button class="text-blue-500 hover:text-blue-700 mr-2">編輯</button>
                  <button class="text-red-500 hover:text-red-700">刪除</button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <!-- 分頁功能 -->
      <div class="flex items-center justify-between">
        <div class="text-sm text-muted-foreground">
          顯示 {{ (currentPage - 1) * pageSize + 1 }} 到 {{ Math.min(currentPage * pageSize, sortedUsers.length) }} 筆，共 {{
            sortedUsers.length }} 筆資料
        </div>

        <div class="flex items-center space-x-2">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" :class="{
            'rounded-md border px-3 py-2 text-sm': true,
            'bg-primary text-primary-foreground': false,
            'bg-background hover:bg-accent hover:text-accent-foreground': currentPage !== 1,
            'opacity-50 cursor-not-allowed': currentPage === 1
          }">
            上一頁
          </button>

          <div v-for="page in totalPages" :key="page">
            <button v-if="(page <= 3 || page >= totalPages - 2 || Math.abs(page - currentPage) <= 1) && totalPages <= 7"
              @click="goToPage(page)" :class="{
                'rounded-md border px-3 py-2 text-sm': true,
                'bg-primary text-primary-foreground': currentPage === page,
                'bg-background hover:bg-accent hover:text-accent-foreground': currentPage !== page
              }">
              {{ page }}
            </button>

            <!-- 大量頁數時用省略號顯示 -->
            <button
              v-else-if="(page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) && totalPages > 7"
              @click="goToPage(page)" :class="{
                'rounded-md border px-3 py-2 text-sm': true,
                'bg-primary text-primary-foreground': currentPage === page,
                'bg-background hover:bg-accent hover:text-accent-foreground': currentPage !== page
              }">
              {{ page }}
            </button>
            <span
              v-else-if="(page === 4 && currentPage < 4) || (page === totalPages - 3 && currentPage > totalPages - 3)"
              class="px-2 py-2 text-muted-foreground">
              ...
            </span>
          </div>

          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" :class="{
            'rounded-md border px-3 py-2 text-sm': true,
            'bg-primary text-primary-foreground': false,
            'bg-background hover:bg-accent hover:text-accent-foreground': currentPage !== totalPages,
            'opacity-50 cursor-not-allowed': currentPage === totalPages
          }">
            下一頁
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>