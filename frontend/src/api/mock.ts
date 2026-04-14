export interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  createdAt: string
}

const mockUsers: User[] = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'Admin', status: 'Active', createdAt: '2024-01-15' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'Editor', status: 'Active', createdAt: '2024-01-16' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'Viewer', status: 'Inactive', createdAt: '2024-01-17' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'Editor', status: 'Active', createdAt: '2024-01-18' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', role: 'Viewer', status: 'Active', createdAt: '2024-01-19' },
  { id: 6, name: '孙八', email: 'sunba@example.com', role: 'Admin', status: 'Active', createdAt: '2024-01-20' },
  { id: 7, name: '周九', email: 'zhoujiu@example.com', role: 'Editor', status: 'Inactive', createdAt: '2024-01-21' },
  { id: 8, name: '吴十', email: 'wushi@example.com', role: 'Viewer', status: 'Active', createdAt: '2024-01-22' },
  { id: 9, name: '郑十一', email: 'zhengshiyi@example.com', role: 'Editor', status: 'Active', createdAt: '2024-01-23' },
  { id: 10, name: '陈十二', email: 'chenshier@example.com', role: 'Viewer', status: 'Active', createdAt: '2024-01-24' },
  { id: 11, name: '刘十三', email: 'liushisan@example.com', role: 'Admin', status: 'Active', createdAt: '2024-01-25' },
  { id: 12, name: '杨十四', email: 'yangshisi@example.com', role: 'Editor', status: 'Inactive', createdAt: '2024-01-26' },
  { id: 13, name: '黄十五', email: 'huangshiwu@example.com', role: 'Viewer', status: 'Active', createdAt: '2024-01-27' },
  { id: 14, name: '周十六', email: 'zhoushiliu@example.com', role: 'Editor', status: 'Active', createdAt: '2024-01-28' },
  { id: 15, name: '吴十七', email: 'wushiqi@example.com', role: 'Viewer', status: 'Active', createdAt: '2024-01-29' }
]

let nextId = 16

export const mockApi = {
  getUsers(page: number, pageSize: number, search?: string): { data: User[], total: number } {
    let filtered = mockUsers
    if (search) {
      const keyword = search.toLowerCase()
      filtered = mockUsers.filter(u =>
        u.name.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword) ||
        u.role.toLowerCase().includes(keyword)
      )
    }
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return {
      data: filtered.slice(start, end),
      total: filtered.length
    }
  },

  getUser(id: number): User | undefined {
    return mockUsers.find(u => u.id === id)
  },

  createUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...user,
      id: nextId++,
      createdAt: new Date().toISOString().split('T')[0]
    }
    mockUsers.push(newUser)
    return newUser
  },

  updateUser(id: number, user: Partial<Omit<User, 'id' | 'createdAt'>>): User | undefined {
    const index = mockUsers.findIndex(u => u.id === id)
    if (index === -1) return undefined
    mockUsers[index] = { ...mockUsers[index], ...user }
    return mockUsers[index]
  },

  deleteUser(id: number): boolean {
    const index = mockUsers.findIndex(u => u.id === id)
    if (index === -1) return false
    mockUsers.splice(index, 1)
    return true
  }
}
