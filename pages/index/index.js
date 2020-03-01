Page({

  // 提供数据
  data: {
    list: [],
    name: '', // 用来 临时 保存输入框的内容
    index: 0, // id计数器 用来给 id 赋值的
    leftCount: 0 // 统计 未完成 的任务数
  },
  onShow(){
    // 获取 list
    this.getList()
    if(this.data.list == 0){
      this.data.index = 0
    }else{
      this.data.index = this.data.list[this.data.list.length - 1].id
    }
    //修改 leftCount 的值
    this.setLeftCount()
  },
  // 删除任务
  delTodo (e) {
    // 通过事件对象获取到当前元素，获取到dataset
    let id = e.currentTarget.dataset.id
    
    // 通过id获取下标
    let index = this.data.list.findIndex(item => item.id === id)

    // 根据下标来删除对应的任务
    this.data.list.splice(index, 1)

    // 同步
    this.setData(this.data)

    //修改 leftCount 的值
    this.setLeftCount()

    // 存储 list
    this.saveList()
  },
  // 改变任务的状态
  change (e) {
    let id = e.currentTarget.dataset.id
    let index = this.data.list.findIndex(item => item.id === id)
    this.data.list[index].completed = !this.data.list[index].completed
    // 同步
    this.setData(this.data)
    //修改 leftCount 的值
    this.setLeftCount()
    // 存储 list
    this.saveList()
  },
  // 切换所有任务的选中状态(方式一)
  toggleAll1 () {
    // 判断所有的任务是否都选中
    // every: 所有的function都返回了true，整体的结果就是true
    // some: 只要有要一个任务返回了true，结果就是true 
    // 只要有任务没完成， 把所有的任务都改成完成

    // 判断任务是否都完成
    let flag = this.data.list.every(item => item.completed)
    // if (flag) {
    //   // 如果任务都完成了， 把所有的任务都改成未完成
    //   this.data.list.forEach(item => item.completed = false)
    // } else {
    //   this.data.list.forEach(item => item.completed = true)
    // }
    this.data.list.forEach(item => item.completed = !flag)
    this.setData(this.data)
    //修改 leftCount 的值
    this.setLeftCount()
    // 存储 list
    this.saveList()
  },
  // 切换所有任务的选中状态(方式二)
  toggleAll () {
    // 只要有一个或者多个没有完成任务， 让所有的任务都完成
    // 否则让所有的任务都不完成
    // flag:表示的是是否有任务没有完成
    let flag = this.data.list.some(item => !item.completed)
    this.data.list.forEach(item => item.completed = flag)
    this.setData(this.data)
    //修改 leftCount 的值
    this.setLeftCount()
    // 存储 list
    this.saveList()
  },
  getName (e) {
    // 获取到文本框的value值
    this.data.name = e.detail.value
    this.setData(this.data)
  },
  addTodo() {
    // 把name的数据添加成一个新的任务
    this.data.list.push({
      id: ++this.data.index,
      name: this.data.name,
      completed: false
    })
    // 清空data中的name属性
    this.data.name = ''
    // 同步
    this.setData(this.data)
    //修改 leftCount 的值
    this.setLeftCount()
    // 存储 list
    this.saveList()
  },
  // 清除已经完成的任务
  clearCompleted(){
    //只保留未完成的任务
    this.data.list = this.data.list.filter(item => !item.completed)
    // 同步
    this.setData(this.data)
    //修改 leftCount 的值
    this.setLeftCount()
    // 存储 list
    this.saveList()
  },
  //修改 leftCount 的值
  setLeftCount(){
    this.data.leftCount = this.data.list.filter(item => !item.completed).length
    // 同步
    this.setData(this.data)
  },
  // 存储 list
  saveList(){
    // 存储 少量 数据推荐用 同步 的方法
    // 小程序中允许直接存储 对象
    wx.setStorageSync("todos", this.data.list)
  },
  // 获取 list
  getList(){
    // 获取 少量 数据推荐用 同步 的方法
    this.data.list = wx.getStorageSync("todos") || []
  }

})