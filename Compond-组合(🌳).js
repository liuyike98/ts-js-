/* ---------------------------------------------------------------------------------------
* about:组合模式
* author:马兆铿（13790371603 810768333@qq.com）
* date:2019-01-13
* ---------------------------------------------------------------------------------------- */
class PancakeHouseMenu {
  constructor () {
    this.list = [] // Array
  }

  addItem (name, price) {
    this.list.push(new MenuItem(name, price))
  }

  addSubMenu (subMenuName, { name, price }) {
    const subMenu = this.list.find(item => item.name === subMenuName)
    if (subMenu) {
      subMenu.addItem(name, price)
    }
    // 不存在子菜单，就新增一个
    else {
      const subMenu = new SubMenu(subMenuName)
      subMenu.addItem(name, price)
      this.list.push(subMenu)
    }
  }

  getMenuList () {
    return this.list
  }

  // 迭代器
  each (fn) {
    const list = this.getMenuList()
    // 分类型处理
    list.forEach((item, index) => {
      item instanceof SubMenu
        ? item.each(fn) // 递归
        : fn(item, index)
    })
  }
}

// 子菜单
class SubMenu extends PancakeHouseMenu {
  constructor (name) {
    super()
    Object.assign(this, {
      name,
      list: []
    })
  }
}

class DinnerHouseMenu {
  constructor () {
    this.list = {} // ArrayLike
    this.list.length = 0
  }

  addItem (name, price) {
    this.list[this.list.length] = new MenuItem(name, price)
    this.list.length += 1
  }

  getMenuList () {
    return this.list
  }

  // 迭代器
  each (fn) {
    const list = this.getMenuList()
    Array.prototype.forEach.call(list, (item, index) => fn(item, index))
  }
}

/* ----------------------------------------- 共用类 ----------------------------------------- */
class MenuItem {
  constructor (name, price) {
    Object.assign(this, { name, price })
  }

  getName () {
    return this.name
  }

  getPrice () {
    return this.price
  }
}

class Maid {
  constructor (name) {
    this.name = name
  }

  // 需要操作「每一项」
  printMenu () {
    Array.prototype.forEach.call(arguments, list => {
      this.printList(list)
    })
  }

  printList (list) {
    // 调用其迭代器
    list.each(item => {
      console.log(`${item.getName()}: $${item.getPrice()}`)
    })
  }
}

/* ----------------------------------------- 实例 ----------------------------------------- */
const pancakeHouseMenu = new PancakeHouseMenu()
const dinnerHouseMenu = new DinnerHouseMenu()

pancakeHouseMenu.addItem('pizza', 12)
pancakeHouseMenu.addItem('waffle', 10)
pancakeHouseMenu.addSubMenu('breakfast', { name: 'soup', price: 2 })
pancakeHouseMenu.addSubMenu('breakfast', { name: 'soy milk', price: 1 })
pancakeHouseMenu.addSubMenu('breakfast', { name: 'bread', price: 2 })
dinnerHouseMenu.addItem('chicken', 50)
dinnerHouseMenu.addItem('potato', 20)

console.log(pancakeHouseMenu.getMenuList())

const maidAlice = new Maid('Alice')

// 打印两个类型不一致集合
maidAlice.printMenu(pancakeHouseMenu, dinnerHouseMenu)
